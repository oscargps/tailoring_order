import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../query-client';
import { AppRouter } from './router';
import Header from './components/Header';


export default function App() {
  return (
    <>
      <Header />
      <div className='MainApp'>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </div>
    </>
  );
}
