import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../../components/Icons/PlusIcon";

import { Button, CircularProgress } from "@nextui-org/react";
import { useFetchInvoices } from "../../hooks/useInvoices";
import InvoicesTable from "../../components/Invoices/InvoicesTable";
import { useMemo } from "react";

const Invoices = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useFetchInvoices();

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Button onClick={() => navigate("/invoices/new")}>
                        <PlusIcon />
                        Nueva factura
                    </Button>
                </div>
            </div>
        );
    }, [navigate]);
    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                data && <InvoicesTable HeaderTable={topContent} data={data} />
            )}
        </>
    );
};

export default Invoices;
