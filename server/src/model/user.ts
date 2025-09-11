export interface User {
  id: number;
  name: string;
  username: string;
  language_code: string;
}

export let users: User[] = [];