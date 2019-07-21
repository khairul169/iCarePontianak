import React from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';

// components
import MapView, { Marker } from 'react-native-maps';
import Button from '../Components/Button';

import Styles from '../Styles';

// screen size
const Window = Dimensions.get('window');

export default class KonfirmasiLayanan extends React.Component {
    static navigationOptions = {
        title: 'Konfirmasi Layanan'
    };

    constructor(props) {
        super(props);

        this.initialRegion = {
            latitude: -0.0257813,
            longitude: 109.3323449,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05
        };

        let lokasiMap = this.props.navigation.getParam('lokasiMap', null);

        this.lokasi = {
            latitude: lokasiMap ? lokasiMap.latitude : -0.0257813,
            longitude: lokasiMap ? lokasiMap.longitude : 109.3323449,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005
        }

        this.state = {
        }
    }
    
    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <MapView style={{elevation: 1}}
                    style={{height: Window.height * 0.4}}
                    initialRegion={this.initialRegion}
                    ref={map => {this.mapView = map}}
                    scrollEnabled={false} zoomEnabled={true}
                    rotateEnabled={false} pitchEnabled={false}

                    onMapReady={() => {
                        this.mapView.animateToRegion(this.lokasi);
                    }}>
                    
                    <Marker
                        coordinate={this.lokasi} />
                </MapView>

                <View style={[Styles.container, {elevation: 1}]}>
                    <Text style={[Styles.subHeaderText, {marginTop: 0}]}>Jenis Pelayanan</Text>
                    <Text style={Styles.defaultText}>Kunjungan Medis</Text>
                    
                    <Text style={Styles.subHeaderText}>Keluhan Utama</Text>
                    <Text style={Styles.defaultText}>Mual-mual</Text>
                    
                    <Text style={Styles.subHeaderText}>Tindakan</Text>
                    <Text style={Styles.defaultText}>Injeksi</Text>
                    
                    <Text style={Styles.subHeaderText}>Diagnosa Medis</Text>
                    <Text style={Styles.defaultText}>-</Text>
                    
                    <Text style={Styles.subHeaderText}>Waktu Pelayanan</Text>
                    <Text style={Styles.defaultText}>22 Mei 2019 23:07</Text>
                </View>

                <Button title="Konfirmasi"
                    centered={true}
                    style={{marginTop: 20, backgroundColor: '#6ab237', borderWidth: 0}}
                    textStyle={{color: '#fff'}}
                    onPress={() => {}} />
            </ScrollView>
        );
    }
}
