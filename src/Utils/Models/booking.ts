
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

export interface Booking {
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
  paymentstatus: string; // Assuming it's an enum or string type
}

export interface CreateBookingResponse {
  createBooking: {
    success: boolean;
    message: string;
    booking: Booking;
  }
}