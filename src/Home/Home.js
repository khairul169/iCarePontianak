import React from 'react';
import { StatusBar, Dimensions, Platform } from 'react-native';

// components
import {
    View, Text, ScrollView, TouchableOpacity, Image
} from 'react-native';

// stacknavigator
import { createStackNavigator } from 'react-navigation';

// styles
import Styles from '../Styles';

// pages
import GawatDarurat from './GawatDarurat';
import ScreenPelayanan, { DaftarPelayanan } from './ScreenPelayanan';
import PilihLokasi from './PilihLokasi';
import KonfirmasiLayanan from './KonfirmasiLayanan';
import PanggilBantuan from './GawatDarurat/PanggilBantuan';
import PertolonganPertama from './GawatDarurat/PertolonganPertama';
import CariAmbulan from './GawatDarurat/CariAmbulan';

class Index extends React.Component {
    static navigationOptions = {
        title: 'iCare Pontianak',
        header: null
    };

    componentDidMount() {
        // initialize location tracking
        this.initLocationTracker();
    }

    initLocationTracker = () => {
		this.askLocationPermission();
    	//this.startBackgroundUpdate();
    }

	askLocationPermission = async () => {
    }
    
	startBackgroundUpdate = () => {
		Location.startLocationUpdatesAsync(LOCATION_UPDATE, {
			accuracy: Location.Accuracy.Highest,
			timeInterval: 30000,
			distanceInterval : 0.0
		});
    }
    
    

    viewPelayanan = (index) => {
        if (index === 'gadar') {
            this.props.navigation.navigate('GawatDarurat', {
                mainNavigation: this.props.navigation
            });
        } else {
            const pelayanan = DaftarPelayanan.find(a => a.id === index);
            this.props.navigation.navigate('ScreenPelayanan', {
                data: pelayanan ? pelayanan : null,
                mainNavigation: this.props.navigation,
            });
        }
    }
    
    render() {
        
        // Light status bar (android)
        let lightStatusBar = false;
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            lightStatusBar = true;
        }

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                {
                    lightStatusBar ? (
                        <StatusBar hidden={false} barStyle='dark-content' translucent={false} backgroundColor='#fff' />
                    ) : (
                        <StatusBar hidden={false} barStyle='light-content' translucent={false} backgroundColor='#34495e' />
                    )
                }

                <View style={{
                    paddingVertical: 12,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={require('../../assets/icon/app-icon.png')} style={{width: 48, height: 48}} tintColor='#34495e' />
                </View>
                
                <ScrollView style={[Styles.container, {paddingTop: 0}]}>
                    <Text style={[Styles.headerText, {marginTop: 0}]}>Layanan Kami</Text>

                    <DaftarJenisPelayanan onPress={(index) => this.viewPelayanan(index)} iconSize={0.405} items={[
                        'gadar',
                        'medical-visit'
                    ]} />

                    <DaftarJenisPelayanan onPress={(index) => this.viewPelayanan(index)} items={[
                        'lab-medik',
                        'gigi',
                        'bidan'
                    ]} />

                    <DaftarJenisPelayanan onPress={(index) => this.viewPelayanan(index)} items={[
                        'lansia',
                        'sanitasi',
                        'dietnutrisi'
                    ]} />

                    <Text style={[Styles.headerText, {marginTop: 40, marginBottom: 10}]}>Artikel</Text>

                    <View style={Styles.artikelCard}>
                        <View style={{height: 120, flex: 1, backgroundColor: '#f2f2f2'}}></View>
                    </View>

                    <View style={{marginBottom: 40}}></View>
                </ScrollView>
            </View>
        );
    }
}

class DaftarJenisPelayanan extends React.Component {
    constructor(props) {
        super(props);
        
        let window = Dimensions.get('window');
        this.iconSize = window.width * (props.iconSize ? props.iconSize : 0.25);
        this.margin = window.width * (props.margin ? props.margin : 0.05);
    }

    render() {
        return <View style={{ marginTop: this.margin, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {
                this.props.items.map((item, index) => (
                    <TouchableOpacity onPress={() => this.props.onPress(item)} key={index}>
                        <Image
                            source={DaftarPelayanan.find(a => a.id === item).icon}
                            style={{width: this.iconSize, height: this.iconSize, marginLeft: (index > 0 ? this.margin : 0)}}
                        />
                    </TouchableOpacity>
                ))
            }
        </View>;
    }
}

const Home = createStackNavigator({
    // Home routes
    Index: Index,
    GawatDarurat: GawatDarurat,
    ScreenPelayanan: ScreenPelayanan,
    PilihLokasi: PilihLokasi,
    KonfirmasiLayanan: KonfirmasiLayanan,

    // Gawat Darurat
    PanggilBantuan: PanggilBantuan,
    PertolonganPertama: PertolonganPertama,
    CariAmbulan: CariAmbulan,
},
{
    initialRouteKey: 'Index',
    defaultNavigationOptions: {
        headerTintColor: '#333',
        headerStyle: {
            backgroundColor: '#fff',
            elevation: 3
        },
	},
	headerMode: 'screen',
	headerLayoutPreset: 'center'
});

export default Home;
