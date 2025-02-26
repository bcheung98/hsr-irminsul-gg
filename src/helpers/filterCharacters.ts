import { Character } from "types/character";
import { CharacterFilterState } from "reducers/characterFilters";
import { BrowserSettings } from "reducers/browser";

export function filterCharacters(
    characters: Character[],
    filters: CharacterFilterState,
    searchValue: string,
    sortSettings: BrowserSettings
) {
    let chars = [...characters];
    if (filters.element.length > 0) {
        chars = chars.filter((char) => filters.element.includes(char.element));
    }
    if (filters.path.length > 0) {
        chars = chars.filter((char) => filters.path.includes(char.path));
    }
    if (filters.rarity.length > 0) {
        chars = chars.filter((char) => filters.rarity.includes(char.rarity));
    }
    if (filters.calyxMat.length > 0) {
        chars = chars.filter((char) =>
            filters.calyxMat.includes(char.materials.calyxMat)
        );
    }
    if (filters.commonMat.length > 0) {
        chars = chars.filter((char) =>
            filters.commonMat.includes(char.materials.commonMat)
        );
    }
    if (filters.bossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.bossMat.includes(char.materials.bossMat)
        );
    }
    if (filters.weeklyBossMat.length > 0) {
        chars = chars.filter((char) =>
            filters.weeklyBossMat.includes(char.materials.weeklyBossMat)
        );
    }
    if (filters.world.length > 0) {
        chars = chars.filter((char) => filters.world.includes(char.world));
    }
    if (searchValue) {
        chars = chars.filter(
            (char) =>
                char.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                char.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                char.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    switch (sortSettings.sortBy) {
        case "name":
            chars = chars.sort((a, b) => a.fullName.localeCompare(b.fullName));
            break;
        case "rarity":
            chars = chars.sort(
                (a, b) =>
                    b.rarity - a.rarity || a.fullName.localeCompare(b.fullName)
            );
            break;
        case "element":
            chars = chars.sort(
                (a, b) =>
                    a.element.localeCompare(b.element) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "path":
            chars = chars.sort(
                (a, b) =>
                    a.path.localeCompare(b.path) ||
                    a.fullName.localeCompare(b.fullName)
            );
            break;
        case "release":
            chars = chars.sort(
                (a, b) => b.id - a.id || a.fullName.localeCompare(b.fullName)
            );
            break;
    }

    if (sortSettings.sortDirection === "desc") {
        chars = chars.reverse();
    }

    return chars;
}
