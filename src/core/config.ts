const CONFIG = {
    SUPABASE_URL: (import.meta.env.VITE_SUPABASE_URL as string || ''),
    SUPABASE_ANON_KEY: (import.meta.env.VITE_SUPABASE_ANON_KEY as string || ''),
    ORDERS_API_URL: (import.meta.env.VITE_ORDERS_API_URL as string || ''),
  };
  
  export default CONFIG;