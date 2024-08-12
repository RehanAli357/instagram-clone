import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NavigationProp } from '@react-navigation/native';

interface FooterNavigationProps {
  navigation: NavigationProp<any>; // Adjust the type if you have a specific navigation type
}

const FooterNavigation: React.FC<FooterNavigationProps> = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Landing")}
      >
        <Image source={require("../assets/hut.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Search")}
      >
        <Image source={require("../assets/search.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        // onPress={() => navigation.navigate("More")}
      >
        <Image source={require("../assets/more.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Reels")}
      >
        <Image source={require("../assets/reels.png")} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("User")}
      >
        <Image source={require("../assets/user.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FooterNavigation;
