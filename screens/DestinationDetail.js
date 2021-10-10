
import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';

const StarReview = ({ rate }) => {
    var starComponents = [];
    var fullStar = Math.floor(rate)
    var noStar = Math.floor(5 - rate)
    var halfStar = 5 - fullStar - noStar

    // Full Star
    for (var i = 0; i < fullStar; i++) {
        starComponents.push(
            <Image
                key={`full-${i}`}
                source={icons.starFull}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    // Half Star
    for (var i = 0; i < halfStar; i++) {
        starComponents.push(
            <Image
                key={`half-${i}`}
                source={icons.starHalf}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    // No Star
    for (var i = 0; i < noStar; i++) {
        starComponents.push(
            <Image
                key={`empty-${i}`}
                source={icons.starEmpty}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {starComponents}
            <Text style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{rate}</Text>
        </View>
    )
}

const IconLabel = ({ icon, label }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: 50,
                    height: 50,
                }}
            />
            <Text style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}>{label}</Text>
        </View>
    )
}

const DestinationDetail = ({ navigation, route }) => {
const { productName, rentPrice, location, data,id, duration, imageName ,onApprove, role, description, contactNumber} = route.params.data.data;
    // Render
    const [showContactNumber, setShowContactNumber] = useState(false);
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={{ flex: 2 }}>
                <Image
                    source={{uri: imageName}}
                    resizeMode="cover"
                    style={{
                        width: '100%',
                        height: '80%',
                    }}
                />
                <View
                    style={[{

                        position: 'absolute',
                        bottom: "-20%",
                        left: "5%",
                        right: "5%",
                        borderRadius: 15,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.white
                    }, styles.shadow]}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.shadow}>
                            <Image
                                source={{uri: imageName}}
                                resizeMode="cover"
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 15,
                                }}
                            />
                        </View>

                        <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around' }}>
                            <Text style={{ ...FONTS.h3 }}>{productName}</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>{location}</Text>

                            <StarReview
                                rate={4.5}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: SIZES.radius }}>
                        <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                            {description}
                        </Text>
                    </View>
                </View>

                {/* Header Buttons */}
                <View
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 20,
                        right: 20,
                        //height: 50,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Home') }}
                        >
                            <Image
                                source={icons.back}
                                resizeMode="cover"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { console.log("Menu on pressed") }}
                        >
                            <Image
                                source={icons.menu}
                                resizeMode="cover"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Body */}
            <View style={{ flex: 1.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end',
            marginTop: '-3%'}}>
                {/* Icons */}
                {/*<View style={{ flexDirection: 'row', marginTop: SIZES.base, paddingHorizontal: SIZES.padding * 2, justifyContent: 'space-between' }}>*/}
                {/*    <IconLabel*/}
                {/*        icon={icons.villa}*/}
                {/*        label="Villa"*/}
                {/*    />*/}

                {/*    <IconLabel*/}
                {/*        icon={icons.parking}*/}
                {/*        label="Parking"*/}
                {/*    />*/}

                {/*    <IconLabel*/}
                {/*        icon={icons.wind}*/}
                {/*        label="4 °C"*/}
                {/*    />*/}
                {/*</View>*/}

                {/* About */}
                <View style={{ marginTop: SIZES.padding, paddingHorizontal: SIZES.padding }}>
                    <Text style={{ ...FONTS.h2 }}>About</Text>
                    <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                        {description}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View style={{ flex: 0.5, paddingHorizontal: SIZES.padding, marginTop: '5%' }}>
                <LinearGradient
                    style={[{ height: 70, width: '100%', borderRadius: 15 }]}
                    colors={['#edf0fc', '#d6dfff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    {showContactNumber?
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 1, marginHorizontal: SIZES.padding, justifyContent: 'center' }}>
                                <Text style={{ fontFamily: "Roboto-Black",fontSize: 22 }}>{contactNumber}</Text>
                            </View>

                            <TouchableOpacity
                                style={{ width: 130, height: '80%', marginHorizontal: SIZES.radius }}
                                onPress={() => setShowContactNumber(!showContactNumber)}
                            >
                                <LinearGradient
                                    style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }]}
                                    colors={['#46aeff', '#5884ff']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Hide</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        :
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, marginHorizontal: SIZES.padding, justifyContent: 'center' }}>
                            <Text style={{ fontFamily: "Roboto-Black",fontSize: 22 }}>Rs {rentPrice}
                                <Text style={styles.durationStyle}>  /{duration}</Text></Text>
                        </View>

                        <TouchableOpacity
                            style={{ width: 130, height: '80%', marginHorizontal: SIZES.radius }}
                            onPress={() => setShowContactNumber(!showContactNumber)}
                        >
                            <LinearGradient
                                style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }]}
                                colors={['#46aeff', '#5884ff']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Contact</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>}
                </LinearGradient>
            </View>
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
    },
    durationStyle: {
        fontSize: 14,
        color: COLORS.gray
    }
});

export default DestinationDetail;
