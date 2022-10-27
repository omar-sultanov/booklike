import { IProduct } from "./IProduct";

export interface productState {
    products: IProduct[];
    loading: boolean;
    error: string | null;
    filterBy: string;
  }