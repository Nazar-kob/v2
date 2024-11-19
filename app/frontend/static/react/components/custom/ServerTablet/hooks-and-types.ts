import { queryClient, queryClientKeys } from "@/const/query-client";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const serverSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    region: z.string().min(1, { message: "Region is required" }),
});
export type ServerType = z.infer<typeof serverSchema>;

async function createServer(serverValue: ServerType) {
    const res = await fetch("/api/servers/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(serverValue),
    });
    if (!res.ok) {
        throw new Error("Error creating server");
    }
    return res.json();
}

const onError = (error: Error) => {
    toast({
        title: "An error occurred",
        description: error.message,
        variant: "error",
    });
};

const onSuccess = () => {
    toast({
        title: "Server created successfully",
        description: "The Server has been created successfully",
    });
    queryClient.invalidateQueries({
        queryKey: [queryClientKeys.Servers],
        refetchType: "active",
    });
};

export const useCreateServer = () => {
    const mutation = useMutation({
        mutationFn: createServer,
        onSuccess: onSuccess,
        onError: onError,
    });

    return mutation;
};



