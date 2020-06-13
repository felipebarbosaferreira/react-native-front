import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native';
import * as Network from 'expo-network';

import api from '../../services/api';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 
import { getIconByKey, getMapIcons } from '../../utils/typeIcons';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DateTimeInput from '../../components/DateTimeInput';

import S from './styles';

export default function Task({ navigation }) {
    const [idTask, setIdTask] = useState(false);
    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [when, setWhen] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState();
    const [loadTasksOnProgress, setLoadTasksOnProgress] = useState(true);
    const [deleteTasksOnProgress, setDeleteTasksOnProgress] = useState(false);

    function showIcons(name, index) {
        return (
            <TouchableOpacity 
                key={index} 
                style={S.iconTypeTask} 
                onPress={() => setType(index)}>
                    <View style={type && type !== index && S.typeIconInative}>
                        <FontAwesomeIcon icon={name} size={24} color='#FFFFFF' />
                    </View>
            </TouchableOpacity>
        )
    }

    function redirectToHome() {
        navigation.navigate('Home');
    }

    async function saveTask() {
        if (!type) return Alert.alert(`Selecione um tipo da tarefa`);
        if (!title) return Alert.alert(`Ei, qual o nome da tarefa`);
        if (!description) return Alert.alert(`E qual a descrição da tarefa`);
        if (!date) return Alert.alert(`Escolha o dia que vai ser`);
        if (!hour) return Alert.alert(`Huumm, esqueceu de colocar a hora`);

        if (idTask) {
            await api.put(`/task/${idTask}`,{
                macaddress,
                done,
                type,
                title,
                description,
                when: `${date}T${hour}.000`,
            })
            .then(() => {
                redirectToHome();
            })
            .catch((error) => {
                console.error(error);
                Alert.alert(`Algo inesperado aconteceu ao atualizar a tarefa, tente mais tarde ;)`)
            });
        } else {
            await api.post('/task',{
                macaddress,
                type,
                title,
                description,
                when: `${date}T${hour}.000`,
            })
            .then(() => {
                redirectToHome();
            })
            .catch(() => {
                Alert.alert(`Algo inesperado aconteceu, tente mais tarde ;)`)
            });
        }
    }

    async function getMacaddress() {
        await Network
            .getMacAddressAsync()
            .then(mac => {
                setMacaddress(mac);
            })
    }

    async function getTaskDetail() {
        await api
            .get(`task/${idTask}`)
            .then( response => {
                const task = response.data;
                setDone(task.done);
                setType(task.type);
                setTitle(task.title);
                setDescription(task.description);
                setWhen(task.when);
                setMacaddress(task.macaddress);
            })
            .catch( error => {
                Alert.alert(error)
            });
    }

    async function deleteTask() {
        setLoadTasksOnProgress(true)
        setDeleteTasksOnProgress(true);
        await api
            .delete(`/task/${idTask}`)
            .then(
                () => redirectToHome()
            )
            .catch(error => {
                console.error(`Error ao deletar a task. ${error}`)
            })
    }
    
    async function removeTask() {
        Alert.alert(
            'Remover tarefa',
            'Confirme a exlusão da tarefa',
            [
                { text: 'Cancelar', },
                { text: 'Confirmar', onPress: () => deleteTask()},
            ],
            { cancelable: true }
        )
    }

    useEffect(() => {
        navigation.state.params && setIdTask(navigation.state.params.idTask);
        idTask ? getTaskDetail() : getMacaddress();
        macaddress && setLoadTasksOnProgress(false);
    }, [macaddress]);

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={S.container}>
            <Header showBack={true} navigation={navigation} />

            {
                loadTasksOnProgress ?
                    <View>
                        <ActivityIndicator color={'#EE6B26'} size={50}/>
                        {
                            deleteTasksOnProgress && <Text style={S.removeLabelOnProgress}>Deletando a tarefa.</Text>
                        }
                    </View>
                :
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
                            placeholder="Lembre-me de fazer..."
                            onChangeText={(text) => setTitle(text)}
                            value={title} />

                        <Text style={S.labelInput}>
                            Detalhes
                        </Text>
                        <TextInput 
                            style={S.inputArea} 
                            maxLength={200} 
                            multiline={true}
                            placeholder="Detalhes da atividade..."
                            onChangeText={(text) => setDescription(text)}
                            value={description} />
                        
                        <DateTimeInput save={setDate} when={when}/>
                        <DateTimeInput save={setHour} when={when} type={'hour'}/>

                        {
                            idTask && 
                            <View style={S.optionsIntoRow}>
                                <View style={S.optionSwitch}>
                                    <Switch 
                                        onValueChange={() => setDone(!done)}
                                        value={done}
                                        thumbColor={ done ? '#EE6B26' : '#707070' } />
                                    <Text style={S.switchLabel}>Concluído</Text>
                                </View>

                                <TouchableOpacity onPress={removeTask}>
                                    <Text style={S.removeLabel} >
                                        Excluir
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                
                    </ScrollView>
            }
            

            <Footer isSave={true} onPress={saveTask}/>
        </KeyboardAvoidingView>
    )
}