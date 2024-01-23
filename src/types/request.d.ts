import 'express';

interface User {
  id: number;
  email: string;
  name: string;
}

declare module 'express' {
  interface Request {
    user: User;
  }
}
