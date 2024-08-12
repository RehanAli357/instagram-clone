import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const AddMorePopup: React.FC = () => {
  return (
    <View style={styles.moreModal}>
      <View style={styles.modalHandle}></View>
      <Text style={styles.title}>Create</Text>
      <View style={styles.option}>
        <Image source={require("../assets/reels.png")} style={styles.icon} />
        <Text>Reel</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/GridIcon.png")} style={styles.icon} />
        <Text>Post</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/story.png")} style={styles.icon} />
        <Text>Story</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/story-highlight.png")} style={styles.icon} />
        <Text>Story highlight</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/stream.png")} style={styles.icon} />
        <Text>Live</Text>
      </View>
      <View style={styles.option}>
        <Image source={require("../assets/magic-wand.png")} style={styles.icon} />
        <Text>Made for you</Text>
      </View>
    </View>
  );
};

export default AddMorePopup;

const styles = StyleSheet.create({
  moreModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 385,
    width: "100%",
    marginTop: "100%",
  },
  title: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 20,
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
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "gray",
    borderRadius: 50,
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
