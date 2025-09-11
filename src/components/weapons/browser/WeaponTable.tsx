import React from "react";

// Component imports
import WeaponTableRow from "./WeaponTableRow";
import MainContentBox from "custom/MainContentBox";
import SortTableHead, {
    getComparator,
    HeadColumn,
    Order,
} from "custom/SortTableHead";

// MUI imports
import { Table, TableContainer, TableBody } from "@mui/material";

// Helper imports
import { WeaponATK, WeaponDEF, WeaponHP, weaponStats } from "data/weaponStats";

// Type imports
import { Weapon } from "types/weapon";

export type WeaponRow = Pick<
    Weapon,
    "id" | "name" | "displayName" | "rarity" | "path"
>;

function WeaponTable({ weapons }: { weapons: Weapon[] }) {
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState("rarity");

    const handleRequestSort = (
        _: React.BaseSyntheticEvent,
        property: string
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const headColumns: HeadColumn[] = [
        { id: "displayName", label: "Name" },
        { id: "rarity", label: "Rarity" },
        { id: "path", label: "Path" },
        { id: "hp", label: "HP" },
        { id: "atk", label: "ATK" },
        { id: "def", label: "DEF" },
    ];

    const rows = weapons.map((weapon) => {
        const hp = weapon.stats.hp.toString() as WeaponHP;
        const atk = weapon.stats.atk.toString() as WeaponATK;
        const def = weapon.stats.def.toString() as WeaponDEF;
        return {
            id: weapon.id,
            name: weapon.name,
            displayName: weapon.displayName,
            rarity: weapon.rarity,
            path: weapon.path,
            hp: weaponStats.hp[hp].slice(-1)[0],
            atk: weaponStats.atk[atk].slice(-1)[0],
            def: weaponStats.def[def].slice(-1)[0],
        };
    });

    return (
        <MainContentBox
            title={`${weapons.length} ${
                weapons.length === 1 ? "Light Cone" : "Light Cones"
            }`}
            contentProps={{ padding: 0 }}
        >
            <TableContainer>
                <Table>
                    <SortTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headColumns={headColumns}
                    />
                    <TableBody>
                        {rows
                            .sort(getComparator(order, orderBy, "displayName"))
                            .map((row) => (
                                <WeaponTableRow
                                    key={row.displayName}
                                    row={row}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainContentBox>
    );
}

export default WeaponTable;
