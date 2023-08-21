import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomSelect = styled(InputBase)(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
        borderRadius: 5,
        backgroundColor: "white",
        border: "1px solid #ced4da",
        fontWeight: "bold",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0, 12, 255, .25)",
            backgroundColor: "white",
        },
    },
}));