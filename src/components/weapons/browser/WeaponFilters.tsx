import { BaseSyntheticEvent } from "react";

// Component imports
import Dropdown from "custom/Dropdown";
import Image from "custom/Image";
import ToggleButtons from "custom/ToggleButtons";
import RarityStars from "custom/RarityStars";

// MUI imports
import { useTheme, List, IconButton, Toolbar, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";
import { selectUnreleasedContent } from "reducers/settings";
import {
    activeWeaponFilters,
    clearFilters,
    selectWeaponFilters,
    setCalyxMat,
    setCommonMat,
    setPath,
    setRarity,
} from "reducers/weaponFilters";
import { paths, rarities } from "data/common";
import {
    filteredCalyxMaterials,
    formatCalyxMaterials,
} from "data/materials/calyxMaterials";
import {
    filteredCommonMaterials,
    formatCommonMaterials,
} from "data/materials/commonMaterials";

// Type imports
import { Path, Rarity } from "types/_common";
import {
    CalyxMaterial,
    CalyxMaterialKeys,
    CommonMaterial,
    CommonMaterialKeys,
} from "types/materials";

function WeaponFilters({ handleClose }: { handleClose: (arg0: any) => void }) {
    const theme = useTheme();

    const filters = useAppSelector(selectWeaponFilters);
    const dispatch = useAppDispatch();

    const showUnrelased = useAppSelector(selectUnreleasedContent);

    const filterGroups = [
        {
            name: "Path",
            value: filters.path,
            onChange: (_: BaseSyntheticEvent, newValues: Path[]) =>
                dispatch(setPath(newValues)),
            buttons: createButtons<Path>(paths, "paths"),
        },
        {
            name: "Rarity",
            value: filters.rarity,
            onChange: (_: BaseSyntheticEvent, newValues: Rarity[]) =>
                dispatch(setRarity(newValues)),
            buttons: rarities.slice(0, -2).map((rarity) => ({
                value: rarity,
                label: <RarityStars rarity={rarity} variant="h6-styled" />,
            })),
        },
        {
            name: "Calyx Material",
            value: filters.calyxMat,
            onChange: (_: BaseSyntheticEvent, newValues: CalyxMaterial[]) =>
                dispatch(setCalyxMat(newValues)),
            buttons: createButtons<CalyxMaterial>(
                filteredCalyxMaterials(showUnrelased),
                "materials/calyx"
            ),
        },
        {
            name: "Common Material",
            value: filters.commonMat,
            onChange: (_: BaseSyntheticEvent, newValues: CommonMaterial[]) =>
                dispatch(setCommonMat(newValues)),
            buttons: createButtons<CommonMaterial>(
                filteredCommonMaterials(showUnrelased),
                "materials/common"
            ),
        },
    ];

    return (
        <>
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Button
                    onClick={() => dispatch(clearFilters())}
                    disabled={!useAppSelector(activeWeaponFilters)}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    startIcon={<RestartAltIcon />}
                    sx={{
                        height: "32px",
                        "&.Mui-disabled": {
                            opacity: 0.35,
                            color: theme.appbar.color,
                        },
                    }}
                >
                    Reset
                </Button>
                <IconButton
                    onClick={handleClose}
                    sx={{ color: theme.appbar.color }}
                >
                    <CloseIcon />
                </IconButton>
            </Toolbar>
            <List sx={{ px: "16px" }}>
                {filterGroups.map((filter, index) => (
                    <Dropdown
                        key={index}
                        title={filter.name}
                        titleColor={
                            filter.value.length > 0
                                ? theme.text.selected
                                : theme.appbar.color
                        }
                        contentPadding="4px 0px 4px 24px"
                    >
                        <ToggleButtons
                            color="secondary"
                            buttons={filter.buttons}
                            value={filter.value}
                            onChange={filter.onChange}
                            spacing={4}
                            padding={"label" in filter.buttons[0] ? "0 8px" : 0}
                        />
                    </Dropdown>
                ))}
            </List>
        </>
    );
}

export default WeaponFilters;

function createButtons<T>(items: readonly T[], url: string) {
    // const padding = url.startsWith("materials/") ? "0px" : "4px";
    return items.map((item) => ({
        value: item,
        icon: (
            <Image
                src={`${url}/${item}${
                    ["materials/calyx", "materials/common"].includes(url)
                        ? "3"
                        : ""
                }`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={getTooltip(item, url)}
            />
        ),
    }));
}

function getTooltip<T>(item: T, url: string) {
    let tooltip;
    if (url.startsWith("materials/common")) {
        tooltip = formatCommonMaterials(item as CommonMaterialKeys);
    } else if (url.startsWith("materials/calyx")) {
        tooltip = formatCalyxMaterials(item as CalyxMaterialKeys);
    } else {
        tooltip = `${item}`;
    }
    return tooltip;
}
