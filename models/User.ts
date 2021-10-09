import {Address, Variant} from './';
import {HasMap} from '../../type';
import firebase from "firebase";

export interface Roles {
    ADMIN: boolean | false;
    USER: boolean | false;

}

export interface User {
    email: string,
    roles: Roles,
    createdAt: Date,
    displayName: string,
    uid: string
}

export interface ShoppingCardItem {
    quantity: number;
    variant: HasMap<Variant>;
}

export interface AuthUser {
    email: string;
    password: string;
    userName: string;
}
