import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../query-client';
import { AppRouter } from './router';

export default function App() {
  return (
      <div className='MainApp h-full min-h-screen'>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </div>
  );
}
