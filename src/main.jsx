import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App.jsx';
import { Provider as ReduxProvider } from './context/ReduxContext';
import store from "@/store/store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </StrictMode>,
)
