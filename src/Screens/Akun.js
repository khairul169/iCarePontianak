import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logout } from "../Actions/Auth.action";

import { View, Text, StyleSheet, Button } from "react-native";
import { Header } from "../Components";

const Akun = props => {
  const { token, navigation } = props;

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

const mapStateToProps = ({ auth }) => ({
  token: auth.token
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Akun);
