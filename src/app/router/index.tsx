import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DetailOrder from '../pages/Detail';
import NewOrder from '../pages/NewOrder/NewOrder';
import NewOrderReview from '../pages/NewOrder/NewOrderReview';
import UpdateOrder from '../pages/UpdateOrder';
import Login from '../pages/Login/Login';
import Header from '../components/Header';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={(
            <Login />
          )}
        />
        <Route
          path="/dashboard"
          element={(
            <>
              <Header />
              <Dashboard />
            </>
          )}
        />
        <Route
          path="/detail/:orderId"
          element={(
            <>
              <Header />
              <DetailOrder />
            </>
          )}
        />
        <Route
          path="/new-order"
          element={(
            <>
              <Header />
              <NewOrder />
            </>
          )}
        />
        <Route
          path="/new-order-review"
          element={(
            <>
              <Header />
              <NewOrderReview />
            </>
          )}
        />
        <Route
          path="/update-order/:orderId"
          element={(
            <>
              <Header />
              <UpdateOrder />
            </>
          )}
        />

      </Routes>
    </BrowserRouter>
  );
}
