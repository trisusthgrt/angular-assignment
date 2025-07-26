export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  dob: string;
  phone: string;
  email: string;
  role: 'admin' | 'user';
  password: string;
} 