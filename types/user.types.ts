import { Address } from './address.types';

export interface User {
  firstname: string;
  lastname: string;
  address: Address;
  phone: string;
  ssn: string;
  username: string;
  password: string;
}