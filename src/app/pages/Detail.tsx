import { useFetchOrderDetail } from "../hooks/useOrderDetail";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailTable from "../components/Order/OrderDetailTable";
import { Button } from "@nextui-org/react";
import BackIcon from "../components/Icons/BackIcon";

function DetailOrder() {
    let { orderId } = useParams();
    const { data } = useFetchOrderDetail(orderId as string);
    const navigate = useNavigate();

    return (
        <>
            <Button
                color="primary"
                className="m-4"
                size="lg"
                isIconOnly
                onPress={() => {
                    history.back();
                }}
            >
                <BackIcon />
            </Button>

            <div className="w-full">{data && <OrderDetailTable data={data} />}</div>
            <Button
                color="warning"
                size="lg"
                className="m-4"
                onPress={() => navigate(`/update-order/${orderId}`)}
            >
                Cambiar estado
            </Button>
        </>
    );
}

export default DetailOrder;
