
export interface CreatePaymentOrderResult {
    createPaymentOrder: {
      id: string;
      amount: number;
      currency: string;
    };
  }
  
  export interface CreateBookingResult {
    createBooking: {
      id: string;
      vehicleid: string;
      vehiclename: string;
      pickupdate: string;
      pickuplocation: string;
      dropoffdate: string;
      dropofflocation: string;
      totalamount: number;
      username: string;
      userid: string;
      paymentstatus: string;
    };
  }
  