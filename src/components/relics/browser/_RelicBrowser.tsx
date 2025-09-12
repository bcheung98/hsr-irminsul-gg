import { useState, BaseSyntheticEvent, useMemo } from "react";

// Component imports
import RelicListRow from "./RelicListRow";
import InfoCard from "custom/InfoCard";
import Image from "custom/Image";
import SearchBar from "custom/SearchBar";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectCavernRelics, selectPlanarRelics } from "reducers/relic";
import { selectBrowserSettings, setBrowserView, View } from "reducers/browser";

// Type imports
import { Relic } from "types/relic";

function RelicBrowser() {
    const documentTitle = `Relics ${import.meta.env.VITE_DOCUMENT_TITLE}`;
    const documentDesc = `A list of all Honkai: Star Rail Relic Sets`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const dispatch = useAppDispatch();

    const browserSettings = useAppSelector(selectBrowserSettings).artifacts;

    const [type, setType] = useState<"cavern" | "planar">("cavern");
    const handleType = (
        _: BaseSyntheticEvent,
        newType: "cavern" | "planar"
    ) => {
        if (newType !== null) {
            setType(newType);
            setSearchValue("");
        }
    };

    const cavernRelics = [...useAppSelector(selectCavernRelics)].sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
    );
    const planarRelics = [...useAppSelector(selectPlanarRelics)].sort((a, b) =>
        a.displayName.localeCompare(b.displayName)
    );
    const relics: Relic[] = [];
    if (type.includes("cavern")) {
        relics.push(...cavernRelics);
    }
    if (type.includes("planar")) {
        relics.push(...planarRelics);
    }

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };

    const currentRelics = useMemo(
        () => filterRelics(relics, searchValue),
        [relics, searchValue]
    );

    const typeButtons: CustomToggleButtonProps[] = [
        {
            value: "cavern",
            icon: (
                <Image
                    src="relics/icons/head"
                    alt="Cavern Relics"
                    style={{ width: "24px" }}
                    tooltip="Cavern Relics"
                />
            ),
        },
        {
            value: "planar",
            icon: (
                <Image
                    src="relics/icons/orb"
                    alt="Planar Ornaments"
                    style={{ width: "24px" }}
                    tooltip="Planar Ornaments"
                />
            ),
        },
    ];

    const currentView = browserSettings.view;
    const [view, setView] = useState<View>(currentView);
    const handleView = (_: BaseSyntheticEvent, view: View) => {
        if (view !== null) {
            setView(view);
            dispatch(setBrowserView({ type: "artifacts", view }));
        }
    };
    const viewButtons: CustomToggleButtonProps[] = [
        {
            value: "icon",
            icon: <ViewCompactIcon />,
        },
        {
            value: "table",
            icon: <TableRowsIcon />,
        },
    ];

    return (
        <>
            <Grid
                container
                rowSpacing={2}
                columnSpacing={3}
                sx={{ mb: "20px" }}
            >
                <Grid size="auto">
                    <TextStyled variant="h5-styled" sx={{ lineHeight: "36px" }}>
                        Relics
                    </TextStyled>
                </Grid>
                <Grid size={{ xs: 3, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={typeButtons}
                        value={type}
                        exclusive
                        onChange={handleType}
                        highlightOnHover={false}
                    />
                </Grid>
                <Grid size={{ xs: 3, sm: "auto" }}>
                    <ToggleButtons
                        color="primary"
                        buttons={viewButtons}
                        value={view}
                        exclusive
                        onChange={handleView}
                        highlightOnHover={false}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <SearchBar
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleInputChange}
                        size={{ height: "36px" }}
                    />
                </Grid>
            </Grid>
            {view === "icon" && (
                <Grid container spacing={3}>
                    {currentRelics.map((relic, index) => (
                        <InfoCard
                            key={index}
                            id={`${relic.name}-relicBrowser`}
                            name={relic.name}
                            displayName={relic.displayName}
                            type="relic"
                            rarity={relic.rarity}
                        />
                    ))}
                </Grid>
            )}
            {view === "table" && (
                <Card>
                    {currentRelics.map((relic, index) => (
                        <RelicListRow key={index} relic={relic} index={index} />
                    ))}
                </Card>
            )}
        </>
    );
}

export default RelicBrowser;

function filterRelics(relics: Relic[], searchValue: string) {
    let results = [];
    if (searchValue !== "") {
        results = relics.filter(
            (relic) =>
                relic.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                relic.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    } else {
        results = relics;
    }
    return results.sort((a, b) =>
        b.release.version.localeCompare(a.release.version, undefined, {
            numeric: true,
        })
    );
}
