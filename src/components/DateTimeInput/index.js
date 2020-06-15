import React, { useState, useEffect } from 'react';
import { 
    TouchableOpacity, 
    TextInput,
    View,
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
    const [dateHasSelected, setDateHasSelected] = useState(false);
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

        setDateHasSelected(true);
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

    _renderIcon = () => {
        return (
            <FontAwesomeIcon 
                icon={ 
                    isShowDate() 
                    ? getIconByKey(ICON_CALENDAR)
                    : getIconByKey(ICON_CLOCK)
                } 
                size={24} 
                color='#20295F'
            />
        );
    };

    _renderDateTimePicker = () => {
        return (
            <View>
                <DateTimePicker
                    testID="dateTimePicker"
                    textColor="#20295F"
                    value={date}
                    mode={ isShowDate() ? DATE : TIME }
                    is24Hour={true}
                    display={ isShowDate() ? CALENDAR : CLOCK }
                    onChange={onChange}
                    minimumDate={new Date()}
                    style={{width: '100%', backgroundColor: '#F8F8FF'}}
                />
            </View>
        );
    };

    useEffect(() => {
        setShow(Platform.OS === 'ios');
        when && setDateTimeFromTaskToEdit();
        dateHasSelected && applyValueSelected();
    }, [when, date])

    return (
        Platform.OS === 'ios' 
        ?
            <View style={S.content}>
                {
                    show && _renderDateTimePicker()
                }
                {
                    _renderIcon()
                }
            </View>
        :
            <TouchableOpacity onPress={showPicker} style={S.content}>
                {
                    show && _renderDateTimePicker()
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
                {
                    _renderIcon()
                }
            </TouchableOpacity>
    )
};