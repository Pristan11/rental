import React, {useContext, useState} from 'react'
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


const  CategoryForm = ({navigation}) =>{
     const [name, setName] = useState({ value: '', error: '' })
    const [pickerImage, setPickerImage] = useState({ value: '', error: '' });
    const {storageRef, imageRef,categoriesRef,categoryRef} = useContext(FirebaseContext);
    const [loading, setLoading] = useState(false);
    const onSaveCategory = async ()=> {
        console.ignoredYellowBox = ['Setting a timer'];
        const nameError = nameValidator(name.value)
        if (nameError || !pickerImage.value) {
            setName({ ...name, error: nameError })
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
                            const _category = {
                                name: name.value,
                                imageName: url
                            }
                            categoriesRef().add(_category).then(()=> {
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
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingVertical: 30, paddingHorizontal: 30,
        marginHorizontal: 30, marginVertical: 30}}>
            <TextInput
                label="Category"
                returnKeyType="next"
                value={name.value}
                placeholder='Name'
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
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
            <Button title='Save' onPress={()=> onSaveCategory()}/>
            </View>
        </View>
    )
}
export default CategoryForm
const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: 'blue',
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})
