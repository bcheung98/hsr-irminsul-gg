import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Typography, Card, CardMedia, CardContent, ButtonBase, Box } from "@mui/material";
import { CustomTooltip } from "../../helpers/CustomTooltip";
import MaterialGrid from "../../helpers/MaterialGrid";
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage";

const CharacterCard = (props) => {

    const theme = useTheme();

    let { name, rarity, element, path } = props.character;

    const smallIcon = {
        width: "32px",
        height: "32px",
        backgroundColor: `${theme.materialImage.backgroundColor}`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "32px",
        marginBottom: "10px",
    };

    return (
        <Card
            sx={{
                m: "15px",
                backgroundColor: `${theme.card.backgroundColor}`,
                border: `1px solid ${theme.border.color}`,
                borderRadius: "5px 25px 5px 5px",
            }}
        >
            <ButtonBase disableRipple href={`/project-stellaron/character/${props.character.name.split(" ").join("_").toLowerCase()}`} target="_blank">
                <Box>
                    <Box
                        sx={{
                            display: "grid",
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                        }}
                    >
                        <CustomTooltip title={element} arrow placement="top">
                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/elements/Element_${element}.png`)} alt={element} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                        <CustomTooltip title={path} arrow placement="top">
                            <img style={smallIcon} src={(`${process.env.REACT_APP_URL}/paths/Path_The_${path}.png`)} alt={path} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    </Box>
                    <CardMedia
                        image={`${process.env.REACT_APP_URL}/characters/avatars/Avatar_${name.split(" ").join("_")}.png`}
                        alt={name}
                        sx={{ width: "192px", height: "236px" }}
                    />
                    <Box
                        sx={{
                            mt: "-60px",
                            textAlign: "center",
                            background: `linear-gradient(transparent, ${GetBackgroundColor(rarity)})`,
                            borderBottom: `7px solid ${GetRarityColor(rarity)}`,
                        }}
                    >
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h5" sx={{ color: "white", textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000", fontWeight: "bold" }}>
                                {props.character.displayName ? props.character.displayName : name}
                            </Typography>
                            <Typography sx={{ color: "rgb(255, 208, 112)", textShadow: "#e3721b 1px 1px 10px" }} variant="h6">
                                {[...Array(rarity).keys()].map(() => "✦")}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </ButtonBase>
            <CardContent sx={{ backgroundColor: `${theme.table.header.backgroundColor}`, mb: "-12px" }}>
                <MaterialGrid character={props.character} size="32px" />
            </CardContent>
        </Card >
    )

}

export default CharacterCard;

function GetRarityColor(rarity) {
    let color = "rgb(0, 90, 156)";
    if (rarity === 5) {
        color = "rgba(255, 208, 112)";
    }
    if (rarity === 4) {
        color = "rgba(175, 134, 255)";
    }
    return color;
}

function GetBackgroundColor(rarity) {
    let opacity = 0.45;
    let color = `rgb(0, 90, 156, ${opacity})`;
    if (rarity === 5) {
        color = `rgba(255, 199, 129, ${opacity})`;
    }
    if (rarity === 4) {
        color = `rgba(193, 153, 253, ${opacity})`;
    }
    return color;
}