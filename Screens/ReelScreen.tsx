import React, { useRef, useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ResizeMode, Video } from "expo-av";
import SwiperFlatList from "react-native-swiper-flatlist";
import { NavigationProp } from '@react-navigation/native';
import { video } from "../Data/Video";
import FooterNavigation from "../Component/FooterNavigation";
import MoreOptionsPopup from "../Component/MoreOptionsPopup";
import CommentsOption from "../Component/CommentsOption";

const { height, width } = Dimensions.get("window");

interface Reel {
  video: any; 
  image?: any; 
  userName: string;
  caption: string;
  like: number;
  comments: { length: number };
  share: number;
}

interface ReelScreenProps {
  navigation: NavigationProp<any>; 
}

const ReelScreen: React.FC<ReelScreenProps> = ({ navigation }) => {
  const [crrIndex, setIndex] = useState<number>(0);
  const [posts, setPosts] = useState<Reel[]>(video);
  const [isOpen, setIsOpen] = useState<{ visibility: boolean; type: string }>({
    visibility: false,
    type: "",
  });
  const videoRefs = useRef<Video[]>([]);

  useEffect(() => {
    const blurSubscription = navigation.addListener("blur", () => {
      videoRefs.current[crrIndex]?.pauseAsync();
    });

    const focusSubscription = navigation.addListener("focus", () => {
      videoRefs.current[crrIndex]?.playAsync();
    });

    return () => {
      blurSubscription();
      focusSubscription();
    };
  }, [crrIndex, navigation]);

  const renderItem = ({ item, index }: { item: Reel; index: number }) => (
    <View style={styles.videoContainer}>
      <Video
        ref={(ref) => (videoRefs.current[index] = ref as Video)}
        source={item.video}
        style={styles.video}
        useNativeControls={false}
        shouldPlay={index === crrIndex}
        isLooping
        resizeMode={ResizeMode.COVER}
        isMuted={false}
        volume={1.0}
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.reelText}>Reels</Text>
          <Image
            source={require("../assets/camera.png")}
            style={styles.moreIcon}
          />
        </View>
        <View style={styles.footer}>
          <View>
            <View style={styles.userInfo}>
              <Image
                source={item.image ? item.image : require("../assets/user.png")}
                style={styles.userImage}
              />
              <Text style={styles.userName}>{item.userName}</Text>
            </View>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
          <View style={styles.footerIcons}>
            <View>
              <Image source={require("../assets/unlike.png")} />
              <Text style={styles.iconText}>{item.like}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsOpen({
                  type: "comments",
                  visibility: !isOpen.visibility,
                });
              }}
            >
              <View>
                <Image source={require("../assets/chat.png")} />
                <Text style={styles.iconText}>{item.comments.length}</Text>
              </View>
            </TouchableOpacity>
            <View>
              <Image source={require("../assets/Messanger.png")} />
              <Text style={styles.iconText}>{item.share}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsOpen({ type: "more", visibility: !isOpen.visibility });
              }}
            >
              <View>
                <Image
                  source={require("../assets/MoreIcon.png")}
                  style={styles.moreIconRotated}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const changeIndex = ({ index }: { index: number }) => {
    setIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SwiperFlatList
        vertical
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onChangeIndex={changeIndex}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No Reel Uploaded Yet</Text>
        }
      />
      <View style={styles.screenFooter}>
        <FooterNavigation navigation={navigation} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen.visibility}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsOpen({ ...isOpen, visibility: false })}
        >
          {isOpen.type === "more" ? <MoreOptionsPopup /> : <CommentsOption />}
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  videoContainer: {
    height: height,
    justifyContent: "center",
  },
  video: {
    height: height,
    width: width,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 20,
  },
  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reelText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  moreIcon: {
    width: 25,
    height: 25,
  },
  moreIconRotated: {
    width: 25,
    height: 25,
    transform: [{ rotate: "90deg" }],
  },
  footer: {
    marginBottom: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    marginLeft: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  caption: {
    marginTop: 5,
    color: "white",
    fontSize: 14,
  },
  screenFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "red",
  },
  footerIcons: {
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  iconText: {
    textAlign: "center",
    color: "white",
  },
  emptyMessage: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});

export default ReelScreen;
