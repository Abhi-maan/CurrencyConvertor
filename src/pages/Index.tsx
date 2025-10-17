import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CurrencyConverter from '@/components/CurrencyConverter';
import BackgroundGraphics from '@/components/BackgroundGraphics';
import { DollarSign, Sparkles, CheckCircle, X } from 'lucide-react';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true') {
      setShowSuccess(true);
      // Remove the success parameter from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('success');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);
  return (
    <main className="min-h-screen relative">
      <BackgroundGraphics />
      <div className="container mx-auto px-4 py-12 relative z-10">
        {showSuccess && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Transaction Successful!</p>
                  <p className="text-sm text-green-600">Your currency exchange has been completed.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        <header className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mb-4 shadow-[var(--shadow-elegant)] backdrop-blur-sm border border-primary/10 animate-pulse-glow">
            <DollarSign className="h-10 w-10 text-primary" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">Currency Exchange</h1>
            <Sparkles className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Convert currencies instantly with real-time exchange rates from around the world</p>
        </header>

        <div className="flex justify-center items-center">
          <CurrencyConverter />
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Exchange rates are updated in real-time and provided by open.er-api.com</p>
        </footer>
      </div>
    </main>
  );
};

export default Index;


