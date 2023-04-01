export interface DeleteUserService<T> {
  handler(transaction: T, id: string): Promise<void>;
}
