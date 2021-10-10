
import React, {useState, useContext, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView, Pressable, Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import ProductCart from "../components/ProductCart";
import {FirebaseContext} from "../context/FirebaseContext";
import {Spinner} from "../components/Spinner";

const OptionItem = ({ bgColor, icon, label, onPress }) => {
    return (
        <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={onPress}
        >
            <View style={[styles.shadow, { width: 60, height: 60 }]}>
                <LinearGradient
                    style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'red' }]}
                    colors={bgColor}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style={{
                            tintColor: COLORS.white,
                            width: 30,
                            height: 30,
                        }}
                    />
                </LinearGradient>
            </View>
            <Text style={{ marginTop: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{label}</Text>
        </TouchableOpacity>
    )
}

const Home = ({ navigation }) => {

    const {productsRef,categoriesRef} = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const getPosts = async ()=> {
        const categoriesSnapshot = await productsRef()
            .where('approved', '==', true)
            .get();
        return   categoriesSnapshot.docs.map((category)=> {
            return {uid: category.id, data: category.data()}
        })
    }
    const getFilteredPosts = async (name)=> {
        const categoriesSnapshot = await productsRef()
            .where('category', '==', name)
            .get();
        return   categoriesSnapshot.docs.map((category)=> {
            return {uid: category.id, data: category.data()}
        })
    }
    const getCategories = async ()=> {
        const categoriesSnapshot = await categoriesRef()
            .limit(20).get();
        return   categoriesSnapshot.docs.map((category)=> {
            return {uid: category.id, data: category.data()}
        })
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = navigation.addListener('focus', ( ) => {
            getCategories().then(res=> {
                console.log('posts', res);
                setAllCategories(res);
            })
            getPosts().then(res=> {
                console.log('posts', res);
                setPosts(res);
                setLoading(false)
            })
        });

        return unsubscribe;
    }, [navigation]);

const filteredByCategory =  (id) => {
    setLoading(true);
    getFilteredPosts(id).then(res=> {
        setLoading(false);
      setPosts(res);
  })
}


const getAllPosts =async ()=> {
    console.log('function called')
    getPosts().then((res)=> {
        setPosts(res);
        setLoading(false);
    })
}
    function renderDestinations(item, index) {
        var destinationStyle = {};

        if (index == 0) {
            destinationStyle = { marginLeft: SIZES.padding, }
        }

        return (
            <TouchableOpacity
                style={{ justifyContent: 'center', marginHorizontal: SIZES.base, ...destinationStyle }}
                onPress={() => filteredByCategory(item.name)}
            >
                <Image
                    source={{uri: item.imageName}}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * 0.28,
                        height: '82%',
                        borderRadius: 15
                    }}
                />

                <Text style={{ marginTop: SIZES.base / 2, ...FONTS.h4 }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    if(loading){
        return <Spinner/>
    }
    return (
        <View style={styles.container}>

            {/* Destination */}
                <View style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
               <View>
                <Text style={{marginLeft: 20, fontSize: 14, color: COLORS.primary,marginBottom: -25,marginTop: 10}}>Categories</Text>
               </View>

                        <View >
                <Button
                    style={{marginLeft: 20, fontSize: 14, color: COLORS.primary,marginTop: 10}}
                    title='All Categories'
                onPress={()=> getAllPosts()}
                />
                        </View>
                </View>
            <View style={{ height: '25%'}}>
                <View  style={{ height: '20%'}}/>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={allCategories}
                    keyExtractor={item => item.uid.toString()}
                    renderItem={({ item, index }) => renderDestinations(item.data, index)}
                />
            </View>
            <Text style={{marginLeft: 20, fontSize: 14, color: COLORS.primary,marginBottom: -35,marginTop: 20}}>Products</Text>
            <ScrollView style={{marginTop: '10%', marginBottom: 20}}>
                { posts && posts.map((post, index)=> {
                    return (
                        <ProductCart
                            data={post}
                            productName={post.data.title}
                            location={post.data.title}
                            rentPrice={post.data.rentPrice}
                            duration={post.data.duration}
                            id={index}
                            image={post.data.imageName}
                            navigation={navigation}
                        />
                    )
                })}
                {posts.length == 0 && <View style={{display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: COLORS.secondary}}>No Products Available for Selected Category</Text>
                </View>}
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default Home;
