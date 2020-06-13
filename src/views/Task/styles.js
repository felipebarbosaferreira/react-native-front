import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
    },

    content: {
        flex: 1,
    },

    iconTypeList: {
    },

    iconTypeTask: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 42,
        width: 42,
        margin: 10,
        backgroundColor: '#EE6B26',
        borderRadius: 25,
    },

    labelInput: {
        color: '#707070',
        fontSize: 16,
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 5,
    },

    input: {
        fontSize: 18,
        padding: 10,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EE6B26',
    },

    inputArea: {
        height: 100,
        fontSize: 18,
        padding: 10,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#EE6B26',
        borderRadius: 10,
        textAlignVertical: 'top',
    },

    optionsIntoRow: {
        marginTop: 20,
        marginBottom: 50,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    optionSwitch: {
        flexDirection: 'row',
    },

    switchLabel: {
        fontWeight: 'bold',
        color: '#EE6B26',
        textTransform: 'uppercase',
        fontSize: 16,
    },

    removeLabel: {
        fontWeight: 'bold',
        color: '#20295F',
        textTransform: 'uppercase',
        fontSize: 16,
    },

    typeIconInative: {
        opacity: 0.5,
    },

    removeLabelOnProgress: {
        fontWeight: 'bold',
        color: '#20295F',
        fontSize: 16,
        marginTop: 20,
        alignSelf: 'center',
    },

});

export default style;