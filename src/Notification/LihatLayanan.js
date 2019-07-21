import React from 'react';
import { View, Image } from 'react-native';

// components
import MapView, { Marker } from 'react-native-maps';

import Styles from '../Styles';

export default class LihatLayanan extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Lihat Layanan')
        };
    };

    constructor(props) {
        super(props);

        this.layanan = props.navigation.getParam('layanan');
        this.lokasiCoord = this.layanan.data ? {
            latitude    : this.layanan.data.lokasi.latitude,
            longitude   : this.layanan.data.lokasi.longitude
        } : null;

        this.initialRegion = {
            latitude        : this.lokasiCoord ? this.lokasiCoord.latitude : -0.0257813,
            longitude       : this.lokasiCoord ? this.lokasiCoord.longitude : 109.3323449,
            latitudeDelta   : 0.1,
            longitudeDelta  : 0.05
        };

        this.state = {
            mapMargin: 1
        }
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={Styles.mapContainer}>
                    <MapView
                        style={[Styles.mapView, {marginBottom: this.state.mapMargin}]}
                        showsUserLocation={true} initialRegion={this.initialRegion}
                        ref={map => {this.mapView = map}}

                        onMapReady={() => {
                            // force update mapview
                            this.setState({mapMargin: 0});
                        }}
                    >
                        <Marker coordinate={this.lokasiCoord} />
                    </MapView>
                </View>

                { this.layanan &&
                    <View>
                        
                    </View>
                }
            </View>
        );
    }
}
