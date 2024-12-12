export type User = {
  email: string;
  name: string;
  gender: boolean;
  id_type: "nin" | "passport";
  id_number: string;
  role: "admin" | "customer";
  dob: Date;
  country_code: number;
  phone: string;
};