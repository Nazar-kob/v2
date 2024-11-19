import {
    QueryClient,
} from '@tanstack/react-query'



export enum queryClientKeys {
    VirtualMachines = 'virtual-machines',
    VirtualMachinesDetail = 'virtual-machines-detail',
    VirtualMachinesDetailSshKeys = 'virtual-machines-detail-ssh-keys',
    Servers = 'servers',


}

export const queryClient = new QueryClient()