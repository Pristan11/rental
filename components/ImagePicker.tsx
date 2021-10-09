import React, {useEffect, useState} from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type ImagePickerType = {
    onImageChange: (imageUrl: string) => void;
    allowsEditing?: boolean;
    aspect?: [number,number];
    style?:object
    initialImage?:string
};

export const ImagePicker = (props: ImagePickerType) => {
    const {onImageChange,initialImage, style,allowsEditing,aspect} = props;

    const [pickerImage, setPickerImage] = useState(initialImage);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    });

    const pickImage = async () => {
        const result: any = await ExpoImagePicker.launchImageLibraryAsync({
            mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
            allowsEditing: allowsEditing ? allowsEditing : true,
            aspect: aspect ? aspect : [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
            setPickerImage(result.uri);
            onImageChange(result.uri);
        }
    };

    return (
        <View >
            <Pressable onPress={pickImage}>
                <Image
                    source={pickerImage?{uri:pickerImage}:(initialImage?{uri: initialImage} :
                            require('../../assets/Images/default-placeholder-image.png')
                    )}
                    style={[styles.categoryImage,style]}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryImage: {
        borderRadius: 10,
        width: wp(60),
        height: hp(18)
    }
});
