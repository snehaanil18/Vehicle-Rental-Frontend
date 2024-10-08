import { gql } from '@apollo/client';

export const GET_ALL_VEHICLES = gql`
  query GetAllVehicles {
    getAllVehicles {
      id
      name
      description
      price
      primaryimage
      otherimages
      model
      manufacturer
      vehicletype
      quantity
      transmission   
      fueltype  
    }
  }
`;

export const SEARCH_VEHICLES = gql`
query SearchVehicles($query: String!) {
  searchVehicles(query: $query) {
    id
    name
    description
    price
    model
    manufacturer
    primaryimage
    vehicletype
    quantity
    transmission
    fueltype
  }
}
`;

export const GET_VEHICLE = gql`
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
      id
      name
      description
      price
      primaryimage
      otherimages
      model
      manufacturer
      quantity 
      transmission
      fueltype  
    }
  }
`;