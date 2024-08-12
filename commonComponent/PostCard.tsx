import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Text, View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import MoreOptionsPopup from "../Component/MoreOptionsPopup";
import CommentsOption from "../Component/CommentsOption";

const screenWidth = Dimensions.get("window").width;

interface Post {
  type: "image" | "video";
  path: any; 
}



interface PostCardData {
  id: number;
  name: string;
  image: any;
  likes: number;
  caption: string;
  date: string;
  posts: Post[];
  comments: any[];
}

interface PostCardProps {
  data: PostCardData;
}

interface IsOpenState {
  visibility: boolean;
  type: string;
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const [likes, setLikes] = useState(data.likes);
  const [isOpen, setIsOpen] = useState<IsOpenState>({
    visibility: false,
    type: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const heartAnim = useRef(new Animated.Value(0)).current;

  const scrollViewRef = useRef<ScrollView>(null);
  const videoRefs = useRef<Video[]>([]);
  const lastTap = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    data.posts.forEach((item, index) => {
      if (item.type === "video" && videoRefs.current[index]) {
        if (index === currentIndex) {
          videoRefs.current[index].playAsync();
        } else {
          videoRefs.current[index].pauseAsync();
        }
      }
    });
  }, [currentIndex, data.posts]);

  const handleDotPress = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const likeUnlike = () => {
    if (isLike) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLike(!isLike);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && now - lastTap.current < DOUBLE_PRESS_DELAY) {
      if (isLike) {
        setShowHeart(true);
      } else {
        setShowHeart(true);
        setLikes(likes + 1);
        setIsLike(true);
      }
      Animated.timing(heartAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setShowHeart(false);
          heartAnim.setValue(0);
        }, 500);
      });
    } else {
      lastTap.current = now;
    }
  };

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <Image style={styles.userImg} source={data.image} />
            <Text>{data.name}</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() =>
                setIsOpen({ type: "more", visibility: !isOpen.visibility })
              }
            >
              <Image
                source={require("../assets/MoreIcon.png")}
                style={styles.moreIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        >
          {data.posts.map((item, index) => (
            <View key={index} style={styles.imageContainer}>
              <Text style={styles.postCardIndex}>
                {index + 1}/{data.posts.length}
              </Text>
              {item.type === "image" ? (
                <TouchableOpacity onPress={handleDoubleTap}>
                  <Image source={item.path} style={styles.cardImg} />
                  {showHeart && (
                    <Animated.View
                      style={[
                        styles.heartContainer,
                        {
                          opacity: heartAnim,
                          transform: [
                            {
                              scale: heartAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1.5],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Image
                        source={require("../assets/Biglike.png")}
                        style={styles.heartIcon}
                      />
                    </Animated.View>
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleDoubleTap}>
                  <Video
                    ref={(ref) => {
                      if (ref) {
                        videoRefs.current[index] = ref;
                      }
                    }}
                    source={item.path}
                    style={styles.cardImg}
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls={false}
                  />
                  {showHeart && (
                    <Animated.View
                      style={[
                        styles.heartContainer,
                        {
                          opacity: heartAnim,
                          transform: [
                            {
                              scale: heartAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1.5],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Image
                        source={require("../assets/Biglike.png")}
                        style={styles.heartIcon}
                      />
                    </Animated.View>
                  )}
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.cardFooter}>
          <View style={[styles.footerLeft, { flex: 1 }]}>
            <TouchableOpacity onPress={likeUnlike}>
              <Image
                style={styles.cardFooterIcon}
                source={
                  isLike
                    ? require("../assets/like.png")
                    : require("../assets/unlike.png")
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOpen({
                  visibility: true,
                  type: "comments",
                });
              }}
            >
              <Image
                style={[styles.cardFooterIcon, { transform: "scaleX(-1)" }]}
                source={require("../assets/comments.png")}
              />
            </TouchableOpacity>
            <Image
              style={styles.cardFooterIcon}
              source={require("../assets/Messanger.png")}
            />
          </View>
          <View style={[styles.dotContainer, { flex: 1 }]}>
            {data.posts.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
                onPress={() => handleDotPress(index)}
              />
            ))}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              style={styles.cardFooterIcon}
              source={require("../assets/Shape2.png")}
            />
          </View>
        </View>
        <View style={styles.cardDetails}>
          <Text style={[styles.cardDetailText, { fontWeight: "bold" }]}>
            {likes} Likes
          </Text>
          <Text style={styles.cardDetailText}>{data.caption}</Text>
          {data.comments.length > 1 && (
            <TouchableOpacity
              onPress={() => {
                setIsOpen({
                  visibility: true,
                  type: "comments",
                });
              }}
            >
              <Text style={[styles.cardDetailText, { color: "gray" }]}>
                View all {data.comments.length} comments
              </Text>
            </TouchableOpacity>
          )}
          <Text
            style={[styles.cardDetailText, { color: "gray", fontSize: 10 }]}
          >
            {data.date}
          </Text>
        </View>
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
          {isOpen.type === "more" ? (
            <MoreOptionsPopup />
          ) : (
            <CommentsOption commentsData={data.comments} />
          )}
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "white",
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  userImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  moreIcon: {
    transform: [{ rotate: "90deg" }],
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  imageContainer: {
    width: screenWidth,
    height: 300,
    position: "relative",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  postCardIndex: {
    position: "absolute",
    left: "85%",
    top: 10,
    backgroundColor: "black",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    zIndex: 1,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#3897F0",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cardFooterIcon: {
    width: 20,
    height: 20,
  },
  cardDetails: {
    marginLeft: 5,
  },
  cardDetailText: {
    marginVertical: 2,
    lineHeight: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  heartContainer: {
    position: "absolute",
    top: "33%",
    left: "43%",
  },
  heartIcon: {
    width: 70,
    height: 70,
  },
});
