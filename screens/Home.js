
import React,{useState} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import ProductCart from "../components/ProductCart";

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
    const [numbers, setNumbers] = useState([
        {productOwner: 'Ristan',
            productName: 'dell',
            rentPrice: '5000',
            location:'jaffna',
            duration: 'month',
            contactNumber: '0772551614',
            description: 'good for building ',
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',

        },
        {productOwner: 'kalistan',
            productName: 'linova',
            rentPrice: '5000',
            location:'jaffna',
            duration: 'day',
            contactNumber: '0772551614',
            description: 'good for building ',
            image: 'https://images.unsplash.com/photo-1553456558-aff63285bdd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
        },
        {productOwner: 'Thanu',
            productName: 'Toshipha',
            rentPrice: '5000',
            location:'jaffna',
            duration: 'month',
            contactNumber: '0772551614',
            description: 'good for building ',
image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=428&q=80'
        },
        {productOwner: 'John',
            productName: 'samsung',
            rentPrice: '5000',
            location:'jaffna',
            duration: 'week',
            contactNumber: '0772551614',
            description: 'good for building ',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80'
        }
    ]);
    // Dummy Data
    const [destinations, setDestinations] = React.useState([
        {
            id: 0,
            name: "Ski Villa",
            img: images.skiVilla,
        },
        {
            id: 1,
            name: "Climbing Hills",
            img: images.climbingHills,
        },
        {
            id: 2,
            name: "Frozen Hills",
            img: images.frozenHills,
        },
        {
            id: 3,
            name: "Beach",
            img: images.beach,
        },
    ]);

    // Render

    function renderDestinations(item, index) {
        var destinationStyle = {};

        if (index == 0) {
            destinationStyle = { marginLeft: SIZES.padding, }
        }

        return (
            <TouchableOpacity
                style={{ justifyContent: 'center', marginHorizontal: SIZES.base, ...destinationStyle }}
                onPress={() => { navigation.navigate("DestinationDetail") }}
            >
                <Image
                    source={item.img}
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

    return (
        <View style={styles.container}>
            {/* Banner */}
            {/*<View style={{ flex: 1, marginTop: SIZES.base, paddingHorizontal: SIZES.padding, }}>*/}
            {/*    <Image*/}
            {/*        source={images.homeBanner}*/}
            {/*        resizeMode="cover"*/}
            {/*        style={{*/}
            {/*            width: "100%",*/}
            {/*            height: "100%",*/}
            {/*            borderRadius: 15,*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</View>*/}

            {/* Options */}
            {/*<View style={{ flex: 1, justifyContent: 'center' }}>*/}
            {/*    <View style={{ flexDirection: 'row', marginTop: SIZES.padding, paddingHorizontal: SIZES.base }}>*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.airplane}*/}
            {/*            bgColor={['#46aeff', '#5884ff']}*/}
            {/*            label="Flight"*/}
            {/*            onPress={() => { console.log("Flight") }}*/}
            {/*        />*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.train}*/}
            {/*            bgColor={['#fddf90', '#fcda13']}*/}
            {/*            label="Train"*/}
            {/*            onPress={() => { console.log("Train") }}*/}
            {/*        />*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.bus}*/}
            {/*            bgColor={['#e973ad', '#da5df2']}*/}
            {/*            label="Bus"*/}
            {/*            onPress={() => { console.log("Bus") }}*/}
            {/*        />*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.taxi}*/}
            {/*            bgColor={['#fcaba8', '#fe6bba']}*/}
            {/*            label="Taxi"*/}
            {/*            onPress={() => { console.log("Taxi") }}*/}
            {/*        />*/}
            {/*    </View>*/}

            {/*    <View style={{ flexDirection: 'row', marginTop: SIZES.radius, paddingHorizontal: SIZES.base }}>*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.bed}*/}
            {/*            bgColor={['#ffc465', '#ff9c5f']}*/}
            {/*            label="Hotel"*/}
            {/*            onPress={() => { console.log("Hotel") }}*/}
            {/*        />*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.eat}*/}
            {/*            bgColor={['#7cf1fb', '#4ebefd']}*/}
            {/*            label="Eats"*/}
            {/*            onPress={() => { console.log("Eats") }}*/}
            {/*        />*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.compass}*/}
            {/*            bgColor={['#7be993', '#46caaf']}*/}
            {/*            label="Adventure"*/}
            {/*            onPress={() => { console.log("Adventure") }}*/}
            {/*        />*/}
            {/*        <OptionItem*/}
            {/*            icon={icons.event}*/}
            {/*            bgColor={['#fca397', '#fc7b6c']}*/}
            {/*            label="Event"*/}
            {/*            onPress={() => { console.log("Event") }}*/}
            {/*        />*/}
            {/*    </View>*/}
            {/*</View>*/}

            {/* Destination */}
            <View style={{ height: '25%'}}>
                <View  style={{ height: '15%'}}/>
                {/*<Text style={{ marginTop: SIZES.base, marginHorizontal: SIZES.padding, ...FONTS.h2 }}>Destination</Text>*/}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={destinations}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => renderDestinations(item, index)}
                />
            </View>
            <ScrollView style={{marginTop: '10%'}}>
                {numbers.map((num, index)=> {
                    return (
                        <ProductCart
                        data={num}
                        productOwner={num.productOwner}
                        productName={num.productName}
                        location={num.location}
                        rentPrice={num.rentPrice}
                        duration={num.duration}
                        id={index}
                        navigation={navigation}
                        />
                    )
                })}
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
