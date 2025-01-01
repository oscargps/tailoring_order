import { Button, Input, Select, SelectItem } from "@nextui-org/react"
import { useEffect, useState, useCallback } from "react"
import { PlusIcon } from "../Icons/PlusIcon"
import numeral from 'numeral'
import { guidGenerator } from "../../../modules/domain/utils/GUidGenerator"
import { toast, Toaster } from "sonner"
import { Item } from "../../../modules/domain/Models/Invoices"

const itemInitialState = {
    id:"",
    type: "",
    detail: "",
    qty: 0,
    price: 0,
    tax: 0,
    total: 0,
}

const InvoiceItem = ({ addItemFun }: { addItemFun: (item: Item) => void }) => {
    const [total, setTotal] = useState("0")
    const [item, setItem] = useState<Item>(itemInitialState)

    const addItem = useCallback(() => {
        if (!item.type || !item.detail || !item.qty || !item.price) {
            toast.error("Por favor complete todos los campos antes de agregar el item")
            return
        }
        addItemFun(item)
        setItem({ ...itemInitialState, type: item.type, tax: item.tax})
    }, [item, addItemFun])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                addItem()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [addItem])

    useEffect(() => {
        const total = item.qty * item.price
        setTotal(numeral(total).format('0,0').toString())
        setItem({ ...item, total: total, id: guidGenerator() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item.qty, item.price, item.tax])



    const itemsType = [
        {
            id: 1,
            label: "Venta de "
        },
        {
            id: 2,
            label: "Corte y confección de "
        },
        {
            id: 3,
            label: "Flete"
        },
    ]
    const taxesList = [
        {
            key: "6",
            value: 6,
            label: "6%"
        },
        {
            key: "3.5",
            value: 3.5,
            label: "3,5%"
        },
        {
            key: "na",
            value: 0,
            label: "N/A"
        },
    ]
    return (
        <div className="flex flex-row items-center my-4 gap-2 w-full">
            <Toaster position="top-center" richColors />
            <Select
                label="Tipo"
                id="type"
                onChange={(e) => {
                    setItem({ ...item, type: e.target.value })
                }}
            >
                {itemsType.map((item) => (
                    <SelectItem key={item.label}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <Input id="detail" value={item.detail} type="text" label="Item" onValueChange={(value) => {
                setItem({ ...item, detail: value })
            }} />
            <Input id="qty" type="number" value={item.qty.toString()} className="w-3/12" label="Cantidad" onValueChange={(value) => {
                setItem({ ...item, qty: parseInt(value) })
            }} />
            <span className="align-middle"> x </span>
            <Input id="price" type="number" value={item.price.toString()} className="w-4/12" label="Precio" onValueChange={(value) => {
                setItem({ ...item, price: parseInt(value) })
            }} />
            <Select
                label="Retencion"
                className="w-3/12"
                id="tax"
                defaultSelectedKeys={["na"]}
                onChange={(e) => {
                    setItem({ ...item, tax: parseFloat(taxesList.find(tax => tax.key === e.target.value)?.value.toString() ?? "0") })
                }}
            >
                {taxesList.map((item) => (
                    <SelectItem key={item.key}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <span> = </span>
            <Input value={total} type="text" className="w-6/12" label="Total" disabled />
            <Button
                isIconOnly
                color="warning"
                variant="faded"
                aria-label="Take a photo"
                onPress={addItem}
            >

                <PlusIcon />
            </Button>
        </div>
    )
}

export default InvoiceItem