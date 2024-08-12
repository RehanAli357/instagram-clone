import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import FooterNavigation from "../Component/FooterNavigation";
import AddMorePopup from "../Component/AddMorePopup";
import HanburgerPopup from "../Component/HanburgerPopup";
import ProfilePopup from "../Component/ProfilePopup";
import { ResizeMode, Video } from "expo-av";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store"; 
import { userPost } from "../Data/UserPostData";

interface UserScreenProps {
  navigation: any; 
}

interface StateType {
  email: string;
}

const UserScreen: React.FC<UserScreenProps> = ({ navigation }) => {
  const selector = useSelector((state: RootState) => state.user);
  const [isOpen, setIsOpen] = useState<{ visibility: boolean; type: string }>({
    visibility: false,
    type: "",
  });
  const [type, setType] = useState<"allPost" | "reels" | "tags">("allPost");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.userName}>{selector.email}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => setIsOpen({ type: "more", visibility: true })}
            >
              <Image
                source={require("../assets/more.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsOpen({ type: "handbuger", visibility: true })}
            >
              <Image
                source={require("../assets/menu.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity
            onLongPress={() => setIsOpen({ visibility: true, type: "profile" })}
          >
            <Image
              source={require("../assets/InnerOval.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>14</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>140</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>240</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.bioText}>Alice</Text>
          <Text style={styles.bioText}>Singer</Text>
          <Text style={styles.bioText}>Living the life</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../assets/invite.png")}
              style={[styles.icon, { width: 15, height: 15, gap: 0 }]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.stories}>
          <View style={styles.story}>
            <Image
              source={require("../assets/friends.jpg")}
              style={styles.storyImage}
            />
            <Text style={styles.storyText}>friends</Text>
          </View>
          <View style={styles.story}>
            <Image
              source={require("../assets/car2.jpg")}
              style={styles.storyImage}
            />
            <Text style={styles.storyText}>Cars</Text>
          </View>
          <View style={styles.story}>
            <Image
              source={require("../assets/monuments.jpg")}
              style={styles.storyImage}
            />
            <Text style={styles.storyText}>Places</Text>
          </View>
          <View style={styles.story}>
            <View
              style={[
                styles.storyImage,
                { justifyContent: "center", alignItems: "center", borderColor: "black" },
              ]}
            >
              <Text style={{ fontSize: 30 }}>+</Text>
            </View>
            <Text style={styles.storyText}>New</Text>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setType("allPost")}>
            <View style={[styles.tab, type === "allPost" && styles.activeTab]}>
              <Image
                source={require("../assets/GridIcon.png")}
                style={styles.tabIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setType("reels")}>
            <View style={[styles.tab, type === "reels" && styles.activeTab]}>
              <Image
                source={require("../assets/reels.png")}
                style={styles.tabIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setType("tags")}>
            <View style={[styles.tab, type === "tags" && styles.activeTab]}>
              <Image
                source={require("../assets/TagsIcon.png")}
                style={styles.tabIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        {type === "allPost" ? (
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {userPost.map((data) => {
              return data.type === "image" ? (
                <Image
                  style={{ width: 98, height: 98 }}
                  source={data.path}
                  key={data.id}
                />
              ) : (
                <Video
                  style={{ width: 98, height: 98 }}
                  resizeMode={ResizeMode.COVER}
                  useNativeControls={false}
                  source={data.path}
                  key={data.id}
                />
              );
            })}
          </View>
        ) : type === "reels" ? (
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {userPost
              .filter((data) => data.type === "video")
              .map((data) => (
                <Video
                  style={{ width: 98, height: 98 }}
                  source={data.path}
                  resizeMode={ResizeMode.COVER}
                  useNativeControls={false}
                  key={data.id}
                />
              ))}
          </View>
        ) : (
          <View>
            <Text style={{ textAlign: "center" }}>No Tags Added Yet</Text>
            <Image
              source={require("../assets/TagsIcon.png")}
              style={{ margin: "auto", width: 50, height: 50, marginTop: 10 }}
            />
          </View>
        )}
      </ScrollView>
      <View style={{ position: "static", width: "100%" }}>
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
          {isOpen.type === "more" ? (
            <AddMorePopup />
          ) : isOpen.type === "handbuger" ? (
            <HanburgerPopup />
          ) : (
            <ProfilePopup />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  scrollContainer: {
    paddingBottom: 70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  stat: {
    justifyContent: "center",
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
  },
  bioSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bioText: {
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingVertical: 6,
    marginHorizontal: 3,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 14,
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  stories: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    gap:10,
    marginBottom: 20,
  },
  story: {
    alignItems: "center",
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "gray",
  },
  storyText: {
    fontSize: 12,
    marginTop: 5,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
    paddingVertical: 10,
  },
  tab: {
    alignItems: "center",
    paddingBottom: 5,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderColor: "black",
  },
  tabIcon: {
    width: 25,
    height: 25,
    tintColor: "black",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
