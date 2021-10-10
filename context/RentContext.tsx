import React, {createContext, useContext, useEffect, useState} from 'react';
import {FirebaseContext} from './firebaseContext';
import {Category, Product, Variant,HasMap} from '../models';
import {Toast} from 'native-base';
import {ProductsWithVariants} from '../models/Product';


type ProductContextType = {
    getProduct: (uid: string) => Promise<ProductsWithVariants | undefined>;
    createProduct: (product: Product, variants: Variant[]) => Promise<boolean>;
    categories: HasMap<Category>[];
    products: ProductsWithVariants[];
    getProducts: () => Promise<ProductsWithVariants[]>;
    availableProducts: ProductsWithVariants [];
    getAvailableProducts: () => Promise<ProductsWithVariants[]>;
    createCategory: (category: Category) => Promise<boolean>;
    updateCategory: (categoryId: string, category: Category) => Promise<boolean>;
    refreshProduct: () => Promise<void>;
    refreshAvailableProduct: () => Promise<void>;
    refreshCategory: () => Promise<void>;
    nextProducts: (limit: number, lastId: string, category?: string) =>
        Promise<ProductsWithVariants[]>;
    nextAvailableProducts: (limit: number, lastId: string, category?: string) =>
        Promise<ProductsWithVariants[]>;
    isLoading: boolean;
    searchProduct: (queryText: string) => Promise<ProductsWithVariants[]>;
    searchNextProducts: (queryText: string, limit: number, lastId: string) =>
        Promise<ProductsWithVariants[]>;
    getProductByCategory: ( category: string, limit: number) => Promise<ProductsWithVariants[]>;
    deleteCategory: (categoryId: string) => Promise<boolean>;
    updateProduct: (ProductId: string, Product: Product) => Promise<boolean>;
    deleteProduct: (productId: string) => Promise<boolean>;
    variantUpdate: (variantId: string, variant: Variant) => Promise<boolean>;
    getPopularProducts: () => Promise<ProductsWithVariants[]>;
};

// @ts-ignore
export const RentContext = createContext<ProductContextType>();

