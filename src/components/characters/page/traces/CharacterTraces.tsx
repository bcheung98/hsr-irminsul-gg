import { useState } from "react";

// Component imports
import CharacterTraceNode from "./CharacterTraceNode";
import CharacterTraceInfo from "./CharacterTraceInfo";
import CharacterTraceTotalStat from "./CharacterTraceTotalStat";
import MainContentBox from "custom/MainContentBox";
import { NovaflareButtons } from "../CharacterNovaflare";

// MUI imports
import { Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Type imports
import { CharacterProps, CharacterTraceNodeData } from "types/character";

function CharacterTraces({ character, novaflare }: CharacterProps) {
    const [currentTrace, setCurrentTrace] =
        useState<CharacterTraceNodeData | null>(null);

    const setTrace = (trace: CharacterTraceNodeData) => {
        if (JSON.stringify(trace) !== JSON.stringify(currentTrace)) {
            setCurrentTrace(trace);
        } else {
            setCurrentTrace(null);
        }
    };

    return (
        <MainContentBox
            title="Traces"
            actions={
                <NovaflareButtons
                    hasNovaflare={novaflare?.hasNovaflare!}
                    value={novaflare?.value!}
                    onChange={novaflare?.onChange!}
                />
            }
        >
            <Stack spacing={2} divider={<Divider />}>
                <Grid
                    container
                    columnSpacing={6}
                    rowSpacing={currentTrace ? 2 : 0}
                >
                    <Grid size="auto">
                        <Stack spacing={2} divider={<Divider />}>
                            {character.traces.map((trace, index) => (
                                <CharacterTraceNode
                                    key={index}
                                    id={`${String.fromCharCode(index + 65)}-1`}
                                    character={character}
                                    trace={trace}
                                    selectedID={currentTrace?.id || "0"}
                                    setTrace={setTrace}
                                />
                            ))}
                        </Stack>
                        <Divider
                            sx={{
                                mt: 2,
                                display: {
                                    xs: currentTrace !== null ? "flex" : "none",
                                    sm: "none",
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: "grow" }}>
                        <CharacterTraceInfo
                            character={character}
                            trace={currentTrace}
                        />
                    </Grid>
                </Grid>
                <CharacterTraceTotalStat
                    element={character.element}
                    traces={character.traces}
                />
            </Stack>
        </MainContentBox>
    );
}

export default CharacterTraces;
