import { Address } from './address.types';

export interface Bill {
  name: string;
  address: Address;
  phoneNumber: string;
  accountNumber: string;
}