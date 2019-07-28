import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../Actions/Akun.action";
import { logout } from "../Actions/Auth.action";

import { View, Text, StyleSheet, Button } from "react-native";
import { Header } from "../Components";

const Akun = props => {
  const { token, user, navigation, fetchUserData } = props;

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const onLogout = () => {
    props.logout();
  };

  useEffect(() => {
    !token && navigation.navigate("Login");
  }, [navigation, token]);

  return (
    <View style={styles.container}>
      <Header title="Akun" />

      <View style={styles.content}>
        <Text>Username: {user && user.username}</Text>
        <Text>Name: {user && user.name}</Text>
        <Button title="Logout" onPress={onLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 16
  }
});

const mapStateToProps = ({ auth, akun }) => ({
  token: auth.token,
  user: akun.userData
});

const mapDispatchToProps = {
  fetchUserData: fetchUser,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Akun);
