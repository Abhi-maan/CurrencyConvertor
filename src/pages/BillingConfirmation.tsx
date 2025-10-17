import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BillingConfirmation from '@/components/BillingConfirmation';
import BackgroundGraphics from '@/components/BackgroundGraphics';
import { Button } from '@/components/ui/button';

const BillingConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract parameters from URL
  const amount = parseFloat(searchParams.get('amount') || '0');
  const fromCurrency = searchParams.get('from') || 'USD';
  const toCurrency = searchParams.get('to') || 'EUR';
  const exchangeRate = parseFloat(searchParams.get('rate') || '1');
  const transactionId = searchParams.get('txId') || 'bc-bfbe36af-6d10-4662-8093-84df8efbd406';

  const handleConfirm = () => {
    // After confirmation, navigate back to home with success message
    navigate('/?success=true');
  };

  const handleCancel = () => {
    // Navigate back to the currency converter
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <main className="min-h-screen relative">
      <BackgroundGraphics />
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Currency Converter
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              Billing Confirmation
            </h1>
            <p className="text-muted-foreground">
              Review and confirm your currency exchange transaction
            </p>
          </header>

          <BillingConfirmation
            transactionId={transactionId}
            amount={amount}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            exchangeRate={exchangeRate}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </main>
  );
};

export default BillingConfirmationPage;