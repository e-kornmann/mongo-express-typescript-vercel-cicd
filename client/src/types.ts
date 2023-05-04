export type SitterType = {
  id: string;
  name: string,
  gender: string;
  dateOfBirth: string,
  description: string,
  availability: string[],
  image: string
};

export type AuthUser = {
  userId?: string,
  userEmail: string,
  userPassword?: string,
};

export interface User extends AuthUser {
  userName: string;
  userAddress:string;
  status?: string,
  stored?: string,
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
