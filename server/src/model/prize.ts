export interface Prize {
  id: number;
  name: string;
  cost: number;
  droprate: number;
}

export let prizes: Prize[] = [];