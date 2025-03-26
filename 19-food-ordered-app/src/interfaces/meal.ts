export default interface Meal {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export type OrderType = Meal & {
  quantity: number;
};
