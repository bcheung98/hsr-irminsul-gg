export const characterXPMaterials = [
    {
        id: "characterXP_0",
        category: "characterXP",
        tag: "CharacterXP1",
        name: "Travel Encounters",
        displayName: "Travel Encounters",
        rarity: 2,
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_1",
        category: "characterXP",
        tag: "CharacterXP2",
        name: "Adventure Log",
        displayName: "Adventure Log",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: "characterXP_2",
        category: "characterXP",
        tag: "CharacterXP3",
        name: "Traveler's Guide",
        displayName: "Traveler's Guide",
        rarity: 4,
        release: {
            version: "1.0",
        },
    },
] as const;

export const weaponXPMaterials = [
    {
        id: "weaponXP_0",
        category: "weaponXP",
        tag: "WeaponXP1",
        name: "Sparse Aether",
        displayName: "Sparse Aether",
        rarity: 2,
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_1",
        category: "weaponXP",
        tag: "WeaponXP2",
        name: "Condensed Aether",
        displayName: "Condensed Aether",
        rarity: 3,
        release: {
            version: "1.0",
        },
    },
    {
        id: "weaponXP_2",
        category: "weaponXP",
        tag: "WeaponXP3",
        name: "Refined Aether",
        displayName: "Refined Aether",
        rarity: 4,
        release: {
            version: "1.0",
        },
    },
] as const;

export const characterXPMatNames = characterXPMaterials.map((mat) => mat.tag);
export const weaponXPMatNames = weaponXPMaterials.map((mat) => mat.tag);

export function getCharacterXPMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return characterXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}

export function getWeaponXPMaterial({ id, tag }: { id?: string; tag: string }) {
    return weaponXPMaterials.find((mat) => mat.id === id || mat.tag === tag);
}
