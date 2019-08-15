import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, ToastAndroid} from 'react-native';
import {Header, TextEdit} from '../Components';
import {HeaderIcon} from '../Components/Header';

const PengaturanAkun = props => {
  const user = props.navigation.getParam('user');
  const callback = props.navigation.getParam('callback');

  const [name, setName] = useState(user.name);
  const [password, setpassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [phone, setPhone] = useState(user.phone);

  const save = () => {
    if (password !== '' && password !== rePassword) {
      ToastAndroid.show('Kata Sandi tidak sama!', ToastAndroid.LONG);
      return;
    }
    if (password !== '' && password.length < 6) {
      ToastAndroid.show('Kata Sandi minimal 6 huruf.', ToastAndroid.LONG);
      return;
    }
    const data = {
      name: name !== user.name && name !== '' && name,
      password: password !== '' && password,
      phone: phone !== user.phone && phone !== '' && phone,
    };
    callback && callback(data);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title="Pengaturan Akun"
        backButton
        {...props}
        right={<HeaderIcon name="pen" right onPress={save} />}
      />

      <ScrollView style={styles.content}>
        <TextEdit
          icon="account-box"
          caption="Nama Lengkap"
          value={name}
          onChangeText={setName}
          style={styles.input}
          inputStyle={styles.inputText}
          capitalize
        />
        <TextEdit
          icon="key"
          caption="Kata Sandi"
          placeholder="Masukkan kata sandi untuk mengganti..."
          value={password}
          onChangeText={setpassword}
          style={styles.input}
          inputStyle={styles.inputText}
          password
        />
        <TextEdit
          icon="key"
          caption="Ulangi Kata Sandi"
          placeholder="..."
          value={rePassword}
          onChangeText={setRePassword}
          style={styles.input}
          inputStyle={styles.inputText}
          password
        />
        <TextEdit
          icon="phone"
          caption="Nomor Telepon"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          inputStyle={styles.inputText}
          numeric
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginTop: 12,
  },
  inputText: {
    paddingTop: 0,
  },
});

export default PengaturanAkun;
