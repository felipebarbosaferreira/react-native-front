import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import S from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Home() {
    const [filter, setFilter] = useState('today');

    return (
        <View style={S.container}>
            <Header showNotification={true} />
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

                <Text>
                    Home view do app
                </Text>
            </View>
            <Footer />
        </View>
    )
}