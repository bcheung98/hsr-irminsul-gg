import parse from "html-react-parser";

// Component imports
import RarityStars from "custom/RarityStars";
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import { useTheme, Box, Card, Divider, Stack } from "@mui/material";

// Type imports
import { CharacterProps } from "types/character";

function CharacterInfoMain({ character }: CharacterProps) {
    const theme = useTheme();

    const { fullName, rarity, element, path, description } = character;

    return (
        <Card
            sx={{
                p: "16px 24px",
                backgroundColor: theme.background(2),
            }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <FlexBox
                    sx={{ flexWrap: "wrap", columnGap: "24px", rowGap: "8px" }}
                >
                    <Image
                        src={`elements/${element}`}
                        alt={element}
                        style={{ width: "64px" }}
                        tooltip={element}
                    />
                    <Box>
                        <Box sx={{ mb: "8px" }}>
                            <TextStyled variant="h4-styled">
                                {fullName}
                            </TextStyled>
                        </Box>
                        <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                            <InfoChip
                                color="tertiary"
                                label={
                                    <RarityStars
                                        rarity={rarity}
                                        variant="h5-styled"
                                    />
                                }
                                padding="0px"
                            />
                            <InfoChip
                                color="tertiary"
                                src={`paths/${path}`}
                                label={path}
                            />
                        </FlexBox>
                    </Box>
                </FlexBox>
                <TextStyled
                    variant="subtitle1-styled"
                    sx={{ fontStyle: "italic" }}
                >
                    {parse(description)}
                </TextStyled>
            </Stack>
        </Card>
    );
}

export default CharacterInfoMain;
