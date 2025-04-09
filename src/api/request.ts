import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

/** 统一响应结构 */
interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

/** 自定义请求配置 */
interface CustomRequestConfig extends AxiosRequestConfig {
  needAuth?: boolean;
}

/** 错误类型增强 */
interface ApiError extends Error {
  code?: number;
  isCancel?: boolean;
  response?: AxiosResponse<ApiResponse>;
}

class Request {
  private instance: AxiosInstance;

  constructor(baseConfig: CustomRequestConfig) {
    this.instance = axios.create({
      baseURL: baseConfig.baseURL || import.meta.env.VITE_API_URL,
      timeout: 10000,
      ...baseConfig
    });
    this.setupInterceptors();
  }

  /** 拦截器配置 */
  private setupInterceptors() {
    // 请求拦截
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (config.needAuth !== false) {
          const token = localStorage.getItem('token') || '';
          config.headers.Authorization = `Bearer ${token}` as string;
        }
        return config;
      },
      (error: ApiError) => Promise.reject(error)
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { code, data, message } = response.data;
        if (code === 200) return data;
        return Promise.reject(new Error(message || 'Error'));
      },
      (error: ApiError) => {
        if (axios.isCancel(error)) {
          error.message = '请求已取消';
          error.isCancel = true;
        }
        return Promise.reject(this.normalizeError(error))
      }
    )
  }

  private normalizeError(error: ApiError) {
    if (error.response) {
      const { status, data } = error.response;
      error.message = `请求错误 ${status}: ${data?.message}`;
    }
    return error;
  }

  public async request<T = unknown>(
    config: CustomRequestConfig
  ): Promise<T> {
    try {
      const response = await this.instance.request<ApiResponse<T>>(config);
      return response as unknown as T;
    } catch (error) {
      return Promise.reject(error as ApiError);
    }
  }

  public get<T = unknown>(
    url: string,
    params?: object,
    config?: CustomRequestConfig
  ) {
    return this.request<T>({ method: 'GET', url, params, ...config });
  }

  public post<T = unknown>(
    url: string,
    data?: object,
    config?: CustomRequestConfig
  ) {
    return this.request<T>({ method: 'POST', url, data, ...config });
  }

  public put<T, U = unknown>(
    url: string,
    data: U,
    config?: CustomRequestConfig
  ) {
    return this.request<T>({ method: 'PUT', url, data, ...config });
  }
}

// 创建全局实例
const apiClient = new Request({
  baseURL: '/api',
  headers: { 'X-Custom-Header': 'TS-Axios' }
});

// 导出类型
export type { ApiResponse, ApiError };

// 导出实例方法
export default apiClient;

/**
 * // 使用泛型约束响应类型
interface UserData {
  id: string;
  name: string;
  email: string;
}

// 在组件中使用
apiClient.get<UserData[]>('/users')
  .then(users => console.log(users))
  .catch((err: ApiError) => {
    if (!err.isCancel) {
      alert(err.message);
    }
  });

// 带参数的POST请求
apiClient.post<boolean>('/login', {
  username: 'admin',
  password: '123456'
}, { needAuth: false });
 *
 *
*/



