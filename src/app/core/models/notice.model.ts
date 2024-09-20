export interface Notice {
  id: string; // uuid
  title: string;
  description: string | null;
  tags: string[]; // tag ids
}
