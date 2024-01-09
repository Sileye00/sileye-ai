"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("982deea3-8c93-4abc-acf5-26d6f43cc59d");
    }, []);

    return null;
}
