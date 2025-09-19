import type { GiftImage } from "../components/giftcarousel/giftcarousel";

export class Roll {
  _id: string;
  name: string;
  prizes: GiftImage[];
  cost: number;
  __v: number;

  constructor(data: {
    _id: string;
    name: string;
    prizes: GiftImage[];
    cost: number;
    __v: number;
  }) {
    this._id = data._id;
    this.name = data.name;
    this.prizes = data.prizes;
    this.cost = data.cost;
    this.__v = data.__v;
  }

  toString() {
    return `${this.name} (cost: ${this.cost})`;
  }
}

export let rolls: Roll;

const fetchData = async () => {
  try {
    const res = await fetch("/api/rolls/");
    const data = await res.json();
    rolls = data[0];
    console.log(rolls);
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  }
};

await fetchData();
    // console.log(rolls);
