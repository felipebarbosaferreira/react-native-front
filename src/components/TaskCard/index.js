import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { format } from 'date-fns';

import S from './styles';
import { getIconByKey } from '../../utils/typeIcons';

const TaskCard = ({ done = false, type = 0, title = '', when = '', onPress }) => {
    return (
        <TouchableOpacity style={[ S.content, done && S.done ]} onPress={onPress} >
            <View style={S.card} >
                <View style={S.cardLeft} >
                    <View style={S.icon}>
                        <FontAwesomeIcon icon={ getIconByKey(type) } size={32} color='#FFFFFF' />
                    </View>
                    <Text style={S.title} numberOfLines={1} >{title}</Text>
                </View>
                <View style={S.cardRight} >
                    <Text style={S.date} >{ format(new Date(when), 'dd/MM/yyyy') }</Text>
                    <Text style={S.time} >{ format(new Date(when), 'HH:mm') }</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};

export default TaskCard;