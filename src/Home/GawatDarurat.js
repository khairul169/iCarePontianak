import React from 'react';

// components
import { ScrollView, View, Text, Image } from 'react-native';
import Button from '../Components/Button';

// styles
import Styles from '../Styles';

export default class GawatDarurat extends React.Component {
    static navigationOptions = {
        title: 'Gawat Darurat'
    }

    constructor(props) {
        super(props);

        this.pertolonganPertama = [];
        this.pertolonganPertama.push({value: 'apar', name: 'Penggunaan APAR'});
        this.pertolonganPertama.push({value: 'digigit-ular', name: 'Digigit Ular'});
        this.pertolonganPertama.push({value: 'fraktur', name: 'Fraktur'});
        this.pertolonganPertama.push({value: 'keracunan', name: 'Keracunan'});
        this.pertolonganPertama.push({value: 'kram', name: 'Kram'});
        this.pertolonganPertama.push({value: 'luka-bakar', name: 'Luka Bakar'});
        //this.pertolonganPertama.push({value: 'luka-memar', name: 'Luka Memar'});
        //this.pertolonganPertama.push({value: 'luka-terbuka', name: 'Luka Terbuka'});
        //this.pertolonganPertama.push({value: 'luka-tertutup', name: 'Luka Tertutup'});
        this.pertolonganPertama.push({value: 'pingsan', name: 'Pingsan'});
        this.pertolonganPertama.push({value: 'rjp', name: 'Resusitasi Jantung Paru'});
        //this.pertolonganPertama.push({value: 'tenggelam', name: 'Tenggelam'});
        this.pertolonganPertama.push({value: 'tersedak', name: 'Tersedak'});
    }

    panggilBantuan = () => {
        this.props.navigation.navigate('PanggilBantuan', {
            mainNavigation  : this.props.mainNavigation,
            onBantuanDibuat : this.bantuanDibuat
        });
    }

    cariAmbulan = () => {
        this.props.navigation.navigate('CariAmbulan');
    }

    bantuanDibuat = () => {
        this.props.navigation && this.props.navigation.goBack();
        this.props.mainNavigation && this.props.mainNavigation.navigate('Notification');
    }

    onPenangananDipilih = (value) => {
        let title = 'Pertolongan Pertama';
        this.pertolonganPertama.map((data, id) => {
            if (data.value === value) {
                title = data.name;
            }
        });

        this.props.navigation.navigate('PertolonganPertama', {'title': title, 'penanganan': value});
    }

    render() {
        return (
            <ScrollView style={Styles.container}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
                    <Image
                        source={require('../../assets/pelayanan/gadar.jpg')}
                        style={{width: 100, height: 100}} />
                </View>

                <Text style={Styles.defaultText}>
                    Keadaan yang mengancam nyawa atau keadaan darurat yang memerlukan perawatan segera.
                </Text>

                <View style={{marginTop: 5}}></View>

                <Button centered={true}
                    style={{backgroundColor: '#e04543', borderWidth: 0}} textStyle={{color: '#fff', fontSize: 16}}
                    title="PANGGIL BANTUAN"
                    onPress={() => this.panggilBantuan()}
                />

                <Button centered={true}
                    title="Cari Ambulan Terdekat" style={{marginTop: 10}}
                    onPress={() => this.cariAmbulan()}
                />

                <View style={{marginTop: 20}}></View>

                <Text style={Styles.headerText}>Pertolongan Pertama</Text>
                <Text style={Styles.defaultText}>
                    Tindakan mandiri yang dapat dilakukan untuk meminimalisir korban.
                </Text>

                {/*<Picker 
                    ref={instance => this.simplePicker = instance}
                    data={this.pertolonganPertama} label={'name'} value={'value'}
					onValueChange={(value) => this.onPenangananDipilih(value)} />*/
				}

                <Button centered={true}
                    style={{backgroundColor: '#5db733', borderWidth: 0, marginTop: 10}} textStyle={{color: '#fff'}}
                    title="Pilih Pertolongan Pertama"
                    onPress={() => this.simplePicker.setModalVisible(true)}
                />

                <View style={{marginBottom: 40}}></View>
            </ScrollView>
        );
    }
}
