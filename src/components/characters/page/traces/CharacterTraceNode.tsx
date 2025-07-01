import { useEffect } from "react";
import Xarrow from "react-xarrows";

// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme, useMediaQuery, Box, Stack } from "@mui/material";

// Helper imports
import { characterBonusStats } from "data/characterBonusStats";
import {
    formatCharacterBonusStatDescription,
    formatCharacterBonusStatTitle,
} from "helpers/formatCharacterBonusStats";
import { getElementColor } from "helpers/elementColors";

// Type imports
import {
    Character,
    CharacterTraceNodeData,
    CharacterTraceNodeMain,
    CharacterTraceNodeSmall,
} from "types/character";

interface CharacterTraceNodeProps {
    id: string;
    selectedID: string;
    character: Character;
    trace: CharacterTraceNodeMain | CharacterTraceNodeSmall;
    setTrace: (trace: CharacterTraceNodeData) => void;
}

function CharacterTraceNode({
    id,
    selectedID,
    character,
    trace,
    setTrace,
}: CharacterTraceNodeProps) {
    const theme = useTheme();
    const matches_sm_dn = useMediaQuery(theme.breakpoints.down("sm"));

    const { name, element, path } = character;
    const selected = id === selectedID;
    const elementColor = getElementColor({ element });

    let unlock = trace.unlock;
    let title = "";
    let description = "";
    let stat = undefined;
    let imgSrc = "";
    let imgSize = "";

    if ("name" in trace) {
        title = trace.name;
        description = trace.description;
        imgSrc = `characters/skills/${name.toLowerCase()}_${unlock.toLowerCase()}`;
        imgSize = imgSize = matches_sm_dn ? "40px" : "48px";
    } else {
        title = formatCharacterBonusStatTitle(trace.stat);
        description = formatCharacterBonusStatDescription(
            trace.stat,
            characterBonusStats[trace.stat][unlock]
        );
        stat = trace.stat;
        imgSrc = `stat_icons/${trace.stat}`;
        imgSize = matches_sm_dn ? "28px" : "32px";
    }

    const traceNodeData: CharacterTraceNodeData = {
        id: id,
        title: title,
        description: description,
        unlock: unlock,
        stat: stat,
    };

    useEffect(() => {
        if (path === "Preservation" && id === "A-2-0") {
            setTrace(traceNodeData);
        } else if (path !== "Preservation" && id === "A-1") {
            setTrace(traceNodeData);
        }
    }, [trace]);

    return (
        <Stack direction="row" alignItems="center" spacing={4}>
            <Image
                id={`${name}-${id}`}
                src={imgSrc}
                alt={`${name}-${id}`}
                style={{
                    width: imgSize,
                    height: imgSize,
                    padding: "4px",
                    backgroundColor: theme.appbar.backgroundColor,
                    border: `2px solid ${
                        selected ? elementColor : theme.border.color.primary
                    }`,
                    borderRadius: "64px",
                    boxShadow: selected
                        ? `0 0 12px 4px ${elementColor}`
                        : "none",
                    transition: "box-shadow 250ms",
                    cursor: "pointer",
                }}
                onClick={() => setTrace(traceNodeData)}
            />
            {trace.subTraces && (
                <Stack spacing={2}>
                    {trace.subTraces.map((subTrace, index) => {
                        let nextID = incrementTraceNodeID(id);
                        // If there is more than one child node, add an extra identifier to the ID
                        if (trace.subTraces && trace.subTraces.length > 1) {
                            nextID = nextID + `-${index}`;
                        }
                        return (
                            <Box key={index}>
                                <CharacterTraceNode
                                    id={nextID}
                                    selectedID={selectedID}
                                    character={character}
                                    trace={subTrace}
                                    setTrace={setTrace}
                                />
                                <Xarrow
                                    start={`${name}-${id}`}
                                    end={`${name}-${nextID}`}
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

export default CharacterTraceNode;

const incrementTraceNodeID = (id: string) => {
    let splitID = id.split("-");
    splitID[1] = (parseInt(splitID[1]) + 1).toString();
    return splitID.join("-");
};
