import React, {useContext, useState,useEffect} from 'react'
import { StyleSheet, Text, View , Button} from 'react-native'
import TextInput from "./TextInput";
import Background from "./Background";
import {ImagePicker} from "./ImagePicker";
import {back} from "../constants/icons";
import {COLORS} from "../utils/Theme";
import {nameValidator} from "../helpers/nameValidator";
import {emailValidator} from "../helpers/emailValidator";
import {passwordValidator} from "../helpers/passwordValidator";
import {FirebaseContext} from "../context/FirebaseContext";
import {Toast} from "native-base";
import firebase from 'firebase/app';
import {Spinner} from "./Spinner";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Picker} from "./Picker";

const  CreatePosts = ({navigation}) =>{
    const [name, setName] = useState({ value: '', error: '' });
    const [location, setLocation] = useState({ value: '', error: '' });
    const [duration, setDuration]= useState({ value: '', error: '' });
    const [description, setDescription] = useState({ value: '', error: '' });
    const [rentPrice, setRentPrice] = useState({ value: '', error: '' });
    const [contactNumber, setContactNumber] = useState({ value: '', error: '' });
    const [category, setCategory] = useState({ value: '', error: '' });
    const [pickerImage, setPickerImage] = useState({ value: '', error: '' });
    const {storageRef, imageRef,productsRef,categoriesRef} = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);

    const [allCategories, setAllCategories] = useState([]);

    useEffect(() => {
        getCategories().then(res=> {
            console.log('categories', res);
            setAllCategories(res);
        })
    }, []);

    const getCategories = async ()=> {
        const categoriesSnapshot = await categoriesRef()
            .limit(20).get();
      return   categoriesSnapshot.docs.map((category)=> {
            return {uid: category.id, data: category.data()}
        })
    }
    const onSavePost = async ()=> {

        const nameError = nameValidator(name.value);
        const categoryError = nameValidator(category.value);
        const rentPriceError = nameValidator(rentPrice.value);
        const contactNumberError = nameValidator(contactNumber.value);
        const locationError = nameValidator(location.value);
        const durationError = nameValidator(duration.value);

        if (nameError || !pickerImage.value || categoryError || rentPriceError || contactNumberError || locationError || durationError) {
            setName({ ...name, error: nameError })
            setCategory({ ...category, error: categoryError })
            setRentPrice({ ...rentPrice, error: rentPriceError })
            setContactNumber({ ...contactNumber, error: contactNumberError })
            setLocation({ ...location, error: locationError })
            setDuration({ ...duration, error: durationError })
            setPickerImage({ ...pickerImage, error: "select image" })
        }else {
            setLoading(true);
            console.log('pickerimage', pickerImage.value, name.value);
            const blob = await fetch(pickerImage.value).then((r) => r.blob());
            return new Promise(async (res, rej) => {
                // const response = await fetch(uri);
                // const file = await response.blob();

                let upload = storageRef.child(`images/${Date.now().toString()}`).put(blob);

                upload.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {},
                    (err) => {
                        rej(err);
                    },
                    async () => {
                        const url = await upload.snapshot.ref.getDownloadURL();
                        const _product = {
                            title: name.value,
                            description: description.value,
                            imageName: url,
                            rentPrice: rentPrice.value,
                            category: category.value,
                            popular: false,
                            approved: false,
                            contactNumber: contactNumber.value,
                            location: location.value,
                            duration: duration.value
                        }
                        productsRef().add(_product).then(()=> {
                            setLoading(false);

                            navigation.navigate('Home');
                        } )
                        res(url);
                    }
                );

            })
            // const uploadTask = storageRef.child(`images/${Date.now().toString()}`).put(blob);
            // uploadTask.snapshot.ref.getMetadata().then((metadata) => {
            //     const _category = {
            //         name: name.value,
            //         imageName: metadata['name']
            //     }
            //     categoriesRef().add(_category).then(()=> {
            //         Toast.show({text: 'New categories created', type: 'success'});
            //         }
            //     )
            // })

        }
    }
    if(loading){
        return <Spinner/>
    }
    return(
        <>
            <KeyboardAwareScrollView>
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 30, paddingHorizontal: 30,
            marginHorizontal: 30, marginVertical: 30}}>
            <TextInput
                label="Name"
                returnKeyType="next"
                value={name.value}
                placeholder='Name'
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Description"
                returnKeyType="next"
                value={description.value}
                placeholder='Description'
                onChangeText={(text) => setDescription({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Rental Price"
                returnKeyType="next"
                value={rentPrice.value}
                placeholder='Rental Price'
                onChangeText={(text) => setRentPrice({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Duration"
                returnKeyType="next"
                value={duration.value}
                placeholder='Duration'
                onChangeText={(text) => setDuration({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Location"
                returnKeyType="next"
                value={location.value}
                placeholder='Location'
                onChangeText={(text) => setLocation({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput
                label="Contact Number"
                returnKeyType="next"
                value={contactNumber.value}
                placeholder='Contact Number'
                onChangeText={(text) => setContactNumber({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
            />
            <Picker
                items={allCategories.map((c) => {
                    return {label: c.data.name, value: c.data.name};
                })}
                onValueChange={(text) => setCategory({value: text, error: ''})}
                placeholderLabel='Select Category'
            />
            <View>
                <Text style={{color: COLORS.iosBlue}}> Pick Image for Category</Text>
            </View>

            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30,
                borderRadius: 8, borderColor:COLORS.black, borderWidth: 3}}>

                <ImagePicker
                    initialImage={''}
                    style={styles.categoryImage}
                    onImageChange={(imageUrl) => setPickerImage({value: imageUrl, error: ''})}/>
            </View>
            <View style={{width: 140, marginTop: 50, backgroundColor: COLORS.iosBlue}}>
                <Button title='Save' onPress={()=> onSavePost()}/>
            </View>
        </View>
            </KeyboardAwareScrollView>
        </>
    )
}
export default CreatePosts
const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: 'blue',
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})
