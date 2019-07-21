import React from 'react';
import { View, Text, Image, TouchableOpacity, ToastAndroid } from 'react-native';

// components
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';
import Button from '../../Components/Button';

import Styles from '../../Styles';

// API
import * as API from '../../API';
import Authentication from '../../Login/Authentication';

export default class PanggilBantuan extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Panggil Bantuan')
        };
    };

    constructor(props) {
        super(props);

        this.onBantuanDibuat = props.navigation.getParam('onBantuanDibuat');
        this.mainNavigation = props.navigation.getParam('mainNavigation');

        this.initialRegion = {
            latitude: -0.0257813,
            longitude: 109.3323449,
            latitudeDelta: 0.1,
            longitudeDelta: 0.05,
        }

        this.jenisKejadian = [
            {id: 'kecelakaan', label: 'Kecelakaan Lalu Lintas'},
            {id: 'kebakaran', label: 'Kebakaran'},
            {id: 'stroke', label: 'Stroke'},
            {id: 'chf', label: 'Gagal Jantung / Henti Nafas'},
            {id: 'lain', label: 'Lain-lain'}
        ];

        this.state = {
            mapMargin: 1,
            firstUpdate: true,
            spinner: false,
            gpsRegion: {
                latitude: 0.0,
                longitude: 0.0,
                accuracy: 0.0
            },
            userRegion: {
                latitude: 0.0,
                longitude: 0.0
            },
            jenisKejadian: null
        }
    }

    onJenisKejadian = (index) => {
        this.setState({jenisKejadian: index});
    }

    cariBantuan = async () => {
        if (this.state.spinner) {
            return;
        }
        
        this.setState({spinner: true});
        
        let result = await API.Pelayanan.buatPermintaanLayanan(Authentication.getInstance().getUserToken(),
            API.JenisPelayanan.BANTUAN_GADAR,
        {
            kejadian    : this.state.jenisKejadian,
            lokasi      : this.state.userRegion,
            gps         : this.state.gpsRegion
        });
        
        this.setState({spinner: false});
        
        if (result) {
            if (result.status === API.OK) {
                this.props.navigation && this.props.navigation.goBack();
                ToastAndroid.show(result.message, ToastAndroid.LONG);
                this.mainNavigation && this.mainNavigation.navigate('Notification');
            } else {
                alert(result.message);
            }
        } else {
            alert('Gagal meminta bantuan! Harap coba beberapa saat lagi.');
        }
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <Spinner
                    visible={this.state.spinner} cancelable={false}
                    textContent='Loading...' textStyle={{color: '#fff', fontSize: 14}} />
                
                <View style={Styles.mapContainer}>
                    <MapView style={[Styles.mapView, {marginBottom: this.state.mapMargin}]}
                        showsUserLocation={true} followsUserLocation={true}
                        initialRegion={this.initialRegion}

                        ref={map => {this.mapView = map}}

                        onMapReady={() => {
                            // force update mapview
                            this.setState({mapMargin: 0});
                        }}

                        onRegionChangeComplete={(region) => {
                            this.setState({userRegion: {
                                latitude: region.latitude,
                                longitude: region.longitude
                            }});
                        }}

                        onUserLocationChange={(event) => {
                            let coordinate = event.nativeEvent.coordinate;

                            this.setState({gpsRegion: {
                                latitude: coordinate.latitude,
                                longitude: coordinate.longitude,
                                accuracy: coordinate.accuracy
                            }});

                            if (this.state.firstUpdate) {
                                this.mapView.animateToRegion({
                                    latitude: coordinate.latitude,
                                    longitude: coordinate.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.002
                                });
                                this.setState({firstUpdate: false});
                            }
                        }}
                    />

                    <View style={Styles.mapLocalPosContainer}>
                        <Image source={require('../../../assets/pins/pin.png')} style={Styles.mapLocalPin} />
                    </View>

                    <Text style={{fontSize: 14, color: '#111', position: 'absolute', top: 10, left: 10}}>
                        Akurasi: {Math.round(this.state.gpsRegion.accuracy)} meter
                    </Text>
                </View>

                <View style={{backgroundColor: '#fff', borderTopColor: '#ddd', borderTopWidth: 1}}>
                    {/*<Picker 
                        ref={instance => this.kejadianPicker = instance}
                        data={this.jenisKejadian} label={'label'} value={'id'}
                        onValueChange={(value) => {
                            let kejadian = value;
                            this.jenisKejadian.map((data, id) => {
                                if (data.id === value) {
                                    kejadian = data.label;
                                }
                            });

                            this.setState({jenisKejadian: kejadian});
                        }}
                    />*/}

                    <View style={{padding: 16}}>
                        <Text style={{fontSize: 12, marginTop: 4, color: '#626262'}}>Jenis Kejadian:</Text>
                        {
                            this.state.jenisKejadian !== null ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.kejadianPicker.setModalVisible(true);
                                    }}
                                >
                                    <Text style={{fontSize: 14, marginTop: 4, color: '#333'}}>
                                        {this.state.jenisKejadian}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <Button
                                    title="Pilih Jenis Kejadian"
                                    style={{paddingVertical: 16, marginTop: 10}} centered={true}
                                    onPress={() => {
                                        this.kejadianPicker.setModalVisible(true);
                                    }}
                                />
                            )
                        }
                    </View>

                    <Button
                        title="Cari Bantuan"
                        style={{backgroundColor: '#e04543', borderWidth: 0, paddingVertical: 22}}
                        textStyle={{fontWeight: 'bold', color: '#fff'}}
                        centered={true}
                        onPress={this.cariBantuan}
                    />
                </View>
            </View>
        );
    }
}
