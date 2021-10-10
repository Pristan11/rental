import React, {useContext, useState,useEffect} from 'react'
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import {FirebaseContext} from "../context/FirebaseContext";
import {Spinner} from "./Spinner";
import ProductCart from "./ProductCart";
import {COLORS, FONTS, SIZES} from "../constants";
import {LinearGradient} from "expo-linear-gradient";


const  ApprovePosts = ({navigation}) => {

    const {productsRef, productRef} = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ( ) => {
            setLoading(true);
            getPosts().then(res=> {
                setPosts(res);
                setLoading(false);
            })
        });

        return unsubscribe;
    }, [navigation]);


    const getPosts = async ()=> {
        const categoriesSnapshot = await productsRef()
            .where('approved', '==', false)
            .get();
        return   categoriesSnapshot.docs.map((category)=> {
            return {uid: category.id, data: category.data()}
        })
    }
    const onApprove = async (id, pro)=> {
        setLoading(true);

        let post = pro;
        post.data.approved = true;
    await productRef(id).update(post.data)
        await getPosts().then(res=> {
            setPosts(res);
            setLoading(false);
        })


    }
    if(loading){
        return <Spinner/>
    }
    return(
        <>
            <View style={{marginBottom: 10,flex:1, alignItems: "center"}}>
                <TouchableOpacity
                    style={[styles.shadow, { marginTop: SIZES.padding * 2, width: '70%', height: 50, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={()=> navigation.navigate('CreateCategory')}
                >
                    <LinearGradient
                        style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                        colors={['#4843ff', '#5843ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Create Category</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
         <ScrollView>
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
                         role='ADMIN'
                         onApprove={()=> onApprove(post.uid, post)}
                     />
                 )
             })}
         </ScrollView>

        </>
    )
}
export default ApprovePosts
const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: 'blue',
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})
