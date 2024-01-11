import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../query-client';
import { AppRouter } from './router';


export default function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <AppRouter/>
    </QueryClientProvider>
  );
}
