import React from 'react';

import { ScrollView, View, Text, Image, TextInput, ToastAndroid } from 'react-native';
import { RadioGroup } from 'react-native-btr';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import Styles from '../Styles';
import Button from '../Components/Button';

// API
import * as API from '../API';
import Authentication from '../Login/Authentication';

export const DaftarPelayanan = [
    {
        id      : 'gadar',
        name    : 'Gawat Darurat',
        icon    : require('../../assets/pelayanan/gadar.jpg'),
    },
    {
        id      : 'medical-visit',
        name    : 'Kunjungan Medis',
        desc    : 'Pelayanan kesehatan dengan melakukan kunjungan langsung ke tempat pasien untuk dilakukan suatu tindakan medis/nonmedis.',
        icon    : require('../../assets/pelayanan/medical-visit.jpg'),
        api     : API.Pelayanan.KUNJUNGAN_MEDIS,
        tindakan  : [
            'Injeksi',
            'Intravena Infus',
            'Perawatan Luka',
            'Pemenuhan Nutrisi',
            'Cek Gula Darah, Asam Urat, dan Kolesterol',
            'Lainnya'
        ]
    },
    {
        id      : 'lab-medik',
        name    : 'Cek Lab Medik',
        desc    : 'Pemeriksaan sampel darah yang bertujuan untuk mendeteksi penyakit, mengetahui fungsi organ, mendeteksi racun, obat, atau zat tertentu, dan memeriksa kondisi kesehatan secara keseluruhan.',
        icon    : require('../../assets/pelayanan/labdarah.jpg'),
        api     : API.Pelayanan.LAB_DARAH,
        tindakan  : [
            'Tes Darah Lengkap',
            'Uji Protein C – Reaktif',
            'Laju Endap Darah',
            'Tes Elektrolit',
            'Tes Koagulasi',
            'Cek Urin',
            'Cek Sampel Dahak',
            'Tes ELISA',
            'Analisa Gas Darah',
            'Penilaian Risiko Penyakit Jantung'
        ]
    },
    {
        id      : 'gigi',
        name    : 'Kesehatan Gigi',
        icon    : require('../../assets/pelayanan/gigi.jpg'),
        desc    : 'Pelayanan kesehatan gigi.',
        api     : API.Pelayanan.KESEHATAN_GIGI,
        tindakan  : [
            'Pemeriksaan Gigi dan Gusi',
            'Perawatan Oral Hygiene'
        ]
    },
    {
        id      : 'bidan',
        name    : 'Bidan Terampil',
        icon    : require('../../assets/pelayanan/bidan.jpg'),
        desc    : 'Pelayanan kebidanan.',
        api     : API.Pelayanan.BIDAN_TERAMPIL,
        tindakan  : [
            'Pemeriksaan Kehamilan',
            'Konsultasi',
            'Senam Cantik',
            'Senam Yoga Hamil & Nifas',
            'Baby Spa',
            'Pijat Bayi'
        ]
    },
    {
        id      : 'lansia',
        name    : 'Pendampingan Lansia',
        icon    : require('../../assets/pelayanan/lansia.jpg'),
        desc    : 'Pelayanan pendampingan pada lanjut usia.',
        api     : API.Pelayanan.LANSIA,
        tindakan  : [
            'Pendampingan Lansia',
            'Konsultasi'
        ]
    },
    {
        id      : 'sanitasi',
        name    : 'Sanitasi dan Pengendalian Hama',
        icon    : require('../../assets/pelayanan/sanitasi.jpg'),
        desc    : 'Pelayanan sanitasi dan pengendalian hama.',
        api     : API.Pelayanan.SANITASI,
        tindakan  : [
            'Instalasi Jamban',
            'Fogging',
            'Pemberantasan Hama'
        ]
    },
    {
        id      : 'dietnutrisi',
        name    : 'Diet dan Nutrisi',
        icon    : require('../../assets/pelayanan/dietnutrisi.jpg'),
        desc    : 'Pelayanan diet dan nutrisi.',
        api     : API.Pelayanan.DIET_NUTRISI,
        tindakan  : [
            'Konsultasi Gizi Nutrisi Diet Biasa',
            'Konsultasi Diet Penyakit Jantung',
            'Konsultasi Diet Diabetes',
            'Konsultasi Diet Asam Urat dan Kolesterol',
            'Konsultasi Diet Pasca Operasi'
        ]
    }
];

export default class ScreenPelayanan extends React.Component {
    static navigationOptions = ({ navigation }) => {
        let data = navigation.getParam('data', null);
        
        return {
            title: data.name ? data.name : 'Pelayanan'
        };
    };

    constructor(props) {
        super(props);

        // navigation
        this.mainNavigation = props.navigation.getParam('mainNavigation', null);
        this.data = props.navigation.getParam('data', null);

        // daftar tindakan
        this.listTindakan = [];

        // buat option button
        this.data.tindakan && this.data.tindakan.map((value, id) => {
            this.listTindakan.push({
                label   : value,
                value   : id,
                size    : 5,
                color   : '#333'
            });
        });

        // states
        this.state = {
            datePicker: false,
            timePicker: false,
            spinner: false,

            keluhan: null,
            tindakan: this.listTindakan,
            date: new Date(),
            time: new Date(),
            lokasi: null
        };
    }

