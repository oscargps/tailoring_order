import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import DetailOrder from '../components/Order/Detail';

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
            <DetailOrder/>
          )}
        />

      </Routes>
    </BrowserRouter>
  );
}
