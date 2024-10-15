// global.d.ts
export {};

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayInstance {
  open: () => void;
  close?: () => void;
  on: (event: string, callback: (response: RazorpayResponse) => void) => void;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
  };
  notes: {
    bookingId: string;
  };
  theme: {
    color: string;
  };
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    order_id: string;      // Ensure this property is included
    payment_id: string;    // Ensure this property is included
    signature: string;     // Ensure this property is included
  }
