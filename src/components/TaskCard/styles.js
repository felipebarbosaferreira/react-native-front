import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        height: 80,
        marginTop: 10,
        marginBottom: 15,
        marginHorizontal: 16,
    },

    done: {
        opacity: 0.5,
    },

    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000000',
        padding: 10,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 10,
    },

    cardLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    cardRight: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    
    icon: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#EE6B26',
        marginRight: 10,
    },
    
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#EE6B26',
    },
    
    time: {
        color: '#707070',
    },
});

export default styles;