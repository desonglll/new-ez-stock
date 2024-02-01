import * as React from "react";

export interface Product {
  key: React.Key;
  pk: number;
  owner: {};
  name: string; //#
  description: string | null; //#
  sku: string; //#
  image: any;
  price: number | null; //#
  discount_price: number | null; //#
  is_discounted: boolean; //#
  stock_quantity: number;
  is_in_stock: boolean;
  is_valid: boolean; //#
  categories: number[]; //#
  created_at: string;
  updated_at: string;
  attributes: number[]; //#
  supplier: number | null; //#
  weight: number | null;
  dimensions: string | null;
  status: string;
  public: boolean;
  edit_url:string//#
}
