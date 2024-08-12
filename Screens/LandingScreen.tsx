import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import Stories from "../Component/Stories";
import PostCard from "../commonComponent/PostCard";
import { FlatList, ListRenderItem } from "react-native";
import { useSelector } from "react-redux";
import FooterNavigation from "../Component/FooterNavigation";
import { PostData } from "../Data/PostData";
import { RootState } from "../Redux/Store/store";

type LandingScreenProps = {
  navigation: any;
};

interface Post {
  type: "image" | "video";
  path: any;
}

interface Comment {
  id: string;
  name: string;
  message: string;
}

interface PostCardData {
  id: number;
  image: any;
  name: string;
  posts: Post[];
  likes: number;
  comments: Comment[];
  caption: string;
  date: string;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  const selector = useSelector((state: RootState) => state.posts);

  const translateY = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const renderItem: ListRenderItem<PostCardData> = ({ item }) => {
    return <PostCard data={item} />;
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={{ backgroundColor: "white" }}>
        <View style={styles.topContainer}>
          <View>
            <Image
              source={require("../assets/instaTextLogo.png")}
              style={styles.textLogo}
            />
          </View>

          <View style={styles.subContainer}>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 7,
                  height: 7,
                  backgroundColor: "red",
                  borderRadius: 50,
                  position: "absolute",
                  zIndex: 1,
                  right: -1,
                  top: 0,
                }}
              ></View>
              <Image
                source={require("../assets/unlike.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 7,
                  height: 7,
                  backgroundColor: "red",
                  borderRadius: 50,
                  position: "absolute",
                  zIndex: 1,
                  right: -1,
                  top: 0,
                }}
              ></View>
              <Image
                source={require("../assets/chat.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </View>
        </View>
        <Stories navigation={navigation} />
        <View style={{ marginBottom: 380, height: 600 }}>
          <FlatList
            data={PostData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id} 
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 200,
            position: "absolute",
            bottom: 185,
          }}
        >
          <FooterNavigation navigation={navigation} />
        </View>
      </View>
    </Animated.View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  textLogo: {
    width: 100,
    height: 30,
  },
  container: {
    flex: 1,
  },
});
