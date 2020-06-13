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

    filter: {
        padding: 16,
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

    title: {
        top: -10,
        borderBottomWidth: 1,
        borderColor: '#20295F',
        alignItems: 'center',
        marginVertical: 10,
    },

    titleText: {
        fontSize: 18,
        color: '#20295F',
        backgroundColor: '#FFFFFF',
        top: 10,
        paddingHorizontal: 10,
    },

    titleTextNoTask: {
        fontSize: 18,
        color: '#20295F',
        alignSelf: 'center',
    },

    sectionList: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F8FF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 3,
    },

    sectionListLabel: {
        fontSize: 15,
        color: '#20295F',
        minWidth: 30,
    },

    sectionListIcon: {
    },
});

export default styles;