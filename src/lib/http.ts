type RequestInterceptor = (request: RequestInit) => void

export interface HttpResponse<D = any, H = any> {
  status: number;
  data: D;
  headers: H;
}

interface Config {
  baseUrl: string;
  requestInterceptors?: RequestInterceptor[];
}

export class HttpClient {
  private config: Config;
  private requestInterceptors: RequestInterceptor[];

  constructor(config: Config) {
    this.config = config;
    this.requestInterceptors = this.config.requestInterceptors || []
  }

  private buildFetchUrl(url: string, params?: any): string {
    const queryString = new URLSearchParams(params).toString();
    return params ? this.config.baseUrl + url + '?' + queryString : this.config.baseUrl + url;
  }

  private async makeResponse(res: Response): Promise<HttpResponse> {
    const contentType = res.headers.get("content-type");
    const isJsonObjectData = contentType && contentType.indexOf("application/json") !== -1;
    const data = isJsonObjectData ? await res.json() : res;

    if (res.status >= 400) {
      throw new Error(isJsonObjectData ? data.message : 'Error');
    }
    return {
      status: res.status,
      data,
      headers: {},
    };
  }

  private buildRequestInit(requestInit: RequestInit): RequestInit {
    this.requestInterceptors.forEach(fn => fn(requestInit))
    return requestInit;
  }

  async post<D extends any>(url: string, body: D, params?: any): Promise<HttpResponse> {
    const requestInit = this.buildRequestInit({
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await fetch(this.buildFetchUrl(url, params), requestInit);
    return this.makeResponse(res);
  }

  async patch<D extends any>(url: string, body: any, params?: any): Promise<HttpResponse> {
    const requestInit = this.buildRequestInit({
      method: "PATCH",
      body: body,
      headers: {
        "Content-Type": "application/json"
      },
    });
    const res = await fetch(this.buildFetchUrl(url, params), requestInit);
    return this.makeResponse(res);
  }

  async get(url: string, params?: any): Promise<HttpResponse> {
    const requestInit = this.buildRequestInit({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await fetch(this.buildFetchUrl(url, params), requestInit);
    return this.makeResponse(res);
  }
}
