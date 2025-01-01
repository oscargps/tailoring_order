import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import signatureImage from '../../../assets/invoice-signature.png';
import { InvoiceDocumentProps } from '../../../../modules/domain/Models/Invoices';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 40,
    },
    header: {
        marginBottom: 40,
        textAlign: 'left',
    },
    title: {
        fontSize: 8,
        marginBottom: 10,
        textAlign: 'right'
    },
    date: {
        fontSize: 8,
        marginBottom: 40,
    },
    billTo: {
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 0.3
    },
    billToHeader: {
        fontSize: 10,
        marginBottom: 10,
        fontWeight: 500

    },
    amount: {
        fontSize: 8,
        marginBottom: 15,
        fontWeight: 500
    },
    itemsContainer: {
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 8,
    },
    totals: {
        marginTop: 20,
    },
    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    signature: {
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingTop: 10,
        width: "40%",
        fontSize: 8,
        lineHeight: 1
    },
    signatureImage: {
        width: 80,
        height: 50,
        marginTop: 50,
        marginLeft: 50
    }
});


const InvoiceDocument = ({
    invoiceNumber,
    date,
    city,
    companyName,
    companyNit,
    personName,
    personNit,
    amountText,
    items,
    total,
    signatureName,
    signatureId,
}: InvoiceDocumentProps) => (
    <>
        <Document>
            <Page size="LETTER" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Cuenta de cobro {invoiceNumber}</Text>
                    <Text style={styles.date}>{city}, {date}</Text>
                </View>

                <View style={styles.billTo}>
                    <Text style={styles.billToHeader}>CUENTA DE COBRO</Text>
                    <Text style={styles.billToHeader}>{companyName}</Text>
                    <Text style={styles.billToHeader}>NIT: {companyNit}</Text>
                    <Text style={styles.billToHeader}>DEBE A:</Text>
                    <Text style={styles.billToHeader}>{personName}</Text>
                    <Text style={styles.billToHeader}>NIT: {personNit}</Text>
                </View>

                <Text style={styles.amount}>La suma de: {amountText}</Text>
                <Text style={styles.amount}>Por concepto de:</Text>

                <View style={styles.itemsContainer}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.itemText}>
                                {item.description} {item.quantity} x $ {item.unitPrice.toLocaleString()}
                            </Text>
                            <Text style={styles.itemText}>
                                = $ {item.total.toLocaleString()}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.totals}>
                    <View style={styles.total}>
                        <Text style={styles.itemText}>TOTAL</Text>
                        <Text style={styles.itemText}>-$ {total.toLocaleString()}-</Text>
                    </View>
                </View>
                <Image
                    src={signatureImage}
                    style={styles.signatureImage}
                />

                <View style={styles.signature}>
                    <Text>{signatureName}</Text>
                    <Text>C.C. {signatureId}</Text>
                </View>
            </Page>
        </Document>
    </>
);

export default InvoiceDocument;