import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as NetWork from 'expo-network';

import S from './styles';

import Header from '../../components/Header';

const HAS_PERMISSION_TO_USE_BAR_CODE_SCANNER = 'granted';

export default function QrCode({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [macaddress, setMacaddress] = useState();
    const [mac, setMac] = useState(true);

    async function getMacaddress() {
        await NetWork
            .getMacAddressAsync()
            .then(mac => setMac(mac))
            .catch(error => {
                console.log(`Erro ao obter o macaddress no QrCode`);
            })
    }

    async function verifyPermissionBarCodeScanner() {
        const { status } = await BarCodeScanner.getPermissionsAsync();
        setHasPermission(status === HAS_PERMISSION_TO_USE_BAR_CODE_SCANNER);
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        if (data === 'getmacaddress') {
            getMacaddress();
        } else {
            Alert.alert('QrCode inválido, tente novamente.')
        }
    };

    function goToHome() {
        navigation.navigate('Home');
    }

    useEffect(() => {
        verifyPermissionBarCodeScanner();
        setMac(false);
    }, [macaddress, scanned]);
    
    return (
        <View style={S.container}>
            <Header showBack={true} navigation={navigation}/>
            <View style={S.content}>
                <Text style={S.labelText}>
                    Conectar com a minha conta na web
                </Text>
                {
                    mac &&
                    <View style={S.infoToSynchronize}>
                        <Text style={S.infoToSynchronizeText}>
                            Use o código abaixo para sincronizar.
                        </Text>
                        <Text style={S.infoToSynchronizeCode}>
                           {mac}
                        </Text>
                    </View>
                }
                <BarCodeScanner 
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={S.barCodeScanner} />
                <View style={S.buttons}>
                    <TouchableOpacity onPress={goToHome} style={S.buttonBack}>
                        <Text style={S.labelButton}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setScanned(false)}  style={scanned ? S.buttonScanAgain : S.buttonScanAgainInactive}>
                        <Text style={S.labelButton}>Scan novamente</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}