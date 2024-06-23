import React from "react";
import {useData} from "@/components/Context.jsx";

export default function EnergyText() {
    const {energy, MaxEnergy} = useData()


    return (<div>
            <span>{energy}</span>
            <span>/</span>
            <span>{MaxEnergy()}</span>
        </div>

    );
}