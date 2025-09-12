import { useState, BaseSyntheticEvent, CSSProperties } from "react";

// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { Text, TextStyled } from "styled/StyledTypography";
import { StyledTab, StyledTabs, TabPanel } from "styled/StyledTabs";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Card,
    Stack,
    Divider,
    Box,
} from "@mui/material";

// Helper imports
import { objectKeys } from "helpers/utils";
import { formatPieceType, formatSetEffectKeys } from "helpers/relics";

// Type imports
import { RelicProps } from "types/relic";

function RelicInfo({ relic }: RelicProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const { name, displayName, pieces, rarity } = relic;

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const tabIcon = (index: number): CSSProperties => {
        const selected = index === tabValue;
        return {
            width: matches_sm_up ? "48px" : "40px",
            height: matches_sm_up ? "48px" : "40px",
            margin: "4px 0",
            padding: "4px",
            backgroundColor: theme.appbar.backgroundColor,
            borderWidth: selected ? "thick" : "2px",
            borderStyle: selected ? "double" : "solid",
            borderColor: theme.border.color.primary,
            borderRadius: "8px",
        };
    };

    const imageStyle: CSSProperties = {
        width: "128px",
        height: "128px",
        border: `2px solid ${theme.border.color}`,
        borderRadius: "16px",
        padding: "16px",
        backgroundImage: `url(https://assets.irminsul.gg/hsr/backgrounds/Background_${rarity}_Star.png)`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
    };

    return (
        <Stack spacing={2}>
            <Card
                sx={{
                    p: "16px",
                    backgroundColor: theme.background(2),
                }}
            >
                <TextStyled variant="h4-styled">{displayName}</TextStyled>
            </Card>
            <MainContentBox
                title={pieces[tabValue].name}
                headerProps={{ padding: "16px" }}
                contentProps={{ padding: 0 }}
            >
                <StyledTabs
                    variant="scrollable"
                    value={tabValue}
                    onChange={handleTabChange}
                    scrollButtons="auto"
                    allowScrollButtonsMobile={!matches_sm_up}
                    sx={{
                        height: "100%",
                        "& .MuiTabScrollButton-root": {
                            color: theme.text.primary,
                            backgroundColor: theme.background(2),
                        },
                        ".MuiTabs-scrollButtons.Mui-disabled": {
                            opacity: 0.3,
                        },
                        "& .MuiTabs-indicatorSpan": {
                            width: "100%",
                            backgroundColor: theme.border.color.primary,
                        },
                    }}
                >
                    {pieces.map((piece, index) => (
                        <StyledTab
                            key={piece.type}
                            icon={
                                <Image
                                    src={`relics/icons/${piece.type}`}
                                    alt={piece.type}
                                    style={tabIcon(index)}
                                />
                            }
                            sx={{ px: 0 }}
                        />
                    ))}
                </StyledTabs>
                {pieces.map((piece, index) => (
                    <TabPanel key={piece.type} index={index} value={tabValue}>
                        <Stack spacing={2} divider={<Divider />}>
                            <Box>
                                <TextStyled
                                    sx={{ mb: "16px", fontStyle: "italic" }}
                                >
                                    {formatPieceType(piece.type)}
                                </TextStyled>
                                <FlexBox
                                    sx={{
                                        alignItems: "flex-start",
                                        flexWrap: "wrap",
                                        gap: "32px",
                                    }}
                                >
                                    <Image
                                        src={`relics/sets/${name
                                            .split(" ")
                                            .join("_")}/${piece.type}`}
                                        alt={piece.name}
                                        style={imageStyle}
                                    />
                                    <Box sx={{ maxWidth: "720px" }}>
                                        {objectKeys(relic.setEffect).map(
                                            (pc) => (
                                                <Text
                                                    key={pc}
                                                    sx={{
                                                        color: theme.text
                                                            .description,
                                                    }}
                                                    gutterBottom
                                                >
                                                    <span
                                                        style={{
                                                            color: theme.text
                                                                .primary,
                                                        }}
                                                    >
                                                        {`${formatSetEffectKeys(
                                                            pc
                                                        )}: `}
                                                    </span>
                                                    {relic.setEffect[pc]}
                                                </Text>
                                            )
                                        )}
                                    </Box>
                                </FlexBox>
                            </Box>
                            <Text
                                variant="subtitle1"
                                sx={{ fontStyle: "italic" }}
                            >
                                {piece.description}
                            </Text>
                        </Stack>
                    </TabPanel>
                ))}
            </MainContentBox>
        </Stack>
    );
}

export default RelicInfo;
