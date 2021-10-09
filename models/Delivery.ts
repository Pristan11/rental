import {Address, Order, User} from './';

export interface Delivery {
    delivery: User;
    address: Address;
    order: Order;
}
