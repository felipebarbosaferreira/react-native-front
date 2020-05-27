import React from 'react';
import { View, Text } from 'react-native';

import S from './styles';

import Header from '../../components/Header';

export default function Home() {
    return (
        <View style={S.container}>
            <Header/>
            <Text>
                Home view do app
            </Text>
        </View>
    )
}