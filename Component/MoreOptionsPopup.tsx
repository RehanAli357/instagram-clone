import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const MoreOptionsPopup: React.FC = () => {
  return (
    <View style={styles.moreModal}>
      <View style={styles.modalHandle}></View>
      <View style={styles.modalOptions}>
        <View style={styles.popupDiv}>
          <View style={styles.popupIcon}>
            <Image source={require("../assets/Shape2.png")} />
          </View>
          <Text>Save</Text>
        </View>
        <View style={styles.popupDiv}>
          <View style={styles.popupIcon}>
            <Image source={require("../assets/sequence.png")} />
          </View>
          <Text>Remix</Text>
        </View>
        <View style={styles.popupDiv}>
          <View style={styles.popupIcon}>
            <Image source={require("../assets/Shape.png")} />
          </View>
          <Text>QR code</Text>
        </View>
      </View>
      <View style={styles.modalActions}>
        <View style={styles.actionItem}>
          <Image source={require("../assets/star.png")} />
          <Text>Add to favorites</Text>
        </View>
        <View style={styles.actionItem}>
          <Image source={require("../assets/unfollow.png")} />
          <Text>Unfollow</Text>
        </View>
        <View style={styles.actionItem}>
          <Image source={require("../assets/info.png")} />
          <Text>Why you're seeing this post</Text>
        </View>
        <View style={styles.actionItem}>
          <Image source={require("../assets/hide.png")} />
          <Text>Hide</Text>
        </View>
        <View style={styles.actionItem}>
          <Image source={require("../assets/user.png")} />
          <Text>About this account</Text>
        </View>
        <View style={styles.actionItem}>
          <Image source={require("../assets/information.png")} />
          <Text style={{ color: "red" }}>Report</Text>
        </View>
      </View>
    </View>
  );
};

export default MoreOptionsPopup;

const styles = StyleSheet.create({
  moreModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 385,
    width: "100%",
    marginTop: "100%",
    paddingTop: 10,
  },
  popupDiv: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  popupIcon: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 50,
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
  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  modalActions: {
    gap: 20,
    marginLeft: 10,
    marginTop: 20,
    paddingBottom: 10,
  },
  actionItem: {
    flexDirection: "row",
    gap: 5,
  },
});
