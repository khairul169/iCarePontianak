import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { Header, Card, SearchBar, Title } from "../Components";

// Action image
import emergencyCall from "../Assets/Icon/emergency-call.png";
import ambulance from "../Assets/Icon/ambulance.png";

const ActionItem = ({ flex, image, imageSize, label, borderLeft, onPress }) => {
  const containerStyle = [
    styles.actionItem,
    flex && {
      flex
    },
    borderLeft && {
      borderLeftColor: "#eee",
      borderLeftWidth: 1
    }
  ];

  const imageStyle = {
    height: imageSize ? imageSize : 80,
    resizeMode: "contain"
  };

  const textStyle = {
    textAlign: "center",
    fontSize: 14,
    marginTop: 16,
    color: "#626262"
  };

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image source={image} style={imageStyle} />
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const Gadar = ({ navigation }) => {
  const firstAids = [1, 2, 3];

  const renderFistAids = ({ item, index }) => {
    // Width of first aid items
    const { width } = Dimensions.get("window");
    const itemWidth = width * 0.75;
    const itemStyle = [
      styles.faItem,
      {
        width: itemWidth,
        marginLeft: index === 0 ? 0 : 8,
        marginRight: index === firstAids.length - 1 ? 0 : 8
      }
    ];

    return (
      <Card style={itemStyle} border>
        <Text>Test</Text>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Gawat Darurat" backButton navigation={navigation} />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Title marginTop={0}>Pusat Bantuan</Title>

          <Card style={styles.mainAction} border>
            <ActionItem label="Panggil Bantuan" image={emergencyCall} />
            <ActionItem
              label="Cari Ambulan"
              image={ambulance}
              imageSize={48}
              flex={0.5}
              borderLeft
              onPress={() => navigation.navigate("CariAmbulan")}
            />
          </Card>
        </View>

        <View style={styles.content}>
          <Title>Pertolongan Pertama</Title>
          <SearchBar marginBottom={12} />

          <FlatList
            horizontal
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={firstAids}
            keyExtractor={(item, index) => `firstaid-${index}`}
            renderItem={renderFistAids}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0BEC5"
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 8,
    padding: 16
  },
  mainAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  actionItem: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center"
  },
  faItem: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    margin: 8
  }
});

export default Gadar;
