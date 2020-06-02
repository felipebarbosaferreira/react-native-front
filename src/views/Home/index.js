import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ScrollView, 
    ActivityIndicator 
} from 'react-native';

import api from '../../services/api';

import S from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

export default function Home() {
    const [filter, setFilter] = useState('today');
    const [tasks, setTasks] = useState([]);
    const [loadTasksOnProgress, setLoadTasksOnProgress] = useState(false);
    const [lateCount, setLateCount] = useState(0);

    async function loadTasks() {
        setLoadTasksOnProgress(true);
        await api
            .get(`/task/filter/${filter}/00:19:B9:FB:E2:58`)
            .then( response => {
                setTasks(response.data);
            })
            .catch( error => {
                console.error('Error loadTasks: ', error)
            });
        
        setLoadTasksOnProgress(false);
    }

    async function lateVerify() {
        await api
            .get(`/task/filter/late/00:19:B9:FB:E2:58`)
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

    useEffect(() => {
        lateVerify();
        loadTasks();
    }, [filter])

    return (
        <View style={S.container}>
            <Header lateCount={lateCount} showNotification={showNotification} />
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
                                tasks.map( t => (
                                    <TaskCard 
                                        done={t.done} 
                                        type={t.type} 
                                        title={t.title} 
                                        when={t.when} 
                                        key={t._id} />
                                ))
                            }
                            {
                                tasks.length === 0 && <Text style={S.titleTextNoTask}>Sem tarefas por aqui ;)</Text>
                            }
                        </ScrollView>
                }
                
            </View>
            <Footer />
        </View>
    )
}