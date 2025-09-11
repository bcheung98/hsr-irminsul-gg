import { WeaponFilterState } from "reducers/weaponFilters";
import { Weapon } from "types/weapon";
import { BrowserSettings } from "reducers/browser";
import { sortBy } from "./utils";
import { PathMap } from "data/common";

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

    const reverse = sortSettings.sortDirection === "desc";

    switch (sortSettings.sortBy) {
        case "name":
            weps = weps.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
            );
            if (reverse) {
                weps = weps.reverse();
            }
            break;
        case "rarity":
            weps = weps.sort(
                (a, b) =>
                    sortBy(a.rarity, b.rarity, reverse) ||
                    sortBy(b.displayName, a.displayName)
            );
            break;
        case "path":
            weps = weps.sort(
                (a, b) =>
                    sortBy(PathMap[b.path], PathMap[a.path], reverse) ||
                    sortBy(a.rarity, b.rarity) ||
                    sortBy(b.displayName, a.displayName)
            );
            break;
        case "release":
            weps = weps.sort(
                (a, b) =>
                    sortBy(a.release.version, b.release.version, reverse) ||
                    sortBy(b.rarity, a.rarity, !reverse) ||
                    sortBy(a.id, b.id, reverse) ||
                    sortBy(b.displayName, a.displayName, !reverse)
            );
            break;
        case "element":
            break;
    }

    return weps;
}
