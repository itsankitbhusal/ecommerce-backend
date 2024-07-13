export interface unverifiedUserType {
  uuid: string;
  name: string;
  email: string;
  password: string;
  otp?: string;
}

export interface userType {
  uuid: string;
  name: string;
  email: string;
  password: string;
}

export interface jwtPayload {
  sub: string;
  email: string;
}
