import { useState, BaseSyntheticEvent } from "react";
import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import CharacterSkillKeywordPopup from "../skills/CharacterSkillKeywordPopup";
import LevelUpCosts from "custom/LevelUpCosts";
import InfoChip from "custom/InfoChip";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Box, Stack, Dialog, Card, Divider } from "@mui/material";

// Type imports
import {
    Character,
    CharacterTraceNodeData,
    CharacterUnlockKeys,
} from "types/character";

function CharacterTraceInfo({
    character,
    trace,
}: {
    character: Character;
    trace: CharacterTraceNodeData | null;
}) {
    const theme = useTheme();

    const [keywordDialogOpen, setKeywordDialogOpen] = useState(false);
    const [tag, setTag] = useState("");
    const handleKeywordDialogClickOpen = (event: BaseSyntheticEvent) => {
        setTag(event.target.className.split("-")[1]);
        setKeywordDialogOpen(true);
    };
    const handleKeywordDialogClose = () => {
        setKeywordDialogOpen(false);
    };

    // I know I have a separate file with this function, but I need this one here because of the useTheme hook being used in the helper function.
    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            className={className}
                            style={{
                                color: theme.text[
                                    tag as keyof typeof theme.text
                                ],
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.highlight.weight
                                        : theme.font.element.weight,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                }
                if (className.split("-")[0].startsWith("tooltip")) {
                    return (
                        <span
                            className={className}
                            style={{
                                color: theme.text.primary,
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                            onClick={handleKeywordDialogClickOpen}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                }
            }
        },
    };

    if (trace) {
        const { title, description = "", unlock } = trace;

        return (
            <>
                <Card
                    sx={{ p: 2, backgroundColor: theme.background(1, "light") }}
                >
                    <Stack spacing={2} divider={<Divider />}>
                        <Stack spacing={1}>
                            <TextStyled variant="h6-styled">{title}</TextStyled>
                            <Text
                                component="span"
                                sx={{ color: theme.text.description }}
                            >
                                {parse(description, options)}
                            </Text>
                        </Stack>
                        <Stack spacing={2}>
                            <TextStyled>Unlock Cost</TextStyled>
                            <LevelUpCosts
                                type="character"
                                skillKey={
                                    trace.stat === undefined
                                        ? "traceMain"
                                        : "traceSmall"
                                }
                                name={character.name}
                                element={character.element}
                                rarity={character.rarity}
                                path={character.path}
                                mats={character.materials}
                                unlock={unlock}
                            />
                            <Box>
                                <InfoChip
                                    color="info"
                                    label={`Requires Character ${formatUnlock(
                                        unlock
                                    )}`}
                                    padding="0px"
                                />
                            </Box>
                        </Stack>
                    </Stack>
                </Card>
                <Dialog
                    open={keywordDialogOpen}
                    onClose={handleKeywordDialogClose}
                    maxWidth="sm"
                    fullWidth
                    disableScrollLock
                >
                    <CharacterSkillKeywordPopup
                        onClose={handleKeywordDialogClose}
                        tag={tag}
                        keywords={character.keywords}
                    />
                </Dialog>
            </>
        );
    } else {
        return null;
    }
}

export default CharacterTraceInfo;

function formatUnlock(unlock: CharacterUnlockKeys) {
    if (unlock.startsWith("A")) {
        return `Ascension ${unlock.slice(-1)}`;
    } else {
        return `Lv. ${unlock.split(" ")[1]}`;
    }
}
