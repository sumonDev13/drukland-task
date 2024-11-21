export interface LoginInputs {
    email: string;
    password: string;
  }
  
 export interface ApiServiceOptions {
    baseUrl?: string;
    defaultHeaders?: Record<string, string>;
  }

export  interface UserResponse {
    id: string;
    email: string;
    token: string;
  }