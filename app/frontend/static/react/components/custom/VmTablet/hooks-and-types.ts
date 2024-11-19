import { queryClient, queryClientKeys } from "@/const/query-client";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const vmSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    ram: z.number().positive({ message: "Ram must be greater than 0" }),
    cpus: z.number().positive({ message: "CPUS must be greater than 0" }),
    active: z.boolean({ message: "Active is required" }),
    server_id: z.number({ message: "Server is required" }).positive(),
});
export type VmDetail = z.infer<typeof vmSchema>;


export interface VirtualMachine {
    id: number;
    name: string;
    cpus: number;
    ram: number;
    active: boolean;
    server_name: string;
}

async function deleteVm(id: number) {
    const res = await fetch(`/api/vms/${id}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to update VM");
    }
}

function onSuccess() {
    toast({
        title: "VM deleted successfully",
        description: "The VM has been deleted successfully",
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


export const useDeleteVm = () => {
    const mutation = useMutation({
        mutationFn: deleteVm,
        onSuccess: onSuccess,
        onError: onError
    });

    return mutation;
};