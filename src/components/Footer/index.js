import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 

import S from './styles';
import { getIconByKey } from '../../utils/typeIcons';

const iconPlus = 17,
    iconCheck = 19;

const Footer = ({ isSave = false, onPress }) => { 
    return (
        <View style={S.container}>
            <View style={S.backgroudButton} />
            <TouchableOpacity style={S.icon} onPress={onPress}>
                <FontAwesomeIcon icon={ isSave ? getIconByKey(iconCheck) : getIconByKey(iconPlus)} size={62} color='#FFFFFF' />
            </TouchableOpacity>

            <Text style={S.text}>
                Organizando a sua vida - Felipe Barbosa
            </Text>

        </View>
    )
};

export default Footer;