const RentProvider: React.FC<React.ReactNode> = ({children}) => {
        const {
            productRef,
            productsRef, categoriesRef,
            categoryRef, variantsRef,
            variantRef,
            firestore
        } = useContext(FirebaseContext);
        const [productsWithVariants, setProductsWithVariants] = useState<ProductsWithVariants[]>([]);
        const [categories, setCategories] = useState<HasMap<Category>[]>([]);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [availableProducts, setAvailableProducts] = useState<ProductsWithVariants []>([]);


        useEffect(() => {
            if (shopId) {
                getCategories(shopId).then(setCategories);
            }
        }, [shopId]);

        const getVarientsForProduct: (productId: string) =>
            Promise<HasMap<Variant>[]> = async (productId: string) => {
            try {
                const variantSnapshot = await variantsRef()
                    .where('productId', '==', productId)
                    .get();
                const _varients: HasMap<Variant>[] = variantSnapshot.docs.map((v) => {
                    return {uid: v.id, value: v.data()};
                });
                return _varients;
            } catch (e) {
                console.error(e.message);
                Analytics.logEvent('app_error', e);
                Toast.show({text: e.message, type: 'danger'});
                throw e;
            }
        };

        const getProducts: () => Promise<ProductsWithVariants[]> = async () => {
            try {
                // TODO: need to do pagination
                const productsSnapshot = await productsRef()
                    .where('shopId', '==', shopId)
                    .orderBy('title')
                    .limit(20).get();
                const productsWithVariants = await Promise.all(productsSnapshot.docs
                    .map(async (p) => {
                        const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                        return {product: {uid: p.id, value: p.data()}, variants: _varients};
                    }));
                return productsWithVariants;
            } catch (e) {
                console.error(e.message);
                Analytics.logEvent('app_error', e);
                Toast.show({text: e.message, type: 'danger'});
                throw e;
            }
        };

        const getAvailableProducts: () => Promise<ProductsWithVariants[]> = async () => {
            try {
                // TODO: need to do pagination
                const productsSnapshot = await productsRef()
                    .where('shopId', '==', shopId)
                    .where('availability', '==', true)
                    .orderBy('title')
                    .limit(20).get();
                const productsWithVariants = await Promise.all(productsSnapshot.docs
                    .map(async (p) => {
                        const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                        return {product: {uid: p.id, value: p.data()}, variants: _varients};
                    }));
                return productsWithVariants;
            } catch (e) {
                console.error(e.message);
                Analytics.logEvent('app_error', e);
                Toast.show({text: e.message, type: 'danger'});
                throw e;
            }
        };

        const refreshProduct: () => Promise<void> = async () => {
            const _products = await getProducts();
            setProductsWithVariants(_products);
        };

        const refreshAvailableProduct: () => Promise<void> = async () => {
            const _availableProducts = await getAvailableProducts();
            setAvailableProducts(_availableProducts);
        };

        const refreshCategory: () => Promise<void> = async () => {
            const _categories = await getCategories(shopId!);
            setCategories(_categories);
        };

        const createVarients: (productId: string, variants: Variant[]) =>
            Promise<HasMap<Variant>[]> = async (productId: string, variants: Variant[]) => {
            const batch = firestore.batch();
            const map: HasMap<Variant>[] = await Promise.all(variants.map(async (v) => {
                v.productId = productId;
                const promise = await variantsRef().add(v);
                const documentSnapshot = await promise.get();
                const variant = documentSnapshot.data()!;
                return {uid: documentSnapshot.id, value: variant};
            }));
            await batch.commit();
            return map;
        };

        const getProduct: (uid: string) => Promise<ProductsWithVariants | undefined> =
            async (uid: string) => {
                try {
                    const productSnapshot = await productRef(uid).get();
                    if (productSnapshot.data()) {
                        const _varients = await getVarientsForProduct(productSnapshot.id);
                        return {
                            product: {uid: productSnapshot.id, value: productSnapshot.data()!},
                            variants: _varients
                        };
                    } else {
                        return undefined;
                    }
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const createProduct: (product: Product, variants: Variant[]) => Promise<boolean> =
            async (product: Product, variants: Variant[]) => {
                setIsLoading(true);
                try {
                    const documentReference = await productsRef().add(product);
                    const documentSnapshot = await documentReference.get();
                    if (documentSnapshot.data()) {
                        const cProduct: HasMap<Product> = {
                            uid: documentSnapshot.id,
                            value: documentSnapshot.data()!
                        };
                        const _variants = await createVarients(documentSnapshot.id, variants);
                        setProductsWithVariants([...productsWithVariants,
                            {product: cProduct, variants: _variants}]);
                        setIsLoading(false);
                        console.debug({shopId, 'new product created': product});
                        Analytics.logEvent('product_created', product);
                        Toast.show({text: 'New product successfully', type: 'success'});
                        navigate('ManagerSetting');
                        navigate('ManagerItems');
                        return true;
                    }
                    setIsLoading(false);
                    Toast.show({text: 'Product creation failed! try again', type: 'danger'});
                    return false;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const createCategory: (category: Category) => Promise<boolean> =
            async (category: Category) => {
                setIsLoading(true);
                try {
                    if (shopId) {
                        const documentReference = await categoriesRef(shopId).add(category);
                        const documentSnapshot = await documentReference.get();
                        if (documentSnapshot.data()) {
                            const cCategory: HasMap<Category> = {
                                uid: documentSnapshot.id,
                                value: documentSnapshot.data()!
                            };
                            console.debug({shopId, 'new category created': category});
                            Analytics.logEvent('category_created', category);
                            setCategories([...categories, cCategory]);
                            setIsLoading(false);
                            Toast.show({text: 'New categories created', type: 'success'});
                            return true;
                        }
                    }
                    setIsLoading(false);
                    return false;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const updateCategory: (categoryId: string, category: Category) => Promise<boolean> =
            async (categoryId: string, category: Category) => {
                setIsLoading(true);
                try {
                    await categoryRef(shopId, categoryId).update(category);
                    categories.filter((value) => value.uid === categoryId)
                        .map(() => category);
                    console.debug({shopId, 'category updated': category, categoryId});
                    Analytics.logEvent('category_updated', {categoryId, category});
                    const _category: HasMap<Category> = {
                        uid: categoryId,
                        value: category
                    };
                    const selectedCategories = categories
                        .filter( (category) => category.uid !== categoryId );
                    setCategories([...selectedCategories, _category]);
                    setIsLoading(false);
                    Toast.show({text: 'Category updated', type: 'success'});
                    return true;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const getCategories: (shopId: string) => Promise<HasMap<Category>[]> =
            async (shopId: string) => {
                try {
                    const categorySnapshot = await categoriesRef(shopId).get();
                    return categorySnapshot.docs.map((p) => {
                        return {uid: p.id, value: p.data()};
                    });
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const nextProducts: (limit: number, lastId: string, category?: string) =>
            Promise<ProductsWithVariants[]> =
            async (limit: number, lastId: string, category?: string) => {
                try {
                    const last = await productRef(lastId).get();
                    let productsSnapshot;
                    if (category) {
                        productsSnapshot = await productsRef()
                            .where('shopId', '==', shopId)
                            .where('category', '==', category)
                            .orderBy('title')
                            .startAfter(last.data()?.title)
                            .limit(limit)
                            .get();
                    } else {
                        productsSnapshot = await productsRef()
                            .where('shopId', '==', shopId)
                            .orderBy('title')
                            .startAfter(last.data()?.title)
                            .limit(limit)
                            .get();
                    }

                    return await Promise.all(productsSnapshot.docs
                        .map(async (p) => {
                            const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                            return {product: {uid: p.id, value: p.data()}, variants: _varients};
                        }));
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const nextAvailableProducts: (limit: number, lastId: string, category?: string) =>
            Promise<ProductsWithVariants[]> =
            async (limit: number, lastId: string, category?: string) => {
                try {
                    const last = await productRef(lastId).get();
                    let productsSnapshot;
                    if (category) {
                        productsSnapshot = await productsRef()
                            .where('shopId', '==', shopId)
                            .where('availability', '==', true)
                            .where('category', '==', category)
                            .orderBy('title')
                            .startAfter(last.data()?.title)
                            .limit(limit)
                            .get();
                    } else {
                        productsSnapshot = await productsRef()
                            .where('shopId', '==', shopId)
                            .where('availability', '==', true)
                            .orderBy('title')
                            .startAfter(last.data()?.title)
                            .limit(limit)
                            .get();
                    }

                    return await Promise.all(productsSnapshot.docs
                        .map(async (p) => {
                            const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                            return {product: {uid: p.id, value: p.data()}, variants: _varients};
                        }));
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const searchProduct: (queryText: string) => Promise<ProductsWithVariants[]> =
            async (queryText: string) => {
                setIsLoading(true);
                try {
                    const productsSnapshot = await productsRef()
                        .where('shopId', '==', shopId)
                        .where('title', '<=', queryText + 'z')
                        .orderBy('title', 'asc')
                        .limit(20).get();

                    const productsWithVariants = await Promise.all(productsSnapshot.docs
                        .map(async (p) => {
                            const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                            return {product: {uid: p.id, value: p.data()}, variants: _varients};
                        }));
                    setIsLoading(false);
                    return productsWithVariants;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const searchNextProducts: (queryText: string, limit: number, lastId: string) =>
            Promise<ProductsWithVariants[]> =
            async (queryText: string, limit: number, lastId: string) => {
                try {
                    const last = await productRef(lastId).get();
                    const productsSnapshot = await productsRef()
                        .where('shopId', '==', shopId)
                        .where('title', '<=', queryText + 'z')
                        .orderBy('title', 'asc')
                        .startAfter(last.data()?.title)
                        .limit(limit)
                        .get();

                    return await Promise.all(productsSnapshot.docs
                        .map(async (p) => {
                            const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                            return {product: {uid: p.id, value: p.data()}, variants: _varients};
                        }));
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const getProductByCategory: ( category: string, limit: number) =>
            Promise<ProductsWithVariants[]> =
            async ( category: string, limit: number) => {
                try {
                    const productsSnapshot = await productsRef()
                        .where('shopId', '==', shopId)
                        .where('availability', '==', true)
                        .where('category', '==', category)
                        .orderBy('title')
                        .limit(limit)
                        .get();
                    return await Promise.all(productsSnapshot.docs
                        .map(async (p) => {
                            const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                            return {product: {uid: p.id, value: p.data()}, variants: _varients};
                        }));
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const deleteCategory: (categoryId: string) => Promise<boolean> =
            async (categoryId: string) => {
                setIsLoading(true);
                try {
                    await categoryRef(shopId, categoryId).delete();
                    categories.splice(categories.findIndex((value) => value.uid === categoryId), 1);
                    console.debug({shopId, 'category deleted': categoryId});
                    Analytics.logEvent('category_deleted', {categoryId});
                    const updatingCategories = categories.filter((category) => {
                        return category.uid !== categoryId;
                    });
                    setCategories(updatingCategories);
                    setIsLoading(false);
                    Toast.show({text: 'Category updated', type: 'success'});
                    return true;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const updateProduct: (productId: string, product: Product) => Promise<boolean> =
            async (productId: string, product: Product) => {
                setIsLoading(true);
                try {
                    await productRef(productId).update(product);
                    console.debug({shopId, 'product_updated': product});
                    Analytics.logEvent('product_updated', product);
                    Toast.show({text: 'Product updated successfully', type: 'success'});
                    setIsLoading(false);
                    return true;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const deleteProduct: (productId: string) => Promise<boolean> =
            async (productId: string) => {
                setIsLoading(true);
                try {
                    await productRef(productId).delete();
                    const _varients = await getVarientsForProduct(productId);
                    _varients.map((variant) => {
                        variantRef(variant.uid).delete();
                    });
                    Analytics.logEvent('product_deleted', {productId});
                    setIsLoading(false);
                    Toast.show({text: 'Product deleted', type: 'success'});
                    return true;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('app_error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };

        const variantUpdate: (variantId: string, variant: Variant) => Promise<boolean> =
            async (variantId: string, variant: Variant) => {
                setIsLoading(true);
                try {
                    await variantRef(variantId).update(variant);
                    console.debug({shopId, 'variants_updated': variant});
                    Analytics.logEvent('variants_updated', variant);
                    Toast.show({text: 'variant updated successfully', type: 'success'});
                    setIsLoading(false);
                    return true;
                } catch (e) {
                    console.error(e.message);
                    Analytics.logEvent('error', e);
                    setIsLoading(false);
                    Toast.show({text: e.message, type: 'danger'});
                    throw e;
                }
            };
        const getPopularProducts: () => Promise<ProductsWithVariants[]> = async () => {
            try {
                // TODO: need to do pagination
                const productsSnapshot = await productsRef()
                    .where('shopId', '==', shopId)
                    .where('popular', '==', true)
                    .orderBy('title')
                    .limit(20).get();
                const productsWithVariants = await Promise.all(productsSnapshot.docs
                    .map(async (p) => {
                        const _varients: HasMap<Variant>[] = await getVarientsForProduct(p.id);
                        return {product: {uid: p.id, value: p.data()}, variants: _varients};
                    }));
                return productsWithVariants;
            } catch (e) {
                console.error(e.message);
                Analytics.logEvent('app_error', e);
                Toast.show({text: e.message, type: 'danger'});
                throw e;
            }
        };

        return (
            <RentContext.Provider value={
                {
                    getProduct,
                    getProducts,
                    createProduct,
                    createCategory,
                    updateCategory,
                    products: productsWithVariants,
                    availableProducts,
                    getAvailableProducts,
                    categories,
                    refreshProduct,
                    refreshCategory,
                    nextProducts,
                    nextAvailableProducts,
                    isLoading,
                    searchNextProducts,
                    searchProduct,
                    getProductByCategory,
                    deleteCategory,
                    updateProduct,
                    refreshAvailableProduct,
                    deleteProduct,
                    variantUpdate,
                    getPopularProducts
                }
            }>
                {children}
            </RentContext.Provider>
        );
    }
;

export default RentProvider;

