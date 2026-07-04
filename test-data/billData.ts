import { Bill } from '../types/bill.types';
import { Address } from '../types/address.types';

const newAddress: Address = {
  street: "road",
  city: "Dallas",
  state: "Texas",
  zipCode: "12345",
};

const emptyAddress: Address = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
};

export const newBill: Bill = {
  name: 'Apple',
  address: newAddress,
  phoneNumber:  '12345',
  accountNumber: '22345',
}

export const partiallyEmptyBill: Bill = {
  name: '',
  address: newAddress,
  phoneNumber:  '',
  accountNumber: '',
}

export const emptyBill: Bill = {
  name: '',
  address: emptyAddress,
  phoneNumber:  '',
  accountNumber: '',
}
