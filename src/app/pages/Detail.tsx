

import { useFetchOrderDetail } from "../hooks/useOrderDetail";
import { useParams } from "react-router-dom";
import OrderDetailTable from "../components/Order/OrderDetailTable";

function DetailOrder() {

    let { orderId } = useParams();
    const {
        data
    } = useFetchOrderDetail(orderId as string);


    return (
        <div className="w-full">
            {data && <OrderDetailTable data={data} />}
        </div>
    );
}

export default DetailOrder;