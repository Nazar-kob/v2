import {
    QueryClient,
} from '@tanstack/react-query'



export enum queryClientKeys {
    VirtualMachines = 'virtual-machines',
    Servers = 'servers',
}

export const queryClient = new QueryClient()