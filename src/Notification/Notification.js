import React from 'react';

// components
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

// stacknavigator
import { createStackNavigator } from 'react-navigation';

import LihatLayanan from './LihatLayanan';

// styles
import Styles from '../Styles';

// Users
import * as API from '../API';
import Authentication from '../Login/Authentication';

class Index extends React.Component {
    static navigationOptions = {
        title: 'Notification'
    };

    constructor(props) {
        super(props);

        this.state = {
            pesananLayanan: []
        };
    }

    onComponentFocus = async () => {
        await this.refreshNotification();
    }

    async componentDidMount() {
        this.props.navigation.addListener('willFocus', this.onComponentFocus);

        await this.refreshNotification();
    }

    refreshNotification = async () => {
        let token = Authentication.getInstance().getUserToken();
        let result = await API.Pelayanan.cariPermintaanLayanan(token);

        if (result && result.items) {
            result.items.map((value, id) => {
                // parse data
                result.items[id].data = JSON.parse(result.items[id].data);
            });
            this.setState({pesananLayanan: result.items});
        }
    }

    getTypeName = (type) => {
        let name = 'Pelayanan';

        switch (type) {
            case '1': name = 'Bantuan Gawat Darurat'; break;
            case '2': name = 'Kunjungan Medis'; break;
            case '3': name = 'Laboratorium Darah'; break;
            case '4': name = 'Kesehatan Gigi'; break;
            case '5': name = 'Bidan Terampil'; break;
            case '6': name = 'Pendampingan Lansia'; break;
            case '7': name = 'Sanitasi dan Pengendalian Hama'; break;
            case '8': name = 'Diet dan Nutrisi'; break;
            default: break;
        }

        return name;
    }

    lihatLayanan = (id) => {
        let layanan = this.state.pesananLayanan[id];
        this.props.navigation.navigate('LihatLayanan', {
            layanan: layanan
        });
    }

    render() {
        return (
            <ScrollView style={Styles.container}>
                {
                    this.state.pesananLayanan.map((value, id) => (
                        <TouchableOpacity key={id}
                            style={{borderBottomColor: '#ddd', borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10}}
                            onPress={() => this.lihatLayanan(id)}>
                            
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 4}}>
                                {this.getTypeName(value.type)}
                            </Text>
                            <Text>Klien: {value.user}</Text>
                            {/*<Text>Lokasi: {value.data.lokasi.latitude} {value.data.lokasi.longitude}</Text>*/}

                            { value.type == API.JenisPelayanan.BANTUAN_GADAR && 
                                <View>
                                    <Text>Jenis Kejadian: {value.data.kejadian}</Text>
                                    <Text>Waktu: {value.data.waktu}</Text>
                                </View>
                            }

                            { value.type >= API.JenisPelayanan.KUNJUNGAN_MEDIS && 
                                <View>
                                    <Text>Keluhan: {value.data.keluhan}</Text>
                                    <Text>Tindakan: {value.data.tindakan}</Text>
                                    {
                                        value.type == API.JenisPelayanan.KUNJUNGAN_MEDIS &&
                                        <Text>Diagnosa: {value.data.diagnosa}</Text>
                                    }
                                    <Text>Waktu: {value.data.waktu}</Text>
                                </View>
                            }
                        </TouchableOpacity>
                    ))
                }

                <View style={{marginBottom: 10}}></View>
            </ScrollView>
        );
    }
}

const Notification = createStackNavigator({
    Index: Index,
    LihatLayanan: LihatLayanan
}, 
{
    defaultNavigationOptions: {
        headerTintColor: '#333',
        headerStyle: {
            backgroundColor: '#fff',
            elevation: 3
        },
    },
    headerMode: 'float',
    headerLayoutPreset: 'center',
    headerTransitionPreset: 'uikit',
});

export default Notification;
