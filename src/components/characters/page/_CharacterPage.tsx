import { BaseSyntheticEvent, useState } from "react";
import { useParams } from "react-router";

// Component imports
import CharacterImage from "./CharacterImage";
import CharacterInfoMain from "./CharacterInfoMain";
import CharacterInfoMisc from "./CharacterInfoMisc";
import CharacterStats from "./CharacterStats";
import CharacterAscension from "./CharacterAscension";
import CharacterSkills from "./skills/CharacterSkills";
import CharacterMemosprite from "./memosprite/CharacterMemosprite";
import CharacterTraces from "./traces/CharacterTraces";
import CharacterEidolon from "./CharacterEidolon";
import BetaTag from "custom/BetaTag";
import PageNotFound from "components/PageNotFound";

// MUI imports
import { useTheme, useMediaQuery, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectCharacters, selectCharactersV2 } from "reducers/character";

// Type imports
import { Character } from "types/character";
import { Novaflare, NovaflareButtonsProps } from "./CharacterNovaflare";

function CharacterPage() {
    const theme = useTheme();
    const matches_md_up = useMediaQuery(theme.breakpoints.up("md"));

    const params = useParams<{ name: string }>();
    const character = useAppSelector(selectCharacters).find(
        (char) => char.name.split(" ").join("_").toLowerCase() === params.name
    );

    if (character !== undefined) {
        const documentTitle = `${character.fullName} ${
            import.meta.env.VITE_DOCUMENT_TITLE
        }`;
        const documentDesc = `${character.fullName} - ${character.rarity}★ ${character.element} ${character.path}`;
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

        const characterV2 = useAppSelector(selectCharactersV2).find(
            (char) =>
                char.name.split(" ").join("_").toLowerCase() === params.name
        );

        const [mode, setMode] = useState<Novaflare>("enhanced");
        const [charData, setCharData] = useState<Character>(
            characterV2 || character
        );
        const handleNovaflareChange = (
            _: BaseSyntheticEvent,
            newMode: Novaflare
        ) => {
            if (newMode !== null) {
                setMode(newMode);
                if (newMode === "enhanced" && characterV2) {
                    setCharData(characterV2);
                } else {
                    setCharData(character);
                }
            }
        };

        const novaflare: NovaflareButtonsProps = {
            hasNovaflare: characterV2 !== undefined,
            value: mode,
            onChange: handleNovaflareChange,
        };

        const betaTag = <BetaTag version={character.release.version} />;

        const charSplash = <CharacterImage character={charData} />;
        const infoMain = <CharacterInfoMain character={charData} />;
        const infoMisc = <CharacterInfoMisc character={charData} />;
        const ascension = <CharacterAscension character={charData} />;
        const stats = <CharacterStats character={charData} />;

        return (
            <Stack spacing={2}>
                {matches_md_up ? (
                    <Grid container spacing={3}>
                        <Grid size={{ md: 4, xl: "auto" }}>
                            <Stack spacing={2}>
                                {charSplash}
                                {infoMisc}
                            </Stack>
                        </Grid>
                        <Grid size="grow">
                            <Stack spacing={2}>
                                {betaTag}
                                {infoMain}
                                {stats}
                                {ascension}
                            </Stack>
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        {betaTag}
                        {infoMain}
                        {charSplash}
                        {stats}
                        {ascension}
                        {infoMisc}
                    </>
                )}
                <CharacterSkills character={charData} novaflare={novaflare} />
                <CharacterMemosprite
                    character={charData}
                    novaflare={novaflare}
                />
                <CharacterTraces character={charData} novaflare={novaflare} />
                <CharacterEidolon character={charData} novaflare={novaflare} />
            </Stack>
        );
    } else {
        return <PageNotFound />;
    }
}

export default CharacterPage;
