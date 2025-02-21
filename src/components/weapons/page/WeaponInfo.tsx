import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import RarityStars from "custom/RarityStars";
import Image from "custom/Image";
import InfoChip from "custom/InfoChip";
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";
import { FlexBox } from "styled/StyledBox";

// MUI imports
import {
    useTheme,
    Box,
    Divider,
    Card,
    Stack,
    IconButton,
    Dialog,
    ButtonBase,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
import { WeaponProps } from "types/weapon";

function WeaponInfo({ weapon }: WeaponProps) {
    const theme = useTheme();

    const { displayName, rarity, path, description } = weapon;

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    p: "16px",
                    backgroundColor: theme.background(2),
                }}
            >
                <Stack spacing={2} divider={<Divider />}>
                    <FlexBox
                        sx={{
                            flexWrap: "wrap",
                            columnGap: "16px",
                            rowGap: "8px",
                        }}
                    >
                        <Image
                            src={`paths/${path}`}
                            alt={path}
                            style={{
                                width: "64px",
                                backgroundColor: theme.appbar.backgroundColor,
                                borderRadius: "64px",
                            }}
                            tooltip={path}
                        />
                        <Box>
                            <Box sx={{ mb: "8px" }}>
                                <TextStyled variant="h4-styled">
                                    {displayName}
                                </TextStyled>
                            </Box>
                            <FlexBox sx={{ flexWrap: "wrap", gap: "8px" }}>
                                <InfoChip
                                    color="tertiary"
                                    label={
                                        <RarityStars
                                            rarity={rarity}
                                            variant="h5-styled"
                                        />
                                    }
                                    padding="0px"
                                />
                            </FlexBox>
                        </Box>
                    </FlexBox>
                    <FlexBox sx={{ alignItems: "center" }}>
                        <ButtonBase disableRipple onClick={handleClickOpen}>
                            <IconButton disableRipple>
                                <InfoOutlinedIcon />
                            </IconButton>
                            <TextStyled
                                variant="subtitle1-styled"
                                sx={{ fontStyle: "italic" }}
                            >
                                View Description
                            </TextStyled>
                        </ButtonBase>
                    </FlexBox>
                </Stack>
            </Card>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
                    <MainContentBox
                        title=""
                        actions={
                            <IconButton
                                disableRipple
                                onClick={handleClose}
                                sx={{ color: theme.appbar.color }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                    >
                        <TextStyled
                            component="span"
                            variant="subtitle1-styled"
                            sx={{ fontStyle: "italic" }}
                        >
                            {parse(description)}
                        </TextStyled>
                    </MainContentBox>
                </Box>
            </Dialog>
        </>
    );
}

export default WeaponInfo;
