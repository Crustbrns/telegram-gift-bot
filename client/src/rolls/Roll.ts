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