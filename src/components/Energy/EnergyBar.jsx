import React from "react";
import {Progress} from "@nextui-org/react";
import {useData} from "@/components/Context.jsx";

export default function EnergyBar() {
    const {energy, energyLimit} = useData()

    return (<Progress
            size="md"
            radius="sm"
            classNames={{
                base: "max-w-md",
                track: "drop-shadow-md border border-default",
                indicator: "bg-gradient-to-r from-red-500 to-green-400",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60",
            }}
            value={(energy / (energyLimit * 500)) * 100}
        />

    );
}