    toggleDatePicker = (visible) => {
        visible && this.toggleTimePicker(false);
        this.setState({datePicker: visible});
    }

    onDatePickerConfirm = (value) => {
        this.setState({date: value});
        this.toggleDatePicker(false);
    }

    toggleTimePicker = (visible) => {
        visible && this.toggleDatePicker(false);
        this.setState({timePicker: visible});
    }

    onTimePickerConfirm = (value) => {
        this.setState({time: value});
        this.toggleTimePicker(false);
    }

    onCreateOrder = async () => {
        this.props.navigation.navigate('KonfirmasiLayanan', {
            lokasiMap: this.state.lokasi
        });

        return;
        if (this.state.spinner) {
            return;
        }
        
        this.setState({spinner: true});

        let tindakan = this.state.tindakan.find(o => o.checked === true);
		//let waktu = moment(this.state.date).format('Do MMMM YYYY') + " " + moment(this.state.time).format('HH:mm');
		let waktu = null;

        let result = await API.Pelayanan.buatPermintaanLayanan(Authentication.getInstance().getUserToken(),
            API.JenisPelayanan.KUNJUNGAN_MEDIS,
        {
            keluhan     : this.state.keluhan,
            tindakan    : tindakan ? tindakan.label : null,
            diagnosa    : this.state.diagnosa,
            waktu       : waktu,
            lokasi      : this.state.lokasi
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
            alert('Gagal membuat permintaan pelayanan! Harap coba beberapa saat lagi.');
        }
    }

    render() {
        return (
            <ScrollView style={Styles.container}>
                <Spinner
                    visible={this.state.spinner} cancelable={false}
                    textContent='Loading...' textStyle={{color: '#fff', fontSize: 14}} />

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: 14 }}>
                    <Image
                        source={this.data.icon}
                        style={{width: 100, height: 100}} />
                </View>

                <Text style={Styles.defaultText}>
                    {this.data.description}
                </Text>

                <Text style={Styles.subHeaderText}>Keluhan Utama</Text>
                <Text style={[Styles.defaultText, {marginBottom: 6}]}>
                    Keluhan yang saat ini dirasakan.
                </Text>

                <TextInput value={this.state.keluhan} style={Styles.inputText}
                    onChangeText={(text) => this.setState({keluhan: text})} />

                <Text style={Styles.subHeaderText}>Jenis Tindakan</Text>
                <Text style={[Styles.defaultText, {marginBottom: 6}]}>
                    Pilih jenis tindakan yang diinginkan.
                </Text>

                <RadioGroup radioButtons={this.state.tindakan} style={{flex: 1}}
                    onPress={(value) => this.setState({tindakan: value})} />
                
                { this.data.id === 'medical-visit' &&
                    <View>
                        <Text style={Styles.subHeaderText}>Diagnosa Medis (opsional)</Text>
                        <Text style={[Styles.defaultText, {marginBottom: 6}]}>
                            Diagnosa medis pasien yang akan dilakukan tindakan.
                        </Text>

                        <TextInput placeholder="Dx.." value={this.state.diagnosa} placeholderTextColor="#555" style={Styles.inputText}
                            onChangeText={(text) => this.setState({diagnosa: text})} />
                    </View>
                }

                <Text style={Styles.subHeaderText}>Waktu Pelayanan</Text>
                <Text style={[Styles.defaultText, {marginBottom: 6}]}>
                    Tentukan waktu pelaksanaan pelayanan.
                </Text>

                <DateTimePicker
                    mode='date' isVisible={this.state.datePicker} date={this.state.date}
                    onCancel={() => this.toggleDatePicker(false)}
                    onConfirm={this.onDatePickerConfirm}
                />
                <Button title="Pilih Tanggal" centered={true} onPress={() => this.toggleDatePicker(true)} />

                <DateTimePicker
                    mode='time' isVisible={this.state.timePicker}  date={this.state.time}
                    onCancel={() => this.toggleTimePicker(false)}
                    onConfirm={this.onTimePickerConfirm}
                />
                <Button title="Pilih Jam" centered={true} style={{marginTop: 10}} onPress={() => this.toggleTimePicker(true)} />

                <Text style={Styles.subHeaderText}>Lokasi</Text>
                <Text style={[Styles.defaultText, {marginBottom: 6}]}>
                    Tentukan tempat pelaksanaan pelaksanaan.
                </Text>

                <Button
                    title="Pilih Tempat" centered={true}
                    onPress={() => this.props.navigation.navigate('PilihLokasi', {
                        onLokasiDipilih: (region) => {
                            this.setState({lokasi: region});
                        },
                        initialRegion: this.state.lokasi
                    })}
                />

                <Button title="Buat Pesanan" centered={true}
                    style={{marginTop: 20, backgroundColor: '#34495e', borderWidth: 0}}
                    textStyle={{color: '#fff'}}
                    onPress={this.onCreateOrder} />

                <View style={{marginBottom: 40}}></View>
            </ScrollView>
        );
    }
}
