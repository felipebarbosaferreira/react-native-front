import React, { useState } from 'react';
import {
    TouchableOpacity,
    DatePickerIOS,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { getIconByKey } from '../../utils/typeIcons';

import S from './styles';


const iconCalendar = 5, iconClock = 6;

/**
 * Apresentar calendario ou hora 
 * @param {type} type = date apresenta o calendario
 * @param {type} type = time apresenta o picker do relogio
 */

 export default function DateTimeInputIos({ type = 'date' }) {
    const [dateTime, setDateTime] = useState( new Date );

    return (
        <TouchableOpacity style={S.content}>
            <DatePickerIOS 
                date={dateTime}
                mode={type}
                minimumDate={new Date}
                onDateChange={setDateTime} />

            <FontAwesomeIcon 
                icon={ 
                    type === 'date' 
                    ? getIconByKey(iconCalendar)
                    : getIconByKey(iconClock)
                } 
                size={24} 
                color='#20295F' />
        </TouchableOpacity>
    )
 }