import { useMutation, useQuery } from '@tanstack/react-query';
import InvoicesController from '../../modules/infrastructure/controllers/invoices.controller';
import { IinvoiceDTO } from '../../modules/domain/Models/Invoices';

const invoicesController = new InvoicesController();

export const useFetchInvoices = () => useQuery(
    ['Invoices'],
    () => invoicesController.getAllInvoices(),
    {
        staleTime: 10000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
    }
);

export const useCreateInvoice = () => useMutation({
    mutationFn: (invoice: IinvoiceDTO) => {
        return invoicesController.createInvoice(invoice)
    },
});

