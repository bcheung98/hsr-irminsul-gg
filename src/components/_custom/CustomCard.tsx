import React from "react"

// Component imports
import { CustomTooltip } from "../_custom/CustomTooltip"

// MUI imports
import { useTheme, SxProps, Typography, ButtonBase, Box, Card } from "@mui/material"

// Helper imports
import { GetRarityColor, GetBackgroundColor } from "../../helpers/RarityColors"
import { formatCommonMats, formatWeeklyBossMats } from "../../helpers/TooltipText"
import zoomImageOnHover from "../../helpers/zoomImageOnHover"
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage"

interface CustomCardProps {
    name: string,
    id?: string,
    displayName?: string,
    type: "character" | "lightcone" | "relic",
    rarity?: number,
    variant?: "icon" | "avatar",
    size?: string,
    showName?: boolean,
    info?: {
        element?: string,
        path?: string
    },
    materials?: {
        calyxMat?: string,
        commonMat?: string,
        bossMat?: string,
        weeklyBossMat?: string
    },
    disableTooltip?: boolean,
    disableLink?: boolean,
    disableZoomOnHover?: boolean
}

function CustomCard({
    name,
    id = name,
    displayName = name,
    type,
    rarity = 3,
    variant = "icon",
    size = variant === "icon" ? "64px" : "188px",
    showName = variant === "avatar" ? true : false,
    info,
    materials,
    disableTooltip = showName,
    disableLink = false,
    disableZoomOnHover = false
}: CustomCardProps) {

    const theme = useTheme()

    id = id.split(" ").join("")

    const aspectRatio = () => {
        if (variant === "icon") {
            return "1 / 1"
        }
        else {
            if (type === "character") {
                return "374 / 512"
            }
            else {
                return "348 / 408"
            }
        }
    }

    const backgroundColor = () => {
        const baseBG = theme.materialImage.backgroundColor
        if (variant === "icon") {
            return baseBG
        }
        else {
            let opacity
            type === "character" ? opacity = 0.45 : opacity = 0.75
            return `linear-gradient(${baseBG} 60%, ${GetBackgroundColor(rarity, opacity)} 100%)`
        }
    }

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover && zoomImageOnHover(direction, `${id}-card-image`, cardImageStyle.transform)
    }

    let imageURL
    if (type === "character") { imageURL = `${process.env.REACT_APP_URL}/characters/${variant}s/${name.split(" ").join("_")}.png` }
    if (type === "lightcone") { imageURL = `${process.env.REACT_APP_URL}/lightcones/${variant === "icon" ? "small" : "medium"}/${name.split(" ").join("_")}.png` }

    const href = disableLink ? "" : `${process.env.REACT_APP_BASENAME}/${type}s/${name.split(" ").join("_").toLowerCase()}`

    const cardStyle: SxProps = {
        width: size,
        height: "auto",
        background: theme.materialImage.backgroundColor,
        border: "solid",
        borderWidth: variant === "icon" ? "2px" : "1px",
        borderColor: variant === "icon" ? GetRarityColor(rarity) : theme.border.color,
        borderRadius: variant === "icon" ? "5px" : "5px 25px 5px 5px",
        boxSizing: "content-box",
        containerType: "inline-size",
        position: "relative"
    }

    const cardImageStyle: React.CSSProperties = {
        width: size,
        height: variant === "icon" ? size : "auto",
        aspectRatio: aspectRatio(),
        boxSizing: "content-box",
        boxShadow: variant === "icon" ? `inset 0 0 30px 5px ${GetBackgroundColor(rarity)}` : "none",
        transform: variant === "avatar" && type === "character" ? "translate(0px, -10px)" : "translate(0px, 0px)",
    }

    const materialImageStyle: React.CSSProperties = {
        width: `calc(${size} / 5.5)`,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "5px",
        backgroundColor: `${theme.paper.backgroundColor}`,
        padding: "2px",
        boxSizing: "border-box",
    }

    const smallIconStyle: React.CSSProperties = {
        width: `calc(${size} / 5.25)`,
        height: `calc(${size} / 5.25)`,
        minWidth: "16px",
        minHeight: "16px",
        backgroundColor: theme.paper.backgroundColor,
        border: `1px solid ${theme.border.color}`,
        borderRadius: "32px",
        marginBottom: "10px",
        boxSizing: "border-box",
        padding: "4px"
    }

    return (
        <Card sx={cardStyle}>
            <Box
                sx={{ background: backgroundColor() }}
                onMouseEnter={() => handleHover("enter")}
                onMouseLeave={() => handleHover("leave")}
            >
                {
                    info &&
                    <Box
                        sx={{
                            display: "grid",
                            position: "absolute",
                            zIndex: 5,
                            top: "10px",
                            left: "10px",
                        }}
                    >
                        {
                            info.element !== undefined &&
                            <CustomTooltip title={info.element} arrow placement="top">
                                <img style={smallIconStyle} src={`${process.env.REACT_APP_URL}/elements/Element_${info.element}.png`} alt={info.element} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        }
                        {
                            info.path !== undefined &&
                            <CustomTooltip title={info.path} arrow placement="top">
                                <img style={smallIconStyle} src={`${process.env.REACT_APP_URL}/paths/The_${info.path}.png`} alt={info.path} onError={ErrorLoadingImage} />
                            </CustomTooltip>
                        }
                    </Box>
                }
                <ButtonBase disableRipple href={href} target="_blank">
                    <CustomTooltip title={!disableTooltip ? displayName : ""} arrow placement="top">
                        <img
                            src={imageURL} alt={name}
                            id={`${id}-card-image`}
                            style={cardImageStyle}
                            loading="lazy"
                            onError={ErrorLoadingImage}
                        />
                    </CustomTooltip>
                </ButtonBase>
                <Box
                    sx={{
                        mt: variant === "avatar" && type === "lightcone" ? "50px" : "0px",
                        borderBottom: variant === "icon" ? "none" : `calc(${size} / 25) solid ${GetRarityColor(rarity)}`,
                        position: "relative"
                    }}
                >
                    {
                        showName &&
                        <Box>
                            <ButtonBase disableRipple href={href} target="_blank"
                                sx={{
                                    position: "absolute",
                                    bottom: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, 0%)",
                                    width: "95%"
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: `white`,
                                        fontSize: type === "character" ? "20px" : "16.5px",
                                        textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                                        textAlign: "center",
                                    }}
                                >
                                    {displayName}
                                    <br />
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: `rgb(255, 208, 112)`,
                                            fontSize: "20px",
                                            textShadow: "#e3721b 1px 1px 10px",
                                            userSelect: "none",
                                            textAlign: "center"
                                        }}
                                    >
                                        {[...Array(rarity).keys()].map(() => "✦")}
                                    </Typography>
                                </Typography>
                            </ButtonBase>
                        </Box>
                    }
                </Box>
            </Box>
            {
                materials !== undefined &&
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        height: `calc(${size} / 5.5)`,
                        px: 1,
                        py: 1.5,
                        overflow: "hidden",
                    }}
                >
                    {
                        materials.calyxMat &&
                        <CustomTooltip title={materials.calyxMat} arrow placement="top">
                            <img src={`${process.env.REACT_APP_URL}/materials/calyx_mats/${materials.calyxMat.split(" ").join("_")}3.png`} alt={materials.calyxMat} style={materialImageStyle} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    }
                    {
                        materials.commonMat &&
                        <CustomTooltip title={formatCommonMats(materials.commonMat)} arrow placement="top">
                            <img src={`${process.env.REACT_APP_URL}/materials/common_mats/${materials.commonMat.split(" ").join("_")}3.png`} alt={materials.commonMat} style={materialImageStyle} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    }
                    {
                        materials.bossMat &&
                        <CustomTooltip title={materials.bossMat} arrow placement="top">
                            <img src={`${process.env.REACT_APP_URL}/materials/boss_mats/${materials.bossMat.split(" ").join("_")}.png`} alt={materials.bossMat} style={materialImageStyle} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    }
                    {
                        materials.weeklyBossMat &&
                        <CustomTooltip title={formatWeeklyBossMats(materials.weeklyBossMat)} arrow placement="top">
                            <img src={`${process.env.REACT_APP_URL}/materials/weekly_boss_mats/${materials.weeklyBossMat.split(" ").join("_")}.png`} alt={materials.weeklyBossMat} style={materialImageStyle} onError={ErrorLoadingImage} />
                        </CustomTooltip>
                    }
                </Box>
            }
        </Card>
    )

}

export default CustomCard