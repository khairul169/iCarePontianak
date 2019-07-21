import React from 'react';

// components
import { View, Text, Button } from 'react-native';

// stacknavigator
import { createStackNavigator } from 'react-navigation';

// styles
import Styles from '../Styles';

// Users
import * as API from '../API';
import Authentication from '../Login/Authentication';

class Index extends React.Component {
    static navigationOptions = {
        title: 'Settings'
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.container}>
                <Button title="Logout" onPress={() => {
                    Authentication.getInstance().removeUserToken();
                    this.props.navigation.navigate('Login');
                }} />
            </View>
        );
    }
}

const Settings = createStackNavigator({
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

export default Settings;
