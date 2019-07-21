import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },

    headerText: {
        textAlign: 'left', fontSize: 20, color: '#333',
        marginTop: 8, marginBottom: 6,
        paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#ddd'
    },
    
    defaultText: {
        textAlign: 'left',
        fontSize: 14,
        color: '#676767',
        marginBottom: 16,
        lineHeight: 24
    },

    subHeaderText: {
        textAlign: 'left',
        fontSize: 18,
        color: '#424242',
        marginTop: 24,
        marginBottom: 8
    },

    centeredText: {
        textAlign: 'center'
    },

    artikelCard: {
        backgroundColor: '#fff',
        padding: 0, marginTop: 10, marginBottom: 5
    },

    artikelLabel: {
        fontSize: 14,
        color: '#676767',
        marginVertical: 5,
        lineHeight: 24
    },

    mapContainer: {
        flex: 1, flexGrow: 1
    },

    mapView: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
    },

    mapLocalPosContainer: {
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, flex: 1, flexDirection: 'row',
        justifyContent: 'center', alignItems: 'center'
    },

    mapLocalPin: {
        width: 48, height: 48, marginTop: -48
    },

    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 0,
        paddingVertical: 2,
        marginBottom: 10
    }
});

export default Styles;
