import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const sshKeySchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    public_key: z.string({ required_error: "Public key is required" }),
});
export type SshKeyType = z.infer<typeof sshKeySchema>;


async function deleteSshKey({ vmId, sshKeyId }: { vmId: number, sshKeyId: number }) {
    const res = await fetch(`/api/vms/${vmId}/ssh-keys/${sshKeyId}/`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete key");
    }
}

async function createSshKey(newKey: SshKeyType & { vmId: number }) {
    const { vmId, ...keyData } = newKey;
    const res = await fetch(`/api/vms/${vmId}/ssh-keys/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(keyData),
    });
    if (!res.ok) {
        throw new Error("Failed to create Key");
    }
}


function onError(error: Error) {
    toast({
        title: "An error occurred",
        description: error.message,
        variant: "error",
    });
}

function onSuccessCreate() {
    toast({
        title: "Ssh Key created successfully",
        description: "The Ssh Key has been created successfully",
    });
}


function onSuccessDelete() {
    toast({
        title: "Ssh Key deleted successfully",
        description: "The Ssh Key has been deleted successfully",
    });
}


export const useCreateSshKey = () => {
    const mutation = useMutation({
        mutationFn: createSshKey,
        onSuccess: onSuccessCreate,
        onError: onError
    });

    return mutation;
};

export const useDeleteSshKey = () => {
    const mutation = useMutation({
        mutationFn: deleteSshKey,
        onSuccess: onSuccessDelete,
        onError: onError
    });

    return mutation;
}




