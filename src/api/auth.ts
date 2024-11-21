import { LoginInputs,UserResponse,ApiServiceOptions} from "@/types/auth";


type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig<T = unknown> {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: T;
  }

const createApiService = (options: ApiServiceOptions) => {
  const { baseUrl, defaultHeaders = {} } = options;

  const request = async <T, B = unknown>(
    endpoint: string, 
    config: RequestConfig<B> = {}
  ): Promise<T> => {
    const {
      method = 'POST',
      headers = {},
      body
    } = config;

    try {
      const url = `${baseUrl}${endpoint}`;
      
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...defaultHeaders,
        ...headers
      };

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders
      };

      if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request error for ${endpoint}:`, error);
      throw error;
    }
  };

  const get = <T>(
    endpoint: string, 
    headers: Record<string, string> = {}
  ) => request<T>(endpoint, { method: 'GET', headers });

  const post = <T, B = unknown>(
    endpoint: string, 
    body: B, 
    headers: Record<string, string> = {}
  ) => request<T, B>(endpoint, { method: 'POST', body, headers });

  const put = <T, B = unknown>(
    endpoint: string, 
    body: B, 
    headers: Record<string, string> = {}
  ) => request<T, B>(endpoint, { method: 'PUT', body, headers });

  const patch = <T, B = unknown>(
    endpoint: string, 
    body: B, 
    headers: Record<string, string> = {}
  ) => request<T, B>(endpoint, { method: 'PATCH', body, headers });

  const del = <T>(
    endpoint: string, 
    headers: Record<string, string> = {}
  ) => request<T>(endpoint, { method: 'DELETE', headers });

  return {
    request,
    get,
    post,
    put,
    patch,
    delete: del
  };
};

// Create specific service instances
const authService = createApiService({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API,
  defaultHeaders: {
    'Accept': 'application/json'
  }
});

const loginService = {
  signIn: (credentials: LoginInputs) => 
    authService.post<UserResponse, LoginInputs>('/user/signin', credentials)
};

export { 
  createApiService, 
  authService, 
  loginService 
};