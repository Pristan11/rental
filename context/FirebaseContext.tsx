import React, {createContext} from 'react';
import {MainConfig} from '../mainConfig';
import app from 'firebase/app';
import 'firebase/firestore';
import firebase from 'firebase';
import {Category, Order, Product, Shop, User, Variant} from '../models';
import {ImageSlider} from '../models/Shop';

type FirebaseContextType = {
    firestore: app.firestore.Firestore;
    auth: app.auth.Auth;
    storageRef: firebase.storage.Reference;
    authRef: app.auth.Auth;
    singleUserRef: (uid: string) => app.firestore.DocumentReference<User>;
    usersRef: () => app.firestore.CollectionReference<User>;
    shopsRef: () => app.firestore.CollectionReference<Shop>;
    shopRef: (uid: string) => app.firestore.DocumentReference<Shop>;
    productsRef: () => app.firestore.CollectionReference<Product>;
    productRef: (uid: string) => app.firestore.DocumentReference<Product>;
    categoriesRef: (shopId: string) => app.firestore.CollectionReference<Category>;
    categoryRef: (shopId: string, categoryId: string) => app.firestore.DocumentReference<Category>;
    imageSlidersRef: (shopId: string) => app.firestore.CollectionReference<ImageSlider>;
    imageSliderRef: (shopId: string, imageSliderId: string) => app.firestore.DocumentReference<ImageSlider>;
    ordersRef: () => app.firestore.CollectionReference<Order>;
    orderRef: (id: string) => app.firestore.DocumentReference<Order>;
    variantsRef: () => app.firestore.CollectionReference<Variant>;
    variantRef: (uid: string) => app.firestore.DocumentReference<Variant>;
    imageRef: (path: string) => firebase.storage.Reference;
    name: string;
};

// @ts-ignore
export const FirebaseContext = createContext<FirebaseContextType>();

const FirebaseProvider: React.FC<React.ReactNode> = ({children}) => {
    if (!app.apps.length) {
     const res = app.initializeApp(MainConfig.FirebaseConfig);
     console.log('connecting res', res);
    }

    const firebases = {
        firestore: firebase.firestore,
        auth: app.auth(),
        storageRef: app.storage().ref(),
        authRef: app.auth(),
        singleUserRef: (uid: string) => app.firestore().collection('users').doc(uid),
        usersRef: () => app.firestore().collection('users'),
        shopRef: (uid: string) => app.firestore().collection('shops').doc(uid),
        shopsRef: () => app.firestore().collection('shops'),
        productRef: (uid: string) => app.firestore().collection('products').doc(uid),
        productsRef: () => app.firestore().collection('products'),
        categoriesRef: (shopId: string) => app.firestore().collection('shops').doc(shopId)
            .collection('category'),
        categoryRef: (shopId: string, categoryId: string) => app.firestore()
            .collection('shops').doc(shopId)
            .collection('category').doc(categoryId),
        imageSlidersRef: (shopId: string) => app.firestore().collection('shops').doc(shopId)
            .collection('imageSlider'),
        imageSliderRef: (shopId: string, imageSliderId: string) => app.firestore()
            .collection('shops').doc(shopId)
            .collection('imageSlider').doc(imageSliderId),
        ordersRef: () => app.firestore().collection('orders'),
        orderRef: (id: string) => app.firestore().collection('orders').doc(id),
        variantsRef: () => app.firestore().collection('variants'),
        variantRef: (uid: string) => app.firestore().collection('variants').doc(uid),
        imageRef: (path: string) => app.storage().ref(path),
        name: 'ristan'
    };


    return (
        // @ts-ignore
        <FirebaseContext.Provider value={firebases}>
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseProvider;

