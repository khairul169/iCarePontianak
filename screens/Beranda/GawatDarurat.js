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
import { Header, Card, SearchBar } from "../../components";

// Action image
import emergencyCall from "../../assets/icon/emergency-call.png";
import ambulance from "../../assets/icon/ambulance.png";

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

const GawatDarurat = ({ navigation }) => {
  const firstAids = [1, 2, 3];

  const renderFistAids = ({ item, index }) => {
    // Width of first aid items
    const { width } = Dimensions.get("window");
    const itemWidth = width * 0.75;
    const itemStyle = [
      styles.faItem,
      { width: itemWidth },
      index === 0 && { marginLeft: 16 }
    ];

    return (
      <Card style={itemStyle}>
        <Text>Test</Text>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Gawat Darurat" backButton navigation={navigation} />

      <ScrollView style={styles.content}>
        <Text style={styles.titleText}>Pusat Bantuan</Text>

        <Card style={styles.mainAction}>
          <ActionItem label="PANGGIL BANTUAN" image={emergencyCall} />
          <ActionItem
            label="CARI AMBULAN"
            image={ambulance}
            imageSize={48}
            flex={0.6}
            borderLeft
            onPress={() => navigation.navigate("CariAmbulan")}
          />
        </Card>

        <Text style={styles.titleText}>Pertolongan Pertama</Text>
        <SearchBar
          backgroundColor="#fff"
          marginBottom={12}
          marginHorizontal={16}
        />

        <FlatList
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={firstAids}
          keyExtractor={(item, index) => `firstaid-${index}`}
          renderItem={renderFistAids}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  content: {
    flex: 1
  },
  mainAction: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    paddingVertical: 16
  },
  titleText: {
    fontSize: 18,
    color: "#525252",
    marginTop: 24,
    marginBottom: 16,
    marginLeft: 16
  },
  actionItem: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingHorizontal: 16
  },
  faItem: {
    height: 160,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
    marginBottom: 16
  }
});

export default GawatDarurat;
