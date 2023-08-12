import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { connect } from "react-redux"
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { CustomTooltip } from "../../helpers/CustomTooltip";
import { formatCalyxMats, formatCommonMats, formatWeeklyBossMats, formatXPMats } from "../../helpers/TooltipText";
import * as Materials from "../../helpers/MaterialList";
import { Backgrounds } from "../../helpers/Backgrounds";
import ErrorLoadingImage from "../../helpers/ErrorLoadingImage";

const AscensionTotalCost = (props) => {

    const theme = useTheme();

    let { totalCost } = props;

    const MaterialImageRootBig = {
        width: "72px",
        mr: "15px",
        mb: "15px",
        backgroundColor: "rgb(34, 35, 36)",
        border: `1px solid ${theme.border.color}`,
        borderRadius: "5px",
    }

    const MaterialTextContainer = {
        textAlign: "center",
        mt: "-5px",
    }

    const MaterialText = {
        color: "rgb(208, 208, 208)",
        fontWeight: "bold",
    }

    return (
        <React.Fragment>
            {
                Object.keys(totalCost).length > 0 &&
                <Box
                    sx={{
                        border: `1px solid ${theme.border.color}`,
                        borderRadius: "5px",
                        backgroundColor: `${theme.paper.backgroundColor}`,
                        mx: "20px",
                        mb: "30px",
                        p: 1,
                    }}
                >
                    <Typography variant="h6" sx={{ color: `${theme.text.color}`, ml: "15px", my: "15px" }}>
                        Total Materials Required
                    </Typography>
                    <Grid container sx={{ mx: "15px", mt: "10px" }}>
                        {
                            Object.keys(totalCost).map((material, index) => {
                                return (
                                    <Box key={index}>
                                        {
                                            /* Credits */
                                            material === "credits" && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title="Credits" arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/materials/Credit.png`} style={{ backgroundImage: "url(" + Backgrounds["3"] + ")" }} alt="Credit" className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material].toLocaleString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Character XP Materials */
                                            Materials.CharEXPMats.includes(material) && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title={formatXPMats(material)} arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/items/Item_${formatXPMats(material).split(" ").join("_")}.png`} style={{ backgroundImage: "url(" + Backgrounds[Number(material[2]) + 1] + ")" }} alt={formatXPMats(material)} className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Lightcone XP Materials */
                                            Materials.LightconeEXPMats.includes(material) && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title={formatXPMats(material)} arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/items/Item_${formatXPMats(material).split(" ").join("_")}.png`} style={{ backgroundImage: "url(" + Backgrounds[Number(material[5]) + 1] + ")" }} alt={formatXPMats(material)} className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Boss Material */
                                            Materials.BossMats.includes(material) && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title={formatCommonMats(material)} arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/materials/boss_mats/${material.split(" ").join("_")}.png`} style={{ backgroundImage: "url(" + Backgrounds["4"] + ")" }} alt={material} className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Common Materials */
                                            Materials.CommonMats.includes(material) && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title={formatCommonMats(material)} arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/materials/common_mats/${material.split(" ").join("_")}.png`} style={{ backgroundImage: "url(" + Backgrounds[Number(material[material.length - 1]) + 1] + ")" }} alt={material} className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Calyx Materials */
                                            Materials.CalyxMats.includes(material) && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title={formatCalyxMats(material)} arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/materials/calyx_mats/${material.split(" ").join("_")}.png`} style={{ backgroundImage: "url(" + Backgrounds[Number(material[material.length - 1]) + 1] + ")" }} alt={material} className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Weekly Boss Materials */
                                            Materials.WeeklyBossMats.includes(material) && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title={formatWeeklyBossMats(material)} arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/materials/weekly_boss_mats/${material.split(" ").join("_")}.png`} style={{ backgroundImage: "url(" + Backgrounds[4] + ")" }} alt={material} className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                        {
                                            /* Tracks of Destiny */
                                            material === "tracksOfDestiny" && totalCost[material] !== 0 &&
                                            <Box sx={MaterialImageRootBig}>
                                                <CustomTooltip title="Tracks of Destiny" arrow placement="top">
                                                    <img src={`${process.env.REACT_APP_URL}/materials/Tracks_of_Destiny.png`} style={{ backgroundImage: "url(" + Backgrounds["5"] + ")" }} alt="Tracks of Destiny" className="material-image-big" onError={ErrorLoadingImage} />
                                                </CustomTooltip>
                                                <Box sx={MaterialTextContainer}>
                                                    <Typography variant="subtitle2" sx={MaterialText}>
                                                        {totalCost[material]}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                    </Box>
                                )
                            })
                        }
                    </Grid>
                </Box>
            }
        </React.Fragment>
    )

}

const mapStateToProps = (state) => {
    return {
        totalCost: state.ascensionPlanner.totalCost
    }
}

export default connect(mapStateToProps)(AscensionTotalCost);