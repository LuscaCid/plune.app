import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Router } from './routes/index.routes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'reactflow/dist/style.css';
import "./globals.css"
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>,
)
