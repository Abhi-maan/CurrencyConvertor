import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import BillingConfirmationPage from '@/pages/BillingConfirmation';
import NotFound from '@/pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/billing-confirmation" element={<BillingConfirmationPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;


