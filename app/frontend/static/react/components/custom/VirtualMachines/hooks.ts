import { useSuspenseQuery } from "@tanstack/react-query";
import { queryClientKeys } from "../../../const/query-client";
import { toast } from "../../../hooks/use-toast";
import { useEffect } from "react";
import React from "react";



interface VirtualMachine {
    id: number
    name: string
    cpus: number
    ram: number
    status: string
    server: string
}


async function getVirtualMachines() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    if (!res.ok) {
        throw new Error('Error fetching data')
    }
    return res.json()
}


export function useVirtualMachines(): VirtualMachine[] {

    const { data } = useSuspenseQuery<VirtualMachine[]>({ queryKey: [queryClientKeys.VirtualMachines], queryFn: getVirtualMachines })

    return data;
}



