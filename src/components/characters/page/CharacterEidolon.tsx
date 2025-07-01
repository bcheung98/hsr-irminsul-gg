import { BaseSyntheticEvent, useState } from "react";

// Component imports
import CharacterSkillKeywordPopup from "./skills/CharacterSkillKeywordPopup";
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";
import { NovaflareButtons } from "./CharacterNovaflare";

// MUI imports
import { useTheme, Stack, Box, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { objectKeys } from "helpers/utils";
import { parseSkillDescription } from "helpers/parseSkillDescription";

// Type imports
import { CharacterProps } from "types/character";

function CharacterEidolon({ character, novaflare }: CharacterProps) {
    const theme = useTheme();

    const { name, element, eidolon, keywords } = character;

    const [open, setOpen] = useState(false);
    const [tag, setTag] = useState("");
    const handleClickOpen = (event: BaseSyntheticEvent) => {
        setTag(event.target.className.split("-")[1]);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MainContentBox
                title="Eidolons"
                actions={
                    <NovaflareButtons
                        hasNovaflare={novaflare?.hasNovaflare!}
                        value={novaflare?.value!}
                        onChange={novaflare?.onChange!}
                    />
                }
            >
                <Grid container spacing={3}>
                    {objectKeys(eidolon).map((key, index) => (
                        <Grid
                            key={key}
                            size={{ xs: 12, md: 6 }}
                            sx={{
                                p: 2,
                                backgroundColor: theme.background(1, "light"),
                                border: theme.mainContentBox.border,
                                borderRadius: theme.mainContentBox.borderRadius,
                            }}
                        >
                            <Stack
                                key={index}
                                spacing={2}
                                direction="row"
                                alignItems="center"
                                sx={{ mb: "8px" }}
                            >
                                <Image
                                    src={`characters/eidolons/${name.toLowerCase()}_${key}`}
                                    alt={key}
                                    style={theme.styles.skillIcon(element)}
                                />
                                <Box>
                                    <TextStyled variant="h6-styled">
                                        {eidolon[key].name}
                                    </TextStyled>
                                    <TextStyled sx={{ fontStyle: "italic" }}>
                                        {key.toUpperCase()}
                                    </TextStyled>
                                </Box>
                            </Stack>
                            <Text
                                component="span"
                                sx={{ color: theme.text.description }}
                            >
                                {parseSkillDescription({
                                    description: eidolon[key].description,
                                    onClick: handleClickOpen,
                                })}
                            </Text>
                        </Grid>
                    ))}
                </Grid>
            </MainContentBox>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <CharacterSkillKeywordPopup
                    onClose={handleClose}
                    tag={tag}
                    keywords={keywords}
                />
            </Dialog>
        </>
    );
}

export default CharacterEidolon;
