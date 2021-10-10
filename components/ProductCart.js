import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import Background from "./Background";

 const ProductCart = ({ productName, rentPrice, location, data,id, duration, image,navigation ,onApprove, role})=> {
    return(
        <TouchableOpacity  onPress={() => { navigation.navigate("DestinationDetail", {data: data}) }}>
        <View
            key={id}
            style={[{
                left: "5%",
                right: "5%",
                borderRadius: 15,
                width: '90%',
                marginTop: '2%',
                padding: SIZES.padding,
                backgroundColor: COLORS.white
            }, styles.shadow]}
        >
            <View style={{ flexDirection: 'row' }}>
                <View style={[styles.shadow ,{flex: 1}]}>
                    <Image
                        source={{uri: image}}
                        resizeMode="cover"
                        style={{
                            width: 70,
                            height: 70,
                            borderRadius: 15,
                        }}
                    />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 3, justifyContent: 'space-between'}}>
                <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around' }}>
                    <Text style={{ ...FONTS.h3 }}>{productName}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{location}</Text>

                </View>
                <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around', right: '30%'}}>
                    <Text style={{ ...FONTS.h3 }}>{rentPrice}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>/{duration}</Text>

                </View>
                </View>

            </View>
            {role === 'ADMIN' &&  <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between'}}>
                <TouchableOpacity
                    style={[styles.shadow, { marginTop: SIZES.padding * 2, width: '70%', height: 50, alignItems: 'center', justifyContent: 'center' }]}
                    onPress={onApprove}
                >
                    <LinearGradient
                        style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                        colors={['#46aeff', '#5884ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>APPROVE</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>}
        </View>
        </TouchableOpacity>
    )
}



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

export  default ProductCart
