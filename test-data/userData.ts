import { User } from "../types/user.types";
import { Address } from "../types/address.types";
import 'dotenv/config';

const timestamp = Date.now();

const newAddress: Address = {
  street: "road",
  city: "Dallas",
  state: "Texas",
  zipCode: "12345",
};

export function createNewUser(): User {
  return {
    firstname: "amine",
    lastname: "test",
    address: newAddress,
    phone: "013566787765",
    ssn: "9876",
    username: `${process.env.VALID_USERNAME}_${Date.now()}`,
    password: process.env.VALID_PASSWORD!,
  };
}

export function createEmptyFieldsUser(): User {
  return {
    firstname: "",
    lastname: "",
    address: newAddress,
    phone: "",
    ssn: "",
    username: `${process.env.VALID_USERNAME}_${timestamp}`,
    password: process.env.VALID_PASSWORD!,
  };
}
