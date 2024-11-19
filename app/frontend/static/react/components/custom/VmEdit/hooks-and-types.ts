import { queryClient, queryClientKeys } from "@/const/query-client";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const vmSchemaDetail = z.object({
    name: z.string({ required_error: "Name is required" }),
    ram: z.number().positive({ message: "Ram must be greater than 0" }),
    cpus: z.number().positive({ message: "CPUS must be greater than 0" }),
    active: z.boolean({ message: "Active is required" }),
    server_id: z.string().min(1, { message: "Server is required" }),
});
export type VmDetail = z.infer<typeof vmSchemaDetail>;


async function updateVm(newVm: VmDetail & { id: number }) {
    const { id, ...newVmData } = newVm;
    const res = await fetch(`/api/vms/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newVmData),
    });
    if (!res.ok) {
        throw new Error("Failed to update VM");
    }
}

function onSuccess() {
    toast({
        title: "VM updated successfully",
        description: "The VM has been updated successfully",
    });
}

function onError(error: Error) {
    toast({
        title: "An error occurred",
        description: error.message,
        variant: "error",
    });
}


export const useUpdateVm = () => {
    const mutation = useMutation({
        mutationFn: updateVm,
        onSuccess: onSuccess,
        onError: onError
    });

    return mutation;
};