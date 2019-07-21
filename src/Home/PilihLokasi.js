import React from 'react';
import { View, Image, Text } from 'react-native';

// components
import MapView from 'react-native-maps';
import Button from '../Components/Button';

import Styles from '../Styles';

export default class PilihLokasi extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Pilih Lokasi')
        };
    };

    constructor(props) {
        super(props);

        this.onLokasiDipilih = props.navigation.getParam('onLokasiDipilih');
        this.initialRegion = props.navigation.getParam('initialRegion');
        this.initialRegion = this.initialRegion ? this.initialRegion : {
            latitude: -0.0257813,
            longitude: 109.3323449,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05
        };

        this.state = {
            mapMargin: 1,
            firstUpdate: true,
            userRegion: {
                latitude        : 0.0,
                longitude       : 0.0,
                latitudeDelta   : this.initialRegion.latitudeDelta,
                longitudeDelta  : this.initialRegion.longitudeDelta
            },
            address: null,
        }
    }

    onPilihLokasi = () => {
        this.onLokasiDipilih && this.onLokasiDipilih(this.state.userRegion);
        this.props.navigation.goBack();
    }

    getAddressName = async (latitude, longitude) => {
        try {
            let url = "http://open.mapquestapi.com/geocoding/v1/reverse?key=UwgVEyBKGHhexJZ4MAWi39IqSIqGXWsv";
            url = url + "&location=" + latitude + "," + longitude;

            console.log(latitude, ", ", longitude);

            let response = await fetch(url, {method: 'GET'});

            //console.log(response);

            let result = await response.json();

            if (result) {
                let location = result.results[0].locations[0];
                let street = location.street;
                let city = location.adminArea5;
                let state = location.adminArea3;
                let country = location.adminArea1;
                return `${street}, ${city}, ${state}, ${country}`;
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    userRegionChanged = async (region) => {
        this.setState({userRegion: region});

        let address = await this.getAddressName(region.latitude, region.longitude);
        this.setState({address: address});
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={Styles.mapContainer}>
                    <MapView
                        style={[Styles.mapView, {marginBottom: this.state.mapMargin}]}
                        showsUserLocation={true} followsUserLocation={true}
                        initialRegion={this.initialRegion}
                        ref={map => {this.mapView = map}}

                        onMapReady={() => {
                            // force update mapview
                            this.setState({mapMargin: 0});
                        }}

                        onUserLocationChange={(event) => {
                            let coordinate = event.nativeEvent.coordinate;

                            if (this.state.firstUpdate) {
                                this.mapView.animateToRegion({
                                    latitude        : coordinate.latitude,
                                    longitude       : coordinate.longitude,
                                    latitudeDelta   : 0.01,
                                    longitudeDelta  : 0.005
                                });
                                this.setState({firstUpdate: false});
                            }
                        }}

                        onRegionChangeComplete={this.userRegionChanged}
                    />

                    <View style={Styles.mapLocalPosContainer}>
                        <Image source={require('../../assets/pins/pin.png')} style={Styles.mapLocalPin} />
                    </View>
                </View>

                <View>
                    <Text>{this.state.address}</Text>
                    <Button
                        title="PILIH LOKASI SEKARANG"
                        style={{backgroundColor: '#5db733', borderWidth: 0, paddingVertical: 22}}
                        textStyle={{fontWeight: 'bold', color: '#fff'}}
                        centered={true}
                        onPress={this.onPilihLokasi}
                    />
                </View>
            </View>
        );
    }
}
