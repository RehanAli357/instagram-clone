import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StoryOption from "../Component/StoryOption";


interface StoryItem {
  image: any;
  name: string;
  storyData: any;
}


interface RouteParams {
  item: StoryItem;
}


interface StoryScreenProps {
  route: {
    params: RouteParams;
  };
}

const StoryScreen: React.FC<StoryScreenProps> = ({ route }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const { item } = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();

    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      navigation.goBack();
    });
  }, [scaleAnim, progress, navigation]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image source={item.image} style={styles.userImage} />
            <Text style={styles.userName}>{item.name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Image
              source={require("../assets/MoreIcon.png")}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={item.storyData}
        style={styles.storyImage}
      />

      <View style={styles.commentContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
        />
        <Image
          source={require("../assets/unlike.png")}
          style={{ tintColor: "white" }}
        />
        <Image
          source={require("../assets/Messanger.png")}
          style={{ tintColor: "white" }}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <StoryOption />
        </TouchableOpacity>
      </Modal>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  overlay: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 10,
  },
  progressBar: {
    height: 2,
    backgroundColor: "black",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  userName: {
    color: "black",
    fontWeight: "bold",
  },
  moreIcon: {
    transform: [{ rotate: "90deg" }],
  },
  storyImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Changed from objectFit to resizeMode
  },
  commentContainer: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
  },
  input: {
    flex: 1,
    color: "white",
    paddingHorizontal: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default StoryScreen;
