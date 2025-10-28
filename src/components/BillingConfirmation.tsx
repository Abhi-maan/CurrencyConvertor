import { useState } from 'react';
import { CheckCircle, AlertCircle, CreditCard, DollarSign, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BillingConfirmationProps {
  transactionId?: string;
  amount?: number;
  fromCurrency?: string;
  toCurrency?: string;
  exchangeRate?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const BillingConfirmation = ({
  transactionId = 'bc-bfbe36af-6d10-4662-8093-84df8efbd406',
  amount = 0,
  fromCurrency = 'USD',
  toCurrency = 'EUR',
  exchangeRate = 0.85,
  onConfirm,
  onCancel
}: BillingConfirmationProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const convertedAmount = amount * exchangeRate;
  const serviceFee = amount * 0.01; // 1% service fee
  const totalAmount = amount + serviceFee;

  const handleConfirm = async () => {
    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsConfirmed(true);
    
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (isConfirmed) {
    return (
      <Card className="w-full max-w-md mx-auto p-6 space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-green-800">Transaction Confirmed!</h2>
          <p className="text-gray-600">Your currency exchange has been processed successfully.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Transaction ID:</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium">Status:</span>
              <span className="text-green-600 font-medium">Completed</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
          <CreditCard className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Confirm Transaction</h2>
        <p className="text-gray-600 text-sm">Please review your currency exchange details</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Exchange</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold">{fromCurrency}</span>
              <span className="text-gray-400">→</span>
              <span className="font-mono font-bold">{toCurrency}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Amount</span>
            <span className="font-bold">{amount.toFixed(2)} {fromCurrency}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Exchange Rate</span>
            <span className="font-mono text-sm">1 {fromCurrency} = {exchangeRate} {toCurrency}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">You'll Receive</span>
            <span className="font-bold text-green-600">{convertedAmount.toFixed(2)} {toCurrency}</span>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 space-y-2 border border-yellow-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Fee Breakdown</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee (1%)</span>
              <span>{serviceFee.toFixed(2)} {fromCurrency}</span>
            </div>
            <div className="flex justify-between font-medium border-t border-yellow-200 pt-1">
              <span>Total Charge</span>
              <span>{totalAmount.toFixed(2)} {fromCurrency}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <span className="font-medium text-blue-800">Transaction ID: </span>
              <span className="font-mono text-xs text-blue-700">{transactionId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={handleCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1" 
          onClick={handleConfirm}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          ) : (
            <>
              <DollarSign className="h-4 w-4 mr-1" />
              Confirm Exchange
            </>
          )}
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        By confirming, you agree to our terms of service and exchange rate policy.
      </p>
    </Card>
  );
};

export default BillingConfirmation;