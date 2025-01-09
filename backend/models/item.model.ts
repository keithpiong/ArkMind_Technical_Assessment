export interface Item {
    id: number;
    name: string;
    price: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
  }


export interface NewItem {
  name: string;
  price: number;
  description: string;
}