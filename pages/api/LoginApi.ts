import {
  APIRequestContext,
  APIResponse
} from '@playwright/test';

export interface LoginRequest {
  email?: unknown;
  password?: unknown;
}

export class LoginApi {

  constructor(
    private request: APIRequestContext
  ) {}

  async login(
    body: LoginRequest,
    headers?: Record<string, string>
  ): Promise<APIResponse> {

    return await this.request.post('/api/v1/auth/login', {
      data: body,
      headers
    });
  }
}