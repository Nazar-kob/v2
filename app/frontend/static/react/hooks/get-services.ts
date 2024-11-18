import { useSuspenseQuery } from "@tanstack/react-query";
import { queryClientKeys } from "../const/query-client";
interface Server {
    id: number;
    name: string;
}


async function getServers(): Promise<Server[]> {
    const res = await fetch("/api/servers");
    if (!res.ok) {
        throw new Error("Error fetching data");
    }
    return res.json();
}


export function useGetServices(): Server[] {

    const { data } = useSuspenseQuery<Server[]>({
        queryKey: [queryClientKeys.Servers],
        queryFn: getServers,
    });

    return data;
}