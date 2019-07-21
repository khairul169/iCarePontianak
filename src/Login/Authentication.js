import AsyncStorage from '@react-native-community/async-storage';

export default class ICareAuth {
    // singleton instance
    static instance = null;

    // vars
    userToken = null;

    setUserToken(token) {
        this.userToken = token;
    }

    getUserToken() {
        return this.userToken;
    }

    async setUserTokenStorage(token) {
        try {
            await AsyncStorage.setItem('userAccessToken', token);
            this.setUserToken(token);
        } catch (err) {
            console.log(err);
        }
    }

    async getUserTokenStorage() {
        try {
            const token = await AsyncStorage.getItem('userAccessToken');
            if (token) {
                this.setUserToken(token);
                return token;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    async removeUserToken() {
        try {
            await AsyncStorage.removeItem('userAccessToken');
            this.token = null;
        } catch (err) {
            console.log(err);
        }
    }

    static getInstance() {
        if (ICareAuth.instance === null) {
            ICareAuth.instance = new ICareAuth();
        }
        return this.instance;
    }
}
