export const weeklyBossMaterials = [
    {
        id: "weeklyBossMat_0",
        category: "weeklyBossMat",
        tag: "Destroyer's Final Road",
        name: "Destroyer's Final Road",
        displayName: "Destroyer's Final Road",
        source: "Doomsday Beast",
        rarity: 4,
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_1",
        category: "weeklyBossMat",
        tag: "Guardian's Lament",
        name: "Guardian's Lament",
        displayName: "Guardian's Lament",
        source: "Cocolia",
        rarity: 4,
        release: { version: "1.0" },
    },
    {
        id: "weeklyBossMat_2",
        category: "weeklyBossMat",
        tag: "Regret of Infinite Ochema",
        name: "Regret of Infinite Ochema",
        displayName: "Regret of Infinite Ochema",
        source: "Phantylia",
        rarity: 4,
        release: { version: "1.2" },
    },
    {
        id: "weeklyBossMat_3",
        category: "weeklyBossMat",
        tag: "Past Evils of the Borehole Planet Disaster",
        name: "Past Evils of the Borehole Planet Disaster",
        displayName: "Past Evils of the Borehole Planet Disaster",
        source: "Starcrusher Swarm King",
        rarity: 4,
        release: { version: "1.6" },
    },
    {
        id: "weeklyBossMat_4",
        category: "weeklyBossMat",
        tag: "Lost Echo of the Shared Wish",
        name: "Lost Echo of the Shared Wish",
        displayName: "Lost Echo of the Shared Wish",
        source: "The Great Septimus",
        rarity: 4,
        release: { version: "2.2" },
    },
    {
        id: "weeklyBossMat_5",
        category: "weeklyBossMat",
        tag: "Auspice Sliver",
        name: "Auspice Sliver",
        displayName: "Auspice Sliver",
        source: 'Shadow of "Feixiao"',
        rarity: 4,
        release: { version: "2.5" },
    },
    {
        id: "weeklyBossMat_6",
        category: "weeklyBossMat",
        tag: "Daythunder Anamnesis",
        name: "Daythunder Anamnesis",
        displayName: "Daythunder Anamnesis",
        source: "Avatar of the Sky",
        rarity: 4,
        release: { version: "3.3" },
    },
    {
        id: "weeklyBossMat_7",
        category: "weeklyBossMat",
        tag: "Vanquished Flow's Reticence",
        name: "Vanquished Flow's Reticence",
        displayName: "Vanquished Flow's Reticence",
        source: "Irontomb",
        rarity: 4,
        release: { version: "3.7" },
    },
] as const;

export const weeklyBossMatNames = weeklyBossMaterials.map((mat) => mat.tag);

export function getWeeklyBossMaterial({
    id,
    tag,
}: {
    id?: string;
    tag: string;
}) {
    return weeklyBossMaterials.find((mat) => mat.id === id || mat.tag === tag);
}
