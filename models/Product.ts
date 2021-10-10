import {User} from './';
;
export type HasMap<T> = {
    uid: string;
    value: T;
}
export interface Product {
    title: string;
    description: string;
    imageName?: string;
    rentPrice: number;
    category: string;
    popular: boolean;
    approved: boolean;
    contactNumber: number;
    duration?: string;
    location?: string;
}

export interface Review {
    command?: string;
    score?: number;
    product: Product;
    user: User;
}

export interface Option {
    name: string;
    values?: string[];
}

export type Variant = {
    title?: string;
    optionAsString?: string;
    price: number;
    productId?: string;
    selectedOptions?: SelectedOption[];
    available: boolean;
}

export type SelectedOption = {
    name: string;
    value: string;
}

export type ProductsWithVariants = {
    product: HasMap<Product>;
    variants: HasMap<Variant>[];
}
