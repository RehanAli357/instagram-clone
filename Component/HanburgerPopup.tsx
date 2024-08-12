import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const HanburgerPopup: React.FC = () => {
  return (
    <View style={styles.moreModal}>
      <View style={styles.modalHandle}></View>
      <View style={styles.option}>
        <Image source={require("../assets/setting.png")} style={styles.icon} />
        <Text>Setting and privacy</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/activity.png")} style={styles.icon} />
        <Text>Activity</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/restore.png")} style={styles.icon} />
        <Text>Archive</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/scan.png")} style={styles.icon} />
        <Text>QR code</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/Shape2.png")} style={styles.icon} />
        <Text>Saved</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/twouser.png")} style={styles.icon} />
        <Text>Supervision</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/paymentCard.png")} style={styles.iconLarge} />
        <Text>Orders and payments</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/verify.png")} style={styles.icon} />
        <Text>Meta verified</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/closeFriends.png")} style={styles.icon} />
        <Text>Close Friends</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/twouser.png")} style={styles.icon} />
        <Text>Favorites</Text>
      </View>
    </View>
  );
};

export default HanburgerPopup;

const styles = StyleSheet.create({
  moreModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 480,
    width: "100%",
    marginTop: "100%",
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "gray",
    borderRadius: 50,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  option: {
    flexDirection: "row",
    marginLeft: 10,
    gap: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconLarge: {
    width: 30,
    height: 30,
  },
});
