import { Relic, RelicPiece } from "types/relic";

export function formatPieceType(piece: RelicPiece) {
    switch (piece) {
        case "head":
            return "Head";
        case "hand":
            return "Hands";
        case "body":
            return "Body";
        case "feet":
            return "Feet";
        case "orb":
            return "Planar Sphere";
        case "rope":
            return "Link Rope";
    }
}

export function formatSetEffectKeys(key: keyof Relic["setEffect"]) {
    switch (key) {
        case "twoPiece":
            return "2-Piece Set";
        case "fourPiece":
            return "4-Piece Set";
    }
}
