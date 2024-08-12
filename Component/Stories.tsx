import React, { useRef, useEffect } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { userStory } from "../Data/UserStoties/userStory";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store"; 

type StoriesProps = {
  navigation: any; 
};

type UserStory = {
  id: string;
  name: string;
  image: any; 
  storyData: any; 
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Stories: React.FC<StoriesProps> = ({ navigation }) => {
  const selector = useSelector((state: RootState) => state.user);

  const userStoryDetails: UserStory[] = [
    {
      id: selector.id,
      name: selector.email,
      image:
        selector.image.length > 0
          ? selector.image
          : require("../assets/dummyUser.png"),
      storyData: require("../assets/car.jpg"),
    },
    ...userStory,
  ];

  const progressValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressValue, {
      toValue: 1,
      duration: 2000,
      delay: 2000,
      useNativeDriver: true,
    }).start();
  }, [progressValue]);

  const renderItem = ({ item }: { item: UserStory }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Story", { item: item });
        }}
      >
        <View style={styles.storyContainer}>
          <View style={styles.progressContainer}>
            <Svg height="75" width="75" viewBox="0 0 100 100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <AnimatedCircle
                cx="50"
                cy="50"
                r="45"
                stroke="red"
                strokeWidth="2"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={progressValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [283, 0],
                })}
              />

              <Image source={item.image} style={styles.userDP} />
            </Svg>
          </View>
          <Text style={styles.storyName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={userStoryDetails}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: 400,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: 75,
    height: 75,
  },
  userDP: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    position: "absolute",
    top: 5,
    left: 5,
  },
  storyName: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});
