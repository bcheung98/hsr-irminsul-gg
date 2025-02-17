import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";

// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme, useMediaQuery, Stack, Box } from "@mui/material";

// Helper imports
import { useAppDispatch } from "helpers/hooks";
import { updateCharacterCosts } from "reducers/planner";
import { formatCharacterBonusStats } from "helpers/formatCharacterBonusStats";
import { characterBonusStats } from "data/characterBonusStats";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { CardMode } from "./PlannerCard";
import {
    CharacterTraceNodeMain,
    CharacterTraceNodeSmall,
} from "types/character";
import { Path, Rarity } from "types/_common";
import { TraceCostNodeValues } from "types/costs";

interface StatNodeProps {
    mode: CardMode;
    id: string;
    name: string;
    rarity: Rarity;
    path: Path;
    trace: CharacterTraceNodeMain | CharacterTraceNodeSmall;
    values: TraceCostNodeValues;
}

function StatNode({
    mode,
    id,
    name,
    rarity,
    path,
    trace,
    values,
}: StatNodeProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState(values[id]?.selected ?? true);
    const handleSelect = () => {
        setSelected(!selected);
    };

    let type: "main" | "small";
    let title = "";
    let unlock = trace.unlock;
    let imgSrc = "";
    let imgSize = "";

    if ("name" in trace) {
        type = "main";
        title = `${unlock} Trace`;
        imgSrc = `characters/skills/${name.toLowerCase()}_${unlock.toLowerCase()}`;
        imgSize = matches_sm_dn ? "32px" : "40px";
    } else {
        type = "small";
        title = `${formatCharacterBonusStats(trace.stat)} +${
            characterBonusStats[trace.stat][unlock]
        } (${unlock})`;
        imgSrc = `stat_icons/${trace.stat}`;
        imgSize = matches_sm_dn ? "24px" : "32px";
    }

    useEffect(() => {
        dispatch(
            updateCharacterCosts({
                name: name,
                type: type === "main" ? "traceMain" : "traceSmall",
                traceID: id,
                data: {
                    node:
                        type === "main"
                            ? (unlock as "A2" | "A4" | "A6")
                            : unlock,
                    rarity,
                    selected,
                    path,
                },
            })
        );
    }, [selected]);

    return (
        <Stack direction="row" alignItems="center" spacing={{ xs: 2, sm: 3 }}>
            <Image
                id={`plannerCard-${name}-${id}`}
                src={imgSrc}
                alt={`plannerCard-${name}-${id}`}
                style={{
                    width: imgSize,
                    height: imgSize,
                    padding: "4px",
                    borderRadius: "64px",
                    border: `2px solid ${theme.border.color.primary}`,
                    backgroundColor: theme.appbar.backgroundColor,
                    cursor: mode === "edit" ? "pointer" : "default",
                    opacity: selected ? 1 : 0.35,
                }}
                tooltip={parseSkillDescription({ description: title })}
                onClick={mode === "edit" ? handleSelect : undefined}
            />
            {trace.subTraces && (
                <Stack spacing={1}>
                    {trace.subTraces.map((subTrace, index) => {
                        let nextID = incrementTraceNodeID(id);
                        // If there is more than one child node, add an extra identifier to the ID
                        if (trace.subTraces && trace.subTraces.length > 1) {
                            nextID = nextID + `-${index}`;
                        }
                        return (
                            <Box key={index}>
                                <StatNode
                                    mode={mode}
                                    id={nextID}
                                    name={name}
                                    rarity={rarity}
                                    path={path}
                                    trace={subTrace}
                                    values={values}
                                />
                                <Xarrow
                                    start={`plannerCard-${name}-${id}`}
                                    end={`plannerCard-${name}-${nextID}`}
                                    showHead={false}
                                    path="grid"
                                    color={theme.text.description}
                                    strokeWidth={2}
                                    startAnchor="right"
                                    endAnchor="left"
                                />
                            </Box>
                        );
                    })}
                </Stack>
            )}
        </Stack>
    );
}

export default StatNode;

const incrementTraceNodeID = (id: string) => {
    let splitID = id.split("-");
    splitID[1] = (parseInt(splitID[1]) + 1).toString();
    return splitID.join("-");
};
