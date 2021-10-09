import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../utils/Theme';
import RNPickerSelect, {Item} from 'react-native-picker-select';

type PickerType = {
    placeholderLabel?: string;
    items: Item[];
    onValueChange: (value: any, index?: number) => void;
};

export const Picker = (props: PickerType) => {
    const {items, onValueChange, placeholderLabel} = props;

    return (
        <View style={{
            height: 60, backgroundColor: COLORS.gray, marginVertical: 5,
            borderRadius: 15, alignContent: 'center', justifyContent: 'center'
        }}>
            <RNPickerSelect
                placeholder={{
                    label: placeholderLabel ? placeholderLabel : 'Select',
                    value: null,
                    color: '#9EA0A4'
                }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                onValueChange={onValueChange}
                items={items}
            />
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 4,
        height: 60,
        color: COLORS.placeHolder,
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        height: 60,
        borderRadius: 8,
        color: COLORS.placeHolder,
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});
