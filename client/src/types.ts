export type SitterType = {
  id: string;
  name: string,
  gender: string;
  dateOfBirth: string,
  description: string,
  availability: string[],
  image: string
};

export type Kid = {
  name: string;
  // index: number;
  dateOfBirth: string,
  gender: string,
}

export type AuthUser = {
  userId?: string,
  userEmail?: string,
  userPassword?: string,
  confirmPassword?: string,
};
export interface User extends AuthUser {
  firstName: string,
  lastName: string,
  parent: string,
  street: string,
  zipCode: string,
  city: string,
  telephoneNumber: string,
  houseNumber: string,
  status?: string,
  stored?: string,
  kids: Kid[],
  notes?: string,
}

export type Reservation = {
  sitterId?: string,
  sitterName?: string,
  dateOfBooking: string,
  dayNameOfBooking: string,
  startTime: string,
  endTime: string,
};

export type InsertBooking = Reservation & AuthUser;
export interface InsertedBooking extends InsertBooking {
  bookingId: string;
  price: number;
}
