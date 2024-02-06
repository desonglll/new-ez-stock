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
    edit_url: string; //#
}

export interface Supplier {
    key: React.Key;
    pk: number;
    user: number;
    name: string;
    contact_email: string | null;
    contact_phone: string | null;
    contact_person: string | null;
}

export interface Category {
    key: React.Key;
    pk: number;
    name: string;
    user: number;
    description: string;
    parent: number;
    parent_name: string
}

export interface ProductAttribute {
    key: React.Key,
    pk: number,
    name: string,
    value: string
}