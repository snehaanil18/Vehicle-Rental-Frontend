// razorpay.d.ts (or wherever you have your Razorpay types)
export interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void; // This should match the global declaration
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
  
  export interface RazorpayResponse {
    razorpay_payment_id: string; // This matches Razorpay's actual response structure
    razorpay_order_id: string;    // This should also be included
    razorpay_signature: string;    // Ensure this is included
    order_id: string;              // Include this if you're using it in your handler
    payment_id: string;            // Include this if you're using it in your handler
    signature: string;             // Include this if you're using it in your handler
  }
  