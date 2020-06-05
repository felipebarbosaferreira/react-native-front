import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { getIconByKey, getMapIcons } from '../../utils/typeIcons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DateTimeInput from '../../components/DateTimeInput';

import S from './styles';

export default function Task() {
    const [done, setDone] = useState(false);

    function showIcons(name, index) {
        return (
            <TouchableOpacity key={index} style={S.iconTypeTask}>
                <FontAwesomeIcon icon={name} size={24} color='#FFFFFF' />
            </TouchableOpacity>
        )
    }

    return (
        <KeyboardAvoidingView behavior={"padding"} style={S.container}>
            <Header showBack={true}/>

            <ScrollView style={S.content}>

                <ScrollView 
                    style={S.iconTypeList}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} >
                    {
                        getMapIcons().map((it, index) => showIcons(it, index + 1))
                    }
                </ScrollView>

                <Text style={S.labelInput}>
                    Título
                </Text>
                <TextInput 
                    style={S.input} 
                    maxLength={20} 
                    placeholder="Lembre-me de fazer..." />

                <Text style={S.labelInput}>
                    Detalhes
                </Text>
                <TextInput 
                    style={S.inputArea} 
                    maxLength={200} 
                    multiline={true}
                    placeholder="Detalhes da atividade..." />
                
                <DateTimeInput/>
                <DateTimeInput type={'hour'}/>

                <View style={S.optionsIntoRow}>
                    <View style={S.optionSwitch}>
                        <Switch 
                            onValueChange={() => setDone(!done)}
                            value={done}
                            thumbColor={ done ? '#EE6B26' : '#707070' } />
                        <Text style={S.switchLabel}>Concluído</Text>
                    </View>

                    <TouchableOpacity>
                        <Text style={S.removeLabel} >
                            Excluir
                        </Text>
                    </TouchableOpacity>
                </View>
            
            </ScrollView>

            <Footer isSave={true}/>
        </KeyboardAvoidingView>
    )
}