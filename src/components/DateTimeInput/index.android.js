import React, { useState } from 'react';
import { 
    TouchableOpacity, 
    TextInput,
    DatePickerAndroid,
    TimePickerAndroid,
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

export default function DateTimeInputAndroid({ type = 'date' }){
    const [dateTime, setDateTime] = useState();

    async function selectDate() {
        const {
            action,
            year,
            month,
            day,
        } = await DatePickerAndroid.open({mode: 'calendar'});

        if (action === DatePickerAndroid.dateSetAction) {
            setDateTime(`${day} - ${month} - ${year}`);
        }
    }

    async function selectTime() {
        const {
            action,
            hour,
            minuto,
        } = await TimePickerAndroid.open({is24Hour: true});

        if (action === TimePickerAndroid.dismissedAction) {
            setDateTime(`${hour}:${minuto}`);
        }
    }

    async function selectDateOrHour() {
        if (type === 'date') {
            selectDate();
        } else {
            selectTime();
        }
    }

    return (
        <TouchableOpacity onPress={selectDateOrHour} style={S.content}>
            <TextInput 
                style={S.input} 
                placeholder={
                    type === 'date' 
                    ? 'E que dia vai ser?'
                    : 'E a hora...'
                }
                editable={false}
                value={dateTime} />

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

};