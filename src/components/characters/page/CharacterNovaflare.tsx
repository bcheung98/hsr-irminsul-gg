import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";

export const novaflareButtons: CustomToggleButtonProps[] = [
    { value: "enhanced", label: "Enhanced" },
    { value: "original", label: "Original" },
];

export type Novaflare = "enhanced" | "original";

export interface NovaflareButtonsProps {
    hasNovaflare: boolean;
    value: Novaflare;
    onChange: (arg0: any, arg1: any) => void;
}

export function NovaflareButtons({
    hasNovaflare,
    value,
    onChange,
}: NovaflareButtonsProps) {
    return hasNovaflare ? (
        <ToggleButtons
            color="secondary"
            buttons={novaflareButtons}
            value={value}
            exclusive
            onChange={onChange}
            spacing={0}
            padding={8}
            highlightOnHover={false}
        />
    ) : (
        <></>
    );
}
