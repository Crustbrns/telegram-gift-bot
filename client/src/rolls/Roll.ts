export class Roll {
  _id: string;
  name: string;
  prizes: string[];
  cost: number;
  __v: number;

  constructor(data: {
    _id: string;
    name: string;
    prizes: string[];
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
    const res = await fetch("https://telegram-gift-bot-3jp7.onrender.com/api/rolls/");
    const data = await res.json();
    rolls = data[0];
    console.log(rolls);
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  }
};

await fetchData();
    // console.log(rolls);
