export interface Vehicle {
    id: string;
    name: string;
    description: string;
    price: number;
    primaryimage: string;
    otherimages: string[];
    model: string;
    manufacturer: string;
    quantity: number;
    transmission: string;
    fueltype: string;
}

export interface VehicleDetailsProps {
    vehicleId: string;
}