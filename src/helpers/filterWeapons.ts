import { WeaponFilterState } from "reducers/weaponFilters";
import { Weapon } from "types/weapon";
import { BrowserSettings } from "reducers/browser";

export function filterWeapons(
    weapons: Weapon[],
    filters: WeaponFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let weps = [...weapons];
    if (filters.path.length > 0) {
        weps = weps.filter((wep) => filters.path.includes(wep.path));
    }
    if (filters.rarity.length > 0) {
        weps = weps.filter((wep) => filters.rarity.includes(wep.rarity));
    }
    if (filters.calyxMat.length > 0) {
        weps = weps.filter((wep) =>
            filters.calyxMat.includes(wep.materials.calyxMat)
        );
    }
    if (filters.commonMat.length > 0) {
        weps = weps.filter((wep) =>
            filters.commonMat.includes(wep.materials.commonMat)
        );
    }
    if (searchValue !== "") {
        weps = weps.filter(
            (wep) =>
                wep.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                wep.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }

    switch (sortSettings.sortBy) {
        case "name":
            weps = weps.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            break;
        case "rarity":
            weps = weps.sort(
                (a, b) =>
                    b.rarity - a.rarity ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "path":
            weps = weps.sort(
                (a, b) =>
                    a.path.localeCompare(b.path) ||
                    a.displayName.localeCompare(b.displayName)
            );
            break;
        case "release":
            weps = weps.sort(
                (a, b) =>
                    b.id - a.id || a.displayName.localeCompare(b.displayName)
            );
            break;
        case "element":
            break;
    }

    if (sortSettings.sortDirection === "desc") {
        weps = weps.reverse();
    }

    return weps;
}
