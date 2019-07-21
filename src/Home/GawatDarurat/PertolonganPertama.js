import React from 'react';
import { View, ScrollView, Dimensions } from 'react-native';

import Image from 'react-native-scalable-image';

export default class PertolonganPertama extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', 'Pertolongan Pertama')
        };
    };

    constructor(props) {
        super(props);
    }
    
    render() {
        let penanganan = this.props.navigation.getParam('penanganan', null);
        let window = Dimensions.get('window');

        let images = [];

        switch (penanganan) {
            case 'apar':
                images.push(require('../../../assets/pertolongan_pertama/apar.jpg'));
                break;

            case 'digigit-ular':
                images.push(require('../../../assets/pertolongan_pertama/luka_gigitan.jpg'));
                break;

            case 'fraktur':
                images.push(require('../../../assets/pertolongan_pertama/fraktur.jpg'));
                break;

            case 'keracunan':
                images.push(require('../../../assets/pertolongan_pertama/keracunan.jpg'));
                break;

            case 'kram':
                images.push(require('../../../assets/pertolongan_pertama/kram.jpg'));
                break;

            case 'luka-bakar':
                images.push(require('../../../assets/pertolongan_pertama/luka_bakar.jpg'));
                break;

            case 'pingsan':
                images.push(require('../../../assets/pertolongan_pertama/pingsan.jpg'));
                break;

            case 'rjp':
                images.push(require('../../../assets/pertolongan_pertama/rjp.jpg'));
                images.push(require('../../../assets/pertolongan_pertama/rjp2.jpg'));
                break;

            case 'tersedak':
                images.push(require('../../../assets/pertolongan_pertama/tersedak.jpg'));
                break;

            default:
                break;
        }

        return (
            <ScrollView>
                <View style={{flex: 1}}>
                    {
                        images.map((value, id) => (
                            <Image key={id} width={window.width} source={value} />
                        ))
                    }
                </View>
            </ScrollView>
        );
    }
}
