import { useEffect, useMemo, useState } from "react";
import { StorageHelper } from "../../../core/utils/storageHelper"
import OrderDetailTable from "../../components/Order/OrderDetailTable"
import { Button, Checkbox, Chip } from "@nextui-org/react";
import { initialStateOrder } from "../../../modules/domain/Models/Order";
import { useFetchClients, useFetchStages } from "../../hooks/useCommonData";
import { IStage } from "../../../modules/domain/Models/Stages";
import { IClient } from "../../../modules/domain/Models/Clients";
import IconTick from "../../components/Icons/Tick";
import { useCreateOrder } from "../../hooks/useOrders";
import { Toaster, toast } from 'sonner'

const NewOrderReview = () => {
    const [check, setCheck] = useState<boolean>(false)
    const orderData = StorageHelper.get('NewOrder') as initialStateOrder
    const Clients = useFetchClients().data as IClient[]
    const Stages = useFetchStages().data as IStage[]
    const { refetch, isFetching, isLoading, status } = useCreateOrder(orderData)

    const submitOrder = () => {
        refetch()
    }

    useEffect(() => {
        if (!isFetching && status !== 'loading') {
            if (status === 'success') {
                toast.success('Order guardada con exito')
                StorageHelper.remove('NewOrder')
                StorageHelper.remove('Orders')
                window.location.assign('/dashboard')

            } else {
                toast.error('Tuvimo un problema al crear la orden.')
            }
        }

    }, [isFetching, isLoading])

    const topContent = useMemo(() => {
        return (
            <>
                {orderData && <div className="flex flex-col gap-4">
                    {Clients && <div className="flex">
                        <b>
                            {'Cliente:'}&nbsp;&nbsp;
                        </b>
                        <p>
                            {Clients.find(client => client.id == orderData.order_client)?.client_name}
                        </p>
                    </div>}
                    {Stages && <div className="flex">
                        <b>
                            {'Etapas:'}&nbsp;&nbsp;
                        </b>
                        <div>
                            {orderData.order_stages.split(',').map((stages) => (
                                <Chip key={stages}>{Stages.find(stage => stage.id == parseInt(stages))?.stage_name}</Chip>
                            ))}
                        </div>
                    </div>}
                    <div className="flex">
                        <b>
                            {'Observaciones:'}&nbsp;&nbsp;
                        </b>
                        <p>
                            {orderData.order_description}
                        </p>
                    </div>
                    <div className="flex justify-between gap-3 items-end">
                        <b>
                            Detalle de Orden
                        </b>
                        <div className="flex gap-3">
                            <Button color="primary" onPress={() => { history.back() }}  >
                                Regresar
                            </Button>
                        </div>
                    </div>
                </div>}
            </>
        );
    }, [
        orderData
    ]);
    return (
        <>
            <Toaster position="top-left" richColors />

            <p className="m-4 font-bold text-xl">Confirmación de orden de producción</p>

            <OrderDetailTable
                HeaderTable={topContent}
                data={orderData.order_elements || []} />
            <div className="m-4">
                <Checkbox onChange={(e) => { setCheck(e.target.checked) }} >Orden revisada</Checkbox>
            </div>
            <Button isDisabled={!check} isLoading={isFetching} className="m-4 w-full md:w-2/6" color="success" size="lg" startContent={<IconTick />} onPress={submitOrder} >
                Radicar Orden
            </Button>
        </>
    )
}

export default NewOrderReview