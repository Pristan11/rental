import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/Theme';
import * as React from 'react';

export const TabBarIcon = (name: string, focused: any) => {
    return <MaterialCommunityIcons
        color={focused?.focused ? COLORS.iosBlue : `${COLORS.gray}99`}
        name={name} size={30}/>;
};

