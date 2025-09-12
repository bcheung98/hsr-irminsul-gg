// Component imports
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { Text, TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { objectKeys } from "helpers/utils";
import { formatSetEffectKeys } from "helpers/relics";

// Type imports
import { Relic } from "types/relic";

function RelicListRow({ relic, index }: { relic: Relic; index: number }) {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const { name, displayName, setEffect } = relic;

    const href = `/relics/${name.split(" ").join("_").toLowerCase()}`;

    return (
        <Grid
            container
            spacing={{ xs: 1, md: 4 }}
            key={displayName}
            sx={{
                p: "8px 16px",
                flexWrap: "wrap",
                alignItems: "center",
                backgroundColor:
                    index % 2 === 0
                        ? theme.background(1)
                        : theme.background(0, "dark"),
            }}
        >
            <Grid size={{ xs: 12, md: 3 }}>
                <Stack
                    spacing={{ xs: 1, md: 2 }}
                    direction="row"
                    alignItems="center"
                >
                    <RouterLink to={href}>
                        <Image
                            src={`relics/sets/${name
                                .split(" ")
                                .join("_")}/_icon.png`}
                            alt={name}
                            style={{
                                width: matches_md_up ? "72px" : "64px",
                                height: matches_md_up ? "72px" : "64px",
                            }}
                        />
                    </RouterLink>
                    <RouterLink to={href}>
                        <TextStyled
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    color: theme.text.selected,
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            {displayName}
                        </TextStyled>
                    </RouterLink>
                </Stack>
            </Grid>
            <Grid size="grow">
                <Stack spacing={0.5}>
                    {objectKeys(setEffect).map((pc) => (
                        <Text
                            key={pc}
                            variant="body2-styled"
                            sx={{
                                color: theme.text.description,
                            }}
                        >
                            <span
                                style={{
                                    color: theme.text.primary,
                                }}
                            >
                                {`${formatSetEffectKeys(pc)}: `}
                            </span>
                            {setEffect[pc]}
                        </Text>
                    ))}
                </Stack>
            </Grid>
        </Grid>
    );
}

export default RelicListRow;
