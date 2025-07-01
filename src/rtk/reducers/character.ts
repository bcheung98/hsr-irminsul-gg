import { createSlice } from "@reduxjs/toolkit";
import { isUnreleasedContent } from "helpers/utils";
import { startAppListening } from "helpers/hooks";
import {
    fetchCharacters,
    fetchCharactersV2,
    LoadingStatus,
} from "rtk/fetchData";
import { RootState } from "rtk/store";
import { Character } from "types/character";

export interface CharacterState {
    status: LoadingStatus;
    characters: Character[];
    charactersV2: Character[];
}

const storedCharacters = localStorage.getItem("data/characters") || "null";
const storedCharactersV2 = localStorage.getItem("data/charactersV2") || "null";

const storedSettings = localStorage.getItem("settings") || "{}";
const { unreleasedContent = false } = JSON.parse(storedSettings);

const initialState: CharacterState = {
    status: "idle",
    characters: storedCharacters !== "null" ? JSON.parse(storedCharacters) : [],
    charactersV2:
        storedCharactersV2 !== "null" ? JSON.parse(storedCharactersV2) : [],
};

export const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedCharacters) {
                state.characters = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchCharacters.rejected, (state) => {
            state.status = "error";
        });
        builder.addCase(fetchCharactersV2.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(fetchCharactersV2.fulfilled, (state, action) => {
            let payload = action.payload;
            if (!unreleasedContent) {
                payload = payload.filter((item) =>
                    isUnreleasedContent(item.release.version)
                );
            }
            if (JSON.stringify(payload) !== storedCharactersV2) {
                state.charactersV2 = payload;
            }
            state.status = "success";
        });
        builder.addCase(fetchCharactersV2.rejected, (state) => {
            state.status = "error";
        });
    },
});

export const selectCharacters = (state: RootState): Character[] =>
    state.characters.characters;

export const selectCharactersV2 = (state: RootState): Character[] =>
    state.characters.charactersV2;

export default characterSlice.reducer;

startAppListening({
    actionCreator: fetchCharacters.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedCharacters) {
            localStorage.setItem("data/characters", data);
        }
    },
});

startAppListening({
    actionCreator: fetchCharactersV2.fulfilled,
    effect: (action) => {
        let payload = action.payload;
        if (!unreleasedContent) {
            payload = payload.filter((item) =>
                isUnreleasedContent(item.release.version)
            );
        }
        const data = JSON.stringify(payload);
        if (data !== storedCharactersV2) {
            localStorage.setItem("data/charactersV2", data);
        }
    },
});
