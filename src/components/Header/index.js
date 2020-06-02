import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 

import S from './styles';

import logo from '../../assets/logo.png';
import { getIconByKey } from '../../utils/typeIcons';

// TODO - implementar file de constantes
const iconBell = 4;
const iconQrCode = 15;
const iconArrowLeft = 16;

const Header = ({ lateCount = 0, showBack = false, showNotification }) => {
    return (
        <View style={S.header}>
            { showBack
                ?
                    <TouchableOpacity style={S.leftIcon}>
                        <FontAwesomeIcon icon={ getIconByKey(iconArrowLeft) } size={32} color='#EE6B26' />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={S.leftIcon}>
                        <FontAwesomeIcon icon={ getIconByKey(iconQrCode) } size={32} color='#EE6B26' />
                    </TouchableOpacity>
            }

            <Image source={logo} style={S.logo} />

            
            <TouchableOpacity style={S.notification} onPress={showNotification}>
                { lateCount > 0 && 
                    <>
                        <View>
                            <FontAwesomeIcon icon={ getIconByKey(iconBell) } size={32} color='#EE6B26' />
                        </View>
                        <View style={S.notificationCircle} >
                            <Text style={S.notificationText}>{lateCount}</Text>
                        </View>
                    </>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Header;