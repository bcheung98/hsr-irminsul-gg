import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character } from "types/character";
import { Weapon } from "types/weapon";
import { Banner } from "types/banner";
import { RelicData } from "types/relic";

export type LoadingStatus = "idle" | "pending" | "success" | "error";

// https://api.irminsul.gg/hsr/characters.json
const charactersURL = "https://api.irminsul.gg/hsr/characters.json";

// https://api.irminsul.gg/hsr/characters-v2.json
const charactersV2URL = "https://api.irminsul.gg/hsr/characters-v2.json";

// https://api.irminsul.gg/hsr/weapons.json
const weaponsURL = "https://api.irminsul.gg/hsr/weapons.json";

// https://api.irminsul.gg/hsr/relics.json
const relicsURL = "https://api.irminsul.gg/hsr/relics.json";

const characterBannerURL = "https://api.irminsul.gg/hsr/character-banners.json";
const weaponBannerURL = "https://api.irminsul.gg/hsr/weapon-banners.json";

export const fetchCharacters = createAsyncThunk(
    "GET/characters",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersURL);
        return await response.json();
    }
);

export const fetchCharactersV2 = createAsyncThunk(
    "GET/charactersV2",
    async (): Promise<Character[]> => {
        const response = await fetch(charactersV2URL);
        return await response.json();
    }
);

export const fetchWeapons = createAsyncThunk(
    "GET/weapons",
    async (): Promise<Weapon[]> => {
        const response = await fetch(weaponsURL);
        return await response.json();
    }
);

export const fetchRelics = createAsyncThunk(
    "GET/relics",
    async (): Promise<RelicData> => {
        const response = await fetch(relicsURL);
        return await response.json();
    }
);

export const fetchCharacterBanners = createAsyncThunk(
    "GET/characterBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(characterBannerURL);
        return await response.json();
    }
);

export const fetchWeaponBanners = createAsyncThunk(
    "GET/weaponBanners",
    async (): Promise<Banner[]> => {
        const response = await fetch(weaponBannerURL);
        return await response.json();
    }
);
