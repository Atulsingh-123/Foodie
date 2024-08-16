import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

interface PaymentFormProps {
  onPaymentSuccess: () => void;
  totalAmount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentSuccess, totalAmount }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes countdown (900 seconds)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment Success:', response);
    setIsModalOpen(false);
    onPaymentSuccess();
  };

  const handlePaymentFailure = (response: any) => {
    console.error('Payment Failure:', response);
    setErrorMessage('Payment failed. Please try again.');
    setIsProcessing(false);
  };

  useEffect(() => {
    const initiatePayment = async () => {
      setIsProcessing(true);
      setErrorMessage(null);

      const isRazorpayLoaded = await loadRazorpay();

      if (!isRazorpayLoaded) {
        setErrorMessage('Failed to load Razorpay SDK.');
        setIsProcessing(false);
        return;
      }

      setIsModalOpen(true);

      const options = {
        key: 'rzp_test_263aDscprof7Go', // Replace with your Razorpay key
        amount: Math.round(totalAmount * 100), // Convert totalAmount to paise and ensure it's an integer
        currency: 'INR',
        name: 'Foodie',
        description: 'Test Transaction',
        image: 'https://example.com/your-logo.png', // Replace with your logo URL
        handler: handlePaymentSuccess,
        prefill: {
          name: 'Atul Singh',
          email: 'john.doe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            setIsModalOpen(false);
          },
        },
      };
      
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', handlePaymentFailure);
      rzp.open();
    };

    initiatePayment();
  }, [totalAmount]);

  return (
    <div>
      {errorMessage && (
        <div className="text-red-600 text-sm sm:text-base text-center mb-4 sm:mb-6">
          {errorMessage}
        </div>
      )}
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Payment Processing"
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Processing Payment...</h2>
        <p>Please complete the payment in the Razorpay popup.</p>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default PaymentForm;
