interface CreatedTask {
  id: string;
  name: string;
  status: string | null;
  created_at: Date;
}

export { CreatedTask }