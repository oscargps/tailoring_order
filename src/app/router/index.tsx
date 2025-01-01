import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DetailOrder from "../pages/Detail";
import NewOrder from "../pages/NewOrder/NewOrder";
import NewOrderReview from "../pages/NewOrder/NewOrderReview";
import UpdateOrder from "../pages/UpdateOrder";
import Login from "../pages/Login/Login";
import Layout from "../layout/layout";
import Invoices from "../pages/Invoices";
import InvoiceForm from "../pages/Invoices/New";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detail/:orderId" element={<DetailOrder />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/new-order-review" element={<NewOrderReview />} />
          <Route path="/update-order/:orderId" element={<UpdateOrder />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/new" element={<InvoiceForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
