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

type PrizeData = {
  _id: string;
  name: string;
  cost: number;
};

export class Prize {
  _id: string;
  name: string;
  cost: number;

  constructor(data: PrizeData) {
    this._id = data._id;
    this.name = data.name;
    this.cost = data.cost;
  }
}

export let rolls: Roll;
export let rolls_selects: Array<Prize>;

// const fetchData = async (id: string) => {
//   try {
//     const res = await fetch(`https://telegram-gift-bot-3jp7.onrender.com/api/rolls/${id}`);
//     const data = await res.json();
//     rolls = data[0];
//     console.log(id, data[0]);
//   } catch (error) {
//     console.error("Ошибка загрузки:", error);
//   }
// };


const fetchRolls = async () => {
  try {
    const res = await fetch("https://telegram-gift-bot-3jp7.onrender.com/api/rolls/");
    const data = await res.json()
    rolls_selects = data;

    const res2 = await fetch(`https://telegram-gift-bot-3jp7.onrender.com/api/rolls/${data[0]._id}`);
    const data2 = await res2.json();
    rolls = data2;
    // console.log(data2[0])
    
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  }
};

await fetchRolls();
// console.log(rolls);
