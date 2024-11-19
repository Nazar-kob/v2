import { queryClient, queryClientKeys } from "@/const/query-client";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const vmSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    ram: z.number().min(1, { message: "Ram must be greater than 0" }),
    cpus: z.number().min(1, { message: "CPUS must be greater than 0" }),
    server_id: z.string().min(1, { message: "Server is required" }),
});
export type VmType = z.infer<typeof vmSchema>;


async function createNewVm(newVm: VmType) {
    const res = await fetch("/api/vms/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newVm),
    });
    if (!res.ok) {
        throw new Error("Failed to create VM");
    }
}

function onSuccess() {
    toast({
        title: "VM created successfully",
        description: "The VM has been created successfully",
    });
    queryClient.invalidateQueries({
        queryKey: [queryClientKeys.VirtualMachines],
        refetchType: "active",
    });
}

function onError(error: Error) {
    toast({
        title: "An error occurred",
        description: error.message,
        variant: "error",
    });
}


export const useCreateVm = () => {
    const mutation = useMutation({
        mutationFn: createNewVm,
        onSuccess: onSuccess,
        onError: onError
    });

    return mutation;
};