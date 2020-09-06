export class ApiResponse<T> {
  readonly body: T;
  readonly status: number;
}
