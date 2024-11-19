import { useSuspenseQuery } from "@tanstack/react-query";
import { queryClientKeys } from "../const/query-client";
export interface IServer {
    id: number;
    name: string;
    region: string;
}


async function getServers(): Promise<IServer[]> {
    const res = await fetch("/api/servers");
    if (!res.ok) {
        throw new Error("Error fetching data");
    }
    return res.json();
}


export function useGetServices(): IServer[] {

    const { data, isError, isLoading } = useSuspenseQuery<IServer[]>({
        queryKey: [queryClientKeys.Servers],
        queryFn: getServers,
    });

    if (isError) {
        console.error("Error fetching servers data");
        return [];
    }

    if (isLoading) {
        return [];
    }


    return data;
}