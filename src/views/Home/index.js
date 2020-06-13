import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; 

import * as Network from 'expo-network';

import api from '../../services/api';

import S from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

import { getIconByKey } from '../../utils/typeIcons';

const iconChevronCircleDown = 20, iconChevronCircleUp = 21;

export default function Home({ navigation }) {
    const [filter, setFilter] = useState('today');
    const [tasks, setTasks] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);
    const [tasksNotDone, setTasksNotDone] = useState([]);
    const [loadTasksOnProgress, setLoadTasksOnProgress] = useState(true);
    const [lateCount, setLateCount] = useState(0);
    const [macaddress, setMacaddress] = useState();
    const [isCollapsedDone, setIsCollapsedDone] = useState(true);
    const [isCollapsedNotDone, setIsCollapsedNotDone] = useState(false);

    async function getMacaddress() {
        await Network
            .getMacAddressAsync()
            .then(mac => {
                setMacaddress(mac)
            })
    }

    async function loadTasks() {
        setLoadTasksOnProgress(true);
        await api
            .get(`/task/filter/${filter}/${macaddress}`)
            .then( response => {
                setTasks(response.data);
                setTasksDone(response.data.filter(it => it.done))
                setTasksNotDone(response.data.filter(it => !it.done))
            })
            .catch( error => {
                console.error('Error loadTasks: ', error)
            });
        
        setLoadTasksOnProgress(false);
    }

    async function lateVerify() {
        await api
            .get(`/task/filter/late/${macaddress}`)
            .then( response => {
                setLateCount(response.data.length);
            })
            .catch( error => {
                console.error('Error loadTasks: ', error)
            });
    }

    function showNotification() {
        setFilter('late');
    }

    function newTask() {
        navigation.navigate('Task');
    }

    function showDetailTask(idTask) {
        navigation.navigate('Task', {idTask: idTask});
    }

    _renderTasks = listTasks => {
        return (
            listTasks.map( t => (
                <TaskCard 
                    done={t.done} 
                    type={t.type} 
                    title={t.title} 
                    when={t.when} 
                    key={t._id}
                    onPress={() => showDetailTask(t._id)} />
            ))
        )
    } 

    _renderListTask = isDone => {
        return (
            isDone ?
                _renderTasks(tasksDone)
            :
                _renderTasks(tasksNotDone)
        );
    };

    _renderIconCollapsible = isShowItems => {
        return (
            <View style={S.sectionListIcon}>
            {
                isShowItems ?
                    <FontAwesomeIcon icon={ getIconByKey(iconChevronCircleUp) } size={32} color='#EE6B26' />
                :
                    <FontAwesomeIcon icon={ getIconByKey(iconChevronCircleDown) } size={32} color='#EE6B26' />
            }
            </View>
        );
    };

    useEffect(() => {
        if (macaddress) {
            lateVerify()
            loadTasks()
        } else {
            getMacaddress();
        }
    }, [filter, macaddress])

    return (
        <View style={S.container}>
            <Header lateCount={lateCount} showNotification={showNotification} navigation={navigation}/>
            <View style={S.content}>
                <View style={S.filter}>
                    <TouchableOpacity onPress={() => setFilter('all')}>
                        <Text style={ filter == 'all' ? S.filterTextInative : S.filterTextActived }>Todos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('today')}>
                        <Text style={ filter == 'today' ? S.filterTextInative : S.filterTextActived }>Hoje</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('month')}>
                        <Text style={ filter == 'month' ? S.filterTextInative : S.filterTextActived }>Mês</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('week')}>
                        <Text style={ filter == 'week' ? S.filterTextInative : S.filterTextActived }>Semana</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFilter('year')}>
                        <Text style={ filter == 'year' ? S.filterTextInative : S.filterTextActived }>Ano</Text>
                    </TouchableOpacity>
                </View>

                <View style={S.title}>
                    <Text style={S.titleText}>
                        Tarefas { filter == 'late' && `Atrasadas`}
                    </Text>
                </View>

                {
                    loadTasksOnProgress ?
                        <ActivityIndicator color={'#EE6B26'} size={50}/>
                    :
                        <ScrollView>
                            {
                                tasks.length > 0 &&
                                <View>
                                    {
                                        tasksNotDone.length > 0 && 
                                        <View>
                                            <TouchableOpacity onPress={() => setIsCollapsedNotDone(!isCollapsedNotDone)} style={S.sectionList}>
                                                <Text style={S.sectionListLabel}>Planejadas</Text>
                                                {
                                                    _renderIconCollapsible(isCollapsedNotDone)
                                                }
                                            </TouchableOpacity>
                                            <Collapsible collapsed={isCollapsedNotDone}>
                                                {
                                                    _renderListTask(false)
                                                }
                                            </Collapsible>
                                        </View>
                                    }

                                    {
                                        tasksDone.length > 0 && 
                                        <View>
                                            <TouchableOpacity onPress={() => setIsCollapsedDone(!isCollapsedDone)} style={S.sectionList}>
                                                <Text style={S.sectionListLabel}>Concluídas</Text>
                                                {
                                                    _renderIconCollapsible(isCollapsedDone)
                                                }
                                            </TouchableOpacity>
                                            <Collapsible collapsed={isCollapsedDone}>
                                                {
                                                    _renderListTask(true)
                                                }
                                            </Collapsible>
                                        </View>
                                    }
                                </View>
                            }
                            {
                                tasks.length === 0 && <Text style={S.titleTextNoTask}>Sem tarefas por aqui ;)</Text>
                            }
                        </ScrollView>
                }
                
            </View>
            <Footer onPress={newTask}/>
        </View>
    )
}