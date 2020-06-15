import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },

    content: {
        flex: 1,
        paddingBottom: 0,
    },

    barCodeScanner: {
        height: '100%',
        top: -10,
    },

    infoView: {
        top: -150,
        height: 70,
        display: 'flex',
        alignItems: 'center',
    },

    labelText: {
        backgroundColor: '#20295F',
        padding: 16,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    buttons: {
        top: -150,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 16,
    },

    buttonBack: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EE6B26',
        flexGrow: 1,
        height: 30,
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
    },

    buttonScanAgain: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        flexGrow: 1,
        height: 30,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
    },

    buttonScanAgainInactive: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#707070',
        flexGrow: 1,
        height: 30,
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
    },

    labelButton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    infoToSynchronize: {
        display: 'flex',
        alignItems: 'center',
        margin: 16,
    },

    infoToSynchronizeText: {
        color: '#20295F',
    },

    infoToSynchronizeCode: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#EEEEEE',
        fontWeight: 'bold',
        color: '#20295F',
        letterSpacing: 3,
        fontSize: 18,
    },
});

export default styles;