import {Product, User, Variant} from './';

export interface Cart {
    uid: string;
    cartItems: CartItem[];
    mergeToCart: boolean;
    user: User;
}

export interface CartItem {
    qty: string;
    product: Product;
    variant: Variant;
}
