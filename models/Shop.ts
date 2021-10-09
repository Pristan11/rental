import {Location} from './Detail';

export interface Shop {
    uid?: string;
    name: string;
    address: string;
    location?: Location;
    contactNumber: string;
    currency: string;
    imageName?: string;
    category?: Category[];
    distance?: number;
    deliveryFixedPrice?: number;
    deliveryPaymentInPercentage?: string;
    selectedDeliveryPaymentMethod?: 'FIXED' | 'PERCENTAGE';

}

export interface Category {
    name: string;
    imageName: string;
}

export interface ImageSlider {
    imageName: string;
    sliderName: string;
    link: string;
}

export interface Image {
    logo: string;
    banner: string[];
    splash: string;
}
