import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 

import S from './styles';
import { getIconByKey } from '../../utils/typeIcons';

const TaskCard = ({ done = false, }) => {
    return (
        <TouchableOpacity style={[ S.content, done && S.done ]} >
            <View style={S.card} >
                <View style={S.cardLeft} >
                    <View style={S.icon}>
                        <FontAwesomeIcon icon={ getIconByKey(7) } size={32} color='#FFFFFF' />
                    </View>
                    <Text style={S.title} >Fazer o card</Text>
                </View>
                <View style={S.cardRight} >
                    <Text style={S.date} >01/06/2020</Text>
                    <Text style={S.time} >20:01</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    )
};

export default TaskCard;