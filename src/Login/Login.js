import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput,
    StatusBar, LayoutAnimation, ToastAndroid, Linking } from 'react-native';
import { StyleSheet } from 'react-native';

// Auth API
import * as API from '../API';
import Authentication from './Authentication';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            showLoginLayout : false,
            registerMode    : false,

            // input
            email           : null,
            password        : null,
            name            : null
        }
    }

    async componentDidMount() {
        const userToken = await Authentication.getInstance().getUserTokenStorage();

        if (userToken) {
            let isLoginValid = await API.Authentication.validateToken(userToken);
            if (isLoginValid) {
                this.onLoggedIn();
                return;
            } else {
                await Authentication.getInstance().removeUserToken();
            }
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({showLoginLayout: true});
    }

    clearInputValue = () => {
        this.setState({
            email           : null,
            password        : null,
            name            : null
        })
    }

    toggleRegisterLayout = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.clearInputValue();
        this.setState({registerMode: !this.state.registerMode});
    }

    tryLogin = async () => {
        let result = await API.Authentication.login(this.state.email, this.state.password);
        if (result) {
            ToastAndroid.show(result.message, ToastAndroid.LONG);

            if (result.status === API.OK && result.token) {
                await Authentication.getInstance().setUserTokenStorage(result.token);
                this.onLoggedIn();
            }
        }
    }

    tryRegister = async () => {
        if (!this.state.registerMode) {
            return;
        }
        
        let result = await API.Authentication.register(this.state.email, this.state.password, this.state.name);
        if (result) {
            ToastAndroid.show(result.message, ToastAndroid.LONG);

            if (result.status === API.OK && result.token) {
                await Authentication.getInstance().setUserTokenStorage(result.token);
                this.onLoggedIn();
            }
        }
    }

    onLogin = async () => {
        if (this.state.registerMode) {
            await this.tryRegister();
        } else {
            await this.tryLogin();
        }
    }

    onLoggedIn = () => {
        this.props.navigation.navigate('Main');
    }

    lupaPassword = () => {
        Linking.openURL(API.API_URL + '/lupa_password.php').catch((err) => console.log('An error occurred', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' translucent={true} backgroundColor='#34495e' />
                <View style={styles.iconContainer}>
                    <Image source={require('../../assets/icon/app-icon.png')} tintColor='#fff' style={styles.iconImg} />

                    <Text style={styles.headerText}>i-Care Pontianak</Text>
                </View>

                {
                    this.state.showLoginLayout && (
                    <View>
                        <View style={styles.inputContainer}>
                            
                            { this.state.registerMode && (
                                <TextInput
                                    style={styles.inputText} placeholder="Nama" placeholderTextColor='#ddd'
                                    textContentType='name' autoCapitalize='words'
                                    value={this.state.name} onChangeText={(value) => this.setState({name: value})} />
                                )
                            }

                            <TextInput
                                style={styles.inputText} placeholder="Email" placeholderTextColor='#ddd'
                                textContentType='emailAddress' autoCapitalize='none'
                                value={this.state.email} onChangeText={(value) => this.setState({email: value})} />
                            
                            <TextInput
                                style={styles.inputText} placeholder="Password" placeholderTextColor='#ddd'
                                textContentType='password' secureTextEntry={true} autoCapitalize='none'
                                value={this.state.password} onChangeText={(value) => this.setState({password: value})} />
                        </View>

                        <View style={styles.actionContainer}>
                            <TouchableOpacity onPress={this.toggleRegisterLayout}>
                                <Text style={styles.actionText}>{this.state.registerMode ? 'Masuk' : 'Buat Akun'}</Text>
                            </TouchableOpacity>

                            <Text style={[styles.actionText, {marginLeft: 20}]}>•</Text>

                            <TouchableOpacity onPress={this.lupaPassword}>
                                <Text style={[styles.actionText, {marginLeft: 20}]}>Lupa Kata Sandi</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={() => this.onLogin()}>
                            <Text style={styles.loginButtonLabel}>{this.state.registerMode ? 'DAFTAR' : 'MASUK'}</Text>
                        </TouchableOpacity>
                    </View>
                    )
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495e'
    },

    iconContainer: {
        flex: 1, flexGrow: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    },

    iconImg: {
        width: 64, height: 64
    },

    headerText: {
        color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 12
    },

    inputContainer: {
        padding: 16
    },

    inputText: {
        backgroundColor: '#2c3e50', paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, marginBottom: 12, color: '#fff'
    },

    actionContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        marginBottom: 36
    },

    actionText: {
        color: '#fff', fontSize: 14
    },

    loginButton: {
        padding: 18, backgroundColor: '#1abc9c'
    },

    loginButtonLabel: {
        fontSize: 20, color: '#fff', textAlign: 'center', fontWeight: 'bold'
    }
});
