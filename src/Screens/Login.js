import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchLogin, fetchRegister } from "../Actions/Auth.action";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from "react-native";
import { Icon } from "../Components";
import appIcon from "../../assets/icon/app-icon.png";

const InputText = ({ icon = "home", placeholder, value, onChangeText }) => {
  return (
    <View style={styles.input}>
      <Icon style={styles.inputIcon} name={icon} size={20} color="#78909C" />
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const Button = ({
  title,
  backgroundColor = "#fff",
  border = true,
  dark,
  marginTop = 8,
  onPress
}) => {
  const containerStyle = [
    styles.buttonContainer,
    border && {
      borderColor: "#CFD8DC",
      borderWidth: 1
    },
    { backgroundColor, marginTop }
  ];

  const titleStyle = [styles.buttonTitle, { color: dark ? "#fff" : "#546E7A" }];

  return (
    <View style={containerStyle}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={titleStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Login = props => {
  const [register, setRegister] = useState(false);

  // input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { auth, navigation } = props;

  useEffect(() => {
    if (auth.isLoading) return;

    // error message
    if (!auth.success && auth.message) {
      ToastAndroid.show(auth.message, ToastAndroid.LONG);
    }

    // navigate to main screen
    if (auth.token) {
      navigation.navigate("Main");
    }
  }, [auth, navigation]);

  const tryLogin = async () => {
    // login
    props.fetchLogin(username, password);
  };

  const tryRegister = async () => {
    // Password confirmation
    if (confirmPass !== password)
      return ToastAndroid.show(
        "Konfirmasi kata sandi tidak sama!",
        ToastAndroid.SHORT
      );

    // register
    props.fetchRegister(username, password, fullname);
  };

  const onSubmit = async () => {
    register ? tryRegister() : tryLogin();
  };

  const onToggle = () => {
    setRegister(!register);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={appIcon} style={styles.icon} />
      </View>

      <View style={styles.inputContainer} behavior="padding">
        {register && (
          <InputText
            icon="account-card-details"
            placeholder="Nama Lengkap"
            value={fullname}
            onChangeText={setFullname}
          />
        )}
        <InputText
          icon="account-circle"
          placeholder="Nama Pengguna"
          value={username}
          onChangeText={setUsername}
        />
        <InputText
          icon="account-key"
          placeholder="Kata Sandi"
          value={password}
          onChangeText={setPassword}
        />
        {register && (
          <InputText
            icon="eraser"
            placeholder="Konfirmasi Kata Sandi"
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
        )}

        <Button
          title={register ? "DAFTAR" : "MASUK"}
          backgroundColor={register ? "#4CAF50" : "#03A9F4"}
          marginTop={32}
          dark
          border={false}
          onPress={onSubmit}
        />
        <Button title={register ? "Masuk" : "Daftar"} onPress={onToggle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center"
  },
  icon: {
    tintColor: "#455A64",
    width: 64,
    height: 64,
    alignSelf: "center"
  },
  inputContainer: {
    padding: 16
  },
  input: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "stretch"
  },
  inputIcon: {
    width: 24,
    alignSelf: "center",
    marginTop: 2
  },
  inputText: {
    flex: 1,
    borderColor: "#CFD8DC",
    borderBottomWidth: 1,
    padding: 0,
    paddingVertical: 6,
    marginLeft: 8
  },
  buttonContainer: {
    marginTop: 16,
    height: 40,
    borderRadius: 20
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = {
  fetchLogin,
  fetchRegister
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
