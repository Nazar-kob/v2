import {
    QueryClient,
} from '@tanstack/react-query'



export enum queryClientKeys {
    VirtualMachines = 'virtual-machines',
}

export const queryClient = new QueryClient()