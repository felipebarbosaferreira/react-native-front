import React, { useState, useEffect } from 'react';
import { 
    TouchableOpacity, 
    TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { getIconByKey } from '../../utils/typeIcons';

import S from './styles';

const DATE = 'date';
const TIME = 'time';
const CALENDAR = 'calendar';
const CLOCK = 'clock';
const ICON_CALENDAR = 5, ICON_CLOCK = 6;
const DATE_FORMAT_TO_USER = 'dd / MM / yyyy';
const DATE_FORMAT_TO_MONGODB = 'yyyy-MM-dd';
const TIME_FORMAT_TO_USER = 'HH:mm';
const TIME_FORMAT_TO_MONGODB = 'HH:mm:ss';

/**
 * Apresentar calendario ou hora 
 * @param {type} type = DATE apresenta o calendario
 * @param {type} type = TIME apresenta o picker do relogio
 */

export default function DateTimeInput({ type = DATE, save, when }){
    const [dateTime, setDateTime] = useState();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    function selectDate() {
        setDateTime(format(new Date(date), DATE_FORMAT_TO_USER));
        save(format(new Date(date), DATE_FORMAT_TO_MONGODB));
    }

    function selectTime() {
        setDateTime(format(new Date(date), TIME_FORMAT_TO_USER));
        save(format(new Date(date), TIME_FORMAT_TO_MONGODB));
    }

    function showPicker() {
        setShow(true);
    }

    const isShowDate = () => {
        return type === DATE;
    }

    const onChange = (event, selectedDate) => {
        setShow(false);

        if (!selectedDate) {
            return;
        }

        setDateTime(selectedDate);
        setDate(selectedDate);
    }

    const applyValueSelected = () => {
        if (isShowDate()) {
            selectDate();
        } else {
            selectTime();
        }
    }

    function setDateTimeFromTaskToEdit() {
        if (isShowDate()) {
            setDateTime(format(new Date(when), DATE_FORMAT_TO_USER));
            save(format(new Date(when), DATE_FORMAT_TO_MONGODB));
        } else {
            setDateTime(format(new Date(when), TIME_FORMAT_TO_USER));
            save(format(new Date(when), TIME_FORMAT_TO_MONGODB));
        }
    }

    useEffect(() => {
        setShow(Platform.OS === 'ios');
        when && setDateTimeFromTaskToEdit();
        dateTime && applyValueSelected();
    }, [when, date])

    return (
        <TouchableOpacity onPress={showPicker} style={S.content}>
            {
                show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={ isShowDate() ? DATE : TIME }
                        is24Hour={true}
                        display={ isShowDate() ? CALENDAR : CLOCK }
                        onChange={onChange}
                        minimumDate={new Date()}
                    />
                )
            }
            <TextInput 
                style={S.input} 
                placeholder={
                    isShowDate() 
                    ? 'E que dia vai ser?'
                    : 'E a hora...'
                }
                editable={false}
                value={dateTime}
            /> 

            <FontAwesomeIcon 
                icon={ 
                    isShowDate() 
                    ? getIconByKey(ICON_CALENDAR)
                    : getIconByKey(ICON_CLOCK)
                } 
                size={24} 
                color='#20295F'
            />
        </TouchableOpacity>
    )
};