// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";
import { StyledTableRow } from "styled/StyledTable";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    SxProps,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Card,
} from "@mui/material";

// Type imports
import {
    CharacterSkill,
    CharacterTalent,
    CharacterTechnique,
    MemospriteSkill,
} from "types/character";

interface CharacterSkillAdvancedStatsProps {
    skill:
        | CharacterSkill
        | CharacterTalent
        | CharacterTechnique
        | MemospriteSkill;
}

function CharacterSkillAdvancedStats({
    skill,
}: CharacterSkillAdvancedStatsProps) {
    const theme = useTheme();
    const matches_sm_up = useMediaQuery(theme.breakpoints.up("sm"));

    const rows = [];

    if ("cost" in skill) {
        const skillCost = getSkillCost(
            skill.cost?.type || "",
            skill.cost?.value || 0,
            matches_sm_up
        );
        rows.push({
            key: skillCost.cost,
            value: skillCost.value,
        });
    }
    skill.regen &&
        rows.push({
            key: <span>{`Energy Generation`}</span>,
            value: (
                <span style={{ color: theme.text.highlight2 }}>
                    {skill.regen}
                </span>
            ),
        });
    skill.break &&
        rows.push({
            key: <span>{`Toughness Reduction`}</span>,
            value: Object.entries(skill.break).map(([key, value], index) => (
                <Box key={index} sx={{ display: "inline-block" }}>
                    <span>{`${key}: `}</span>
                    <span
                        style={{
                            color: theme.text.highlight2,
                        }}
                    >
                        {value}
                    </span>
                    {index !== Object.entries(skill.break as {}).length - 1 && (
                        <span
                            style={{
                                margin: "0 4px 0 4px",
                            }}
                        >
                            /
                        </span>
                    )}
                </Box>
            )),
        });

    const tableRowStyle: SxProps = {
        backgroundColor: theme.background(1, "light"),
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    };

    const tableCellStyle: SxProps = {
        border: { xs: "auto", sm: "none" },
        borderColor: theme.border.color.primary,
        px: "8px",
        py: "4px",
    };

    return (
        <TableContainer
            component={Card}
            sx={[
                {
                    minWidth: {
                        xs: "100%",
                        md: "400px",
                    },
                    width: {
                        xs: "100%",
                        md: "60%",
                        lg: "40%",
                    },
                },
                rows.length > 0 && {
                    mb: "8px",
                },
            ]}
        >
            <Table size="small">
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={index} sx={tableRowStyle}>
                            <TableCell sx={tableCellStyle}>
                                <TextStyled
                                    variant="subtitle1-styled"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                >
                                    {row.key}
                                </TextStyled>
                            </TableCell>
                            <TableCell align="right" sx={tableCellStyle}>
                                <TextStyled
                                    variant="subtitle1-styled"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                >
                                    {row.value}
                                </TextStyled>
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CharacterSkillAdvancedStats;

function getSkillCost(type: string, cost: number | string, matches: boolean) {
    const theme = useTheme();

    const costType = type === "SP" || type === "Energy" ? `${type}` : "Ability";
    let costValue;
    if (type === "SP") {
        costValue = [...Array(cost).keys()].map((index) => (
            <Image
                key={index}
                src={"icons/SkillPoint"}
                alt="SP"
                style={{
                    height: matches ? "16px" : "14px",
                    marginBottom: matches ? "-4px" : "-2px",
                    pointerEvents: "none",
                }}
            />
        ));
    } else if (type === "Energy") {
        costValue = (
            <span style={{ color: theme.text.highlight2 }}>{cost}</span>
        );
    } else {
        costValue = (
            <>
                <span style={{ color: theme.text.header }}>{cost}</span>
                <span style={{ color: theme.text.highlight2 }}>
                    {typeof cost === "string"
                        ? ` of ${type}`
                        : ` points of ${type}`}
                </span>
            </>
        );
    }

    return {
        cost: <span>{`${costType} Cost`}</span>,
        value: costValue,
    };
}
