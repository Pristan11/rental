import {User} from './';
import {HasMap} from '../../type';

export interface Product {
    title: string;
    description: string;
    imageName?: string;
    handle?: string;
    rating?: number[];
    options?: Option[];
    price: number;
    tags?: string[];
    category: string;
    shopId: string;
    availability: boolean;
    noPurchase: number;
    popular: boolean;
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
