export interface DeleteUserApplication {
  execute(id: string): Promise<void>;
}
