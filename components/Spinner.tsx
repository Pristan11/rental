import React from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {COLORS} from '../utils/Theme';

const {height} = Dimensions.get('window');

export const Spinner = (props: any) => {
    return (
        <View style={styles.loading}>
            <View style={styles.loaderView}>
                <ActivityIndicator
                    color={COLORS.secondary}
                    size='large'
                    {...props}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        zIndex: 999,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loaderView: {
        height: height * 0.15,
        width: height * 0.15,
        backgroundColor: '#00000020',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: height * 0.02
    }
});
