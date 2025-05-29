export interface Account {
  _id?: string;
  status: string[];
  name: string;
  username: string;
  password: string;
  description: string;
  url: string;
  created_date?: string;
  __v?: number;
} 