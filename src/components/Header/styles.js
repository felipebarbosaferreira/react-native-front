import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100,
        backgroundColor: '#20295F',
        borderBottomWidth: 5,
        borderBottomColor: '#EE6B26',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    leftIcon: {
        left: 16,
        width: 42,
    },

    logo: {
        width: 100,
        height: 40,
    },

    notification: {
        width: 47,
        right: 26,
        height: 40,
        marginRight: -10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    notificationText: {
        color: '#EE6B26',
        fontWeight: '600',
    },

    notificationCircle: {
        width: 25,
        height: 25,
        left: -10,
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },

    iconBell: {
        position: 'absolute',
        right: 20,
    },
});

export default styles;