import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 

import S from './styles';

import logo from '../../assets/logo.png';
import { getIconByKey } from '../../utils/typeIcons';

const iconBell = 4;
const iconQrCode = 15;

const Header = () => {
    return (
        <View style={S.header}>
            <TouchableOpacity style={S.leftIcon}>
                <FontAwesomeIcon icon={ getIconByKey(iconQrCode) } size={32} color='#EE6B26' />
            </TouchableOpacity>
            <Image source={logo} style={S.logo} />
            <TouchableOpacity style={S.notification}>
                <View>
                    <FontAwesomeIcon icon={ getIconByKey(iconBell) } size={32} color='#EE6B26' />
                </View>
                <View style={S.notificationCircle} >
                    <Text style={S.notificationText}>3</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Header;