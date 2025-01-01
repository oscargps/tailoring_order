import { PDFViewer } from '@react-pdf/renderer';
import InvoiceDocument from './Invoice';
import { Button, Input } from '@nextui-org/react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { InvoiceDocumentProps } from '../../../../modules/domain/Models/Invoices';
import { useState } from 'react';

interface Props {
    isOpen: boolean
    onOpenChange: () => void
    data: InvoiceDocumentProps
    generateInvoiceFn: () => void
}
function InvoiceViewer(props: Props) {
    const { isOpen, onOpenChange, data, generateInvoiceFn } = props
    const [invoiceName, setInvoiceName] = useState(`CUENTA DE COBRO - ${data.companyName} - ${data.date}`)


    const print = () => {
        pdf(<InvoiceDocument {...data} />).toBlob().then((blob) => {
            saveAs(blob, `${invoiceName}.pdf`)
        })
        generateInvoiceFn()
    }

    return (
        <>
            <Modal isOpen={isOpen} size={'full'} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Previsualizar factura</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-row justify-evenly">
                                    <Input type="text" label="Nombre de la factura" className='w-2/6' size='md' value={invoiceName} onValueChange={(value) => setInvoiceName(value)} />
                                    <Button color='success' size='lg' className='text-white' onClick={() => { print(); onClose() }}>
                                        Generar factura
                                    </Button>
                                    <Button color='primary' size='lg' onClick={() => { onClose() }}>
                                        Seguir editando
                                    </Button>
                                </div>
                                <PDFViewer width="100%" height="100%">
                                    <InvoiceDocument
                                        {...data}
                                    />
                                </PDFViewer>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default InvoiceViewer;