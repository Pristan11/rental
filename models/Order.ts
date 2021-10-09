import {ShoppingCardItem} from './User';
import {Address, OrderStatus, OrderType, PaymentType} from './Detail';
import * as firebase from 'firebase/app';

export interface Order {
    variants?: ShoppingCardItem[];
    totalPrice?: number;
    discount?: number;
    netValue?: number;
    status?: OrderStatus;
    buyerUid: string;
    paymentType?: PaymentType;
    shopUid: string;
    deliveryAddress?: Address;
    deliveryNote?: string;
    deliveryBoyId?: string;
    orderType?: OrderType;
    createdAt?: firebase.firestore.Timestamp;
}
