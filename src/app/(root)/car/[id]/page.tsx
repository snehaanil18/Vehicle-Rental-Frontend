"use client"; 
import React from 'react'
import { usePathname } from 'next/navigation';
import VehicleDetails from '@/Modules/Cars/Components/carDetails/vehicleDetails';

function Page() {
    const pathname = usePathname(); // Get the current pathname
    const id = pathname.split('/').pop();
  return (
    <div>
      {id ? <VehicleDetails vehicleId={id} /> : <p>No vehicle selected.</p>}
    </div>
  )
}

export default Page