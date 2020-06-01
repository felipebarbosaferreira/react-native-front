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
        padding: 16,
        paddingBottom: 0,
    },

    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    filterTextActived: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#EE6B26',
    },

    filterTextInative: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#20295F',
        opacity: 0.5,
    },
});

export default styles;