import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DetailOrder from '../components/Order/Detail';
import NewOrder from '../pages/NewOrder/NewOrder';
import NewOrderReview from '../pages/NewOrder/NewOrderReview';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={(
            <Dashboard />
          )}
        />
        <Route
          path="/detail/:orderId"
          element={(
            <DetailOrder />
          )}
        />
        <Route
          path="/new-order"
          element={(
            <NewOrder />
          )}
        />
        <Route
          path="/new-order-review"
          element={(
            <NewOrderReview />
          )}
        />

      </Routes>
    </BrowserRouter>
  );
}
