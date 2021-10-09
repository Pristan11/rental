import {Point} from 'react-native-google-places-autocomplete';

export interface Address {
    name?: string;
    no?: string;
    streetAddress1?: string;
    streetAddress2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    isPrimary?: boolean;
    contactNumber?: string;
    geometry?: Point;
    placeId?: string;
}

export interface Location {
    name?: string;
    geometry?: Point;
    placeId?: string;
}

export type OrderStatus =
    'CREATED'
    | 'MANAGER_ACCEPTED'
    | 'ASSIGN_DELIVERY'
    | 'READY_TO_SELL'
    | 'DELIVERY_ACCEPTED'
    | 'DELIVERY_DECLINE'
    | 'DELIVERY_ARRIVED'
    | 'COMPLETED'
    | 'USER_CANCEL'
    | 'MANAGER_CANCEL'
    | 'DELIVERY_FAILED'
    | 'FAILED';

export type PaymentType = 'CASH' | 'CARD' | 'WALLET';

export type OrderType = 'DELIVERY' | 'STORE PICKUP';
