import FormData from 'FormData';

const DEBUG = true;

// Application configuration
//export const API_URL = 'http://192.168.43.48/icareptk';
//export const API_URL = 'http://192.168.56.1/icareptk';
export const API_URL = 'http://icare.khairul.my.id';

const API_AUTH = '/auth.php';
const API_BASE = '/api.php';
const API_TOKEN = '25d22aeb311ab38840abc37f23436c2b87cb7e4bd082';

const GET_HEADERS = {
    'Accept'        : 'application/json',
    'Content-Type'  : 'application/json'
}

const POST_HEADERS = {
    'Accept'        : 'application/json',
    'Content-Type'  : 'multipart/form-data'
}

export const OK = 1;
export const FAIL = 0;

export const JenisPelayanan = {
    BANTUAN_GADAR       : 1,
    KUNJUNGAN_MEDIS     : 2,
    LAB_DARAH           : 3,
    KESEHATAN_GIGI      : 4,
    BIDAN_TERAMPIL      : 5,
    LANSIA              : 6,
    SANITASI            : 7,
    DIET_NUTRISI        : 8
};

class API {
    static async get(module, method, args) {
        try {
            let url = API_URL + API_BASE + '?module=' + module + '&method=' + method;

            if (args) {
                for (var key in args) {
                    url = url + "&" + key + "=" + args[key];
                }
            }

            let response = await fetch(url, { method: 'GET', headers: GET_HEADERS });

            // log response
            DEBUG && console.log(response);

            let json = await response.json();
            if (json.status && json.status >= 0) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    static async post(module, method, args) {
        try {
            let url = API_URL + API_BASE + '?module=' + module + '&method=' + method;
            let data = new FormData();
            for (var key in args) {
                data.append(key, args[key]);
            }

            let response = await fetch(url, { method: 'POST', headers: POST_HEADERS, body: data });

            // log response
            DEBUG && console.log(response);

            let json = await response.json();
            if (json && json.status >= 0) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    }

    static async auth(method, args) {
        try {
            let url = API_URL + API_AUTH + '?api_token=' + API_TOKEN + '&do=' + method;
            let data = new FormData();
            for (var key in args) {
                data.append(key, args[key]);
            }

            let response = await fetch(url, { method: 'POST', headers: POST_HEADERS, body: data });

            // log response
            DEBUG && console.log(response);

            let json = await response.json();
            if (json && json.status >= 0) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    }
}

class Authentication {
    
    // Register API
    static async register(email, password, name) {
        let result = await API.auth('register', {
            email       : email,
            password    : password,
            name        : name
        });
        return result;
    }

    // Login API
    static async login(email, password) {
        let result = await API.auth('login', {
            email       : email,
            password    : password
        });
        return result;
    }

    // Relogin
    static async validateToken(token) {
        let result = await API.auth('validate', {
            token       : token
        });
        return result && result.status === OK;
    }
}

class User {
    // get user data
    static async getUserInfo(token, id = null) {
        let result = await API.get('user', 'get_info', {
            token   : token,
            id      : id
        });
        if (result && result.status === OK) {
            return result.userInfo;
        }
        return null;
    }
}

class GawatDarurat {
    // cari ambulan
    static async cariAmbulan(token) {
        let result = await API.get('gadar', 'cari_ambulan', {
            token           : token
        });
        if (result) {
            return result.ambulan;
        }
        return null;
    }
}

class Pelayanan {
    // Kunjungan Medis
    static async buatPermintaanLayanan(token, pelayanan, data) {
        let result = await API.post('pelayanan', 'buat_permintaan', {
            token       : token,
            pelayanan   : pelayanan,
            data        : JSON.stringify(data)
        });
        return result;
    }

    // Cari permintaan layanan
    static async cariPermintaanLayanan(token) {
        let result = await API.post('pelayanan', 'cari_permintaan', {
            token       : token
        });
        return result;
    }
}

export { Authentication, User, GawatDarurat, Pelayanan };
