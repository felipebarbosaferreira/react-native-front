import React, { useState, useEffect } from 'react';
import { 
    TouchableOpacity, 
    TextInput,
    DatePickerAndroid,
    TimePickerAndroid,
    Alert,
} from 'react-native';
import { format, isPast, } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { getIconByKey } from '../../utils/typeIcons';

import S from './styles';


const iconCalendar = 5, iconClock = 6;

/**
 * Apresentar calendario ou hora 
 * @param {type} type = date apresenta o calendario
 * @param {type} type = time apresenta o picker do relogio
 */

export default function DateTimeInputAndroid({ type = 'date', save, when }){
    const [dateTime, setDateTime] = useState();

    async function selectDate() {
        const {
            action,
            year,
            month,
            day,
        } = await DatePickerAndroid.open({mode: 'calendar'});

        if (action === DatePickerAndroid.dateSetAction) {
            const dateSelected = new Date(year, month, day, 23, 59, 0, 0);
            
            if (isPast(dateSelected)) {
                return Alert.alert('Não pode selecionar uma data passada.')
            }

            setDateTime(`${day} / ${month} / ${year}`);
            save(format(dateSelected, 'yyyy-MM-dd'));
        }
    }

    async function selectTime() {
        const {
            action,
            hour,
            minute,
        } = await TimePickerAndroid.open({is24Hour: true});

        if (action === TimePickerAndroid.timeSetAction) {
            setDateTime(`${hour}:${minute}`);
            save(format(new Date(2020, 1, 1, hour, minute, 0, 0), 'HH:mm:ss'));
        }
    }

    async function selectDateOrHour() {
        if (type === 'date') {
            selectDate();
        } else {
            selectTime();
        }
    }

    function setDateTimeFromTaskToEdit() {
        if (type === 'date') {
            setDateTime(format(new Date(when), 'dd / MM / yyyy'));
            save(format(new Date(when), 'yyyy-MM-dd'));
        } else {
            setDateTime(format(new Date(when), 'HH:mm'));
            save(format(new Date(when), 'HH:mm:ss'));
        }
    }

    useEffect(() => {
        when && setDateTimeFromTaskToEdit();
    }, [when])

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