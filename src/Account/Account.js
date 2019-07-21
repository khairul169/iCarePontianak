import React from 'react';

// components
import { View, Text, Image } from 'react-native';

// stacknavigator
import { createStackNavigator } from 'react-navigation';

// styles
import Styles from '../Styles';

// Users
import * as API from '../API';
import Authentication from '../Login/Authentication';

class Index extends React.Component {
    static navigationOptions = {
        title: 'Akun'
    };

    constructor(props) {
        super(props);

        this.state = {
            userInfo: null
        }
    }

    async componentDidMount() {
        let userToken = Authentication.getInstance().getUserToken();
        let userInfo = userToken ? await API.User.getUserInfo(userToken) : null;

        if (userInfo) {
            this.setState({
                userInfo: userInfo
            });
        }
    }

    render() {
        return (
            <View style={Styles.container}>
                { this.state.userInfo && (
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                            <View style={{marginLeft: 8, marginRight: 24}}>
                                <Image source={require('../../assets/icon/user.png')}
                                    style={{width: 80, height: 80}} />
                            </View>
                            <View>
                                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 2}}>{this.state.userInfo.name}</Text>
                                <Text style={{marginBottom: 2, color: '#626262'}}>{this.state.userInfo.email}</Text>
                                <Text>Terdaftar pada {this.state.userInfo.registered}</Text>
                            </View>
                        </View>
                    </View>
                ) }
            </View>
        );
    }
}

const Account = createStackNavigator({
    Index: Index
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

export default Account;
