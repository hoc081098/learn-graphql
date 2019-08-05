export interface Event {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  creator: {
    _id: string;
    email: string;
  };
}
