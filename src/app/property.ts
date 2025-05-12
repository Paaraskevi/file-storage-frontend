export interface Property {
    id?: number;
    propertyId?: string;
    address: string;
    price: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    listedDate?: string;
  }