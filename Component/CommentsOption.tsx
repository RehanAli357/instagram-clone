import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store";

interface Comment {
  id: string;
  name: string;
  message: string;
}

interface CommentsOptionProps {
  commentsData?: Comment[];
}

const CommentsOption: React.FC<CommentsOptionProps> = ({ commentsData = [] }) => {
  const selector = useSelector((state: RootState) => state.user);
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        { id: Math.random().toString(), name: selector.email, message: newComment },
        ...comments,
      ]);
      setNewComment("");
    }
  };

  return (
    <View style={styles.moreModal}>
      <View style={styles.modalHandle}></View>
      <Text style={styles.title}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Text style={styles.username}>{item.name}</Text>
            <Text style={styles.comment}>{item.message}</Text>
          </View>
        )}
        style={styles.commentList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.sendButton}>
          <Image source={require("../assets/message.png")} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsOption;

const styles = StyleSheet.create({
  moreModal: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 385,
    width: "100%",
    marginTop: "100%",
    paddingHorizontal: 20,
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
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
  commentList: {
    flex: 1,
    marginTop: 10,
  },
  commentItem: {
    flexDirection: "row",
    marginVertical: 5,
  },
  username: {
    fontWeight: "bold",
    marginRight: 5,
  },
  comment: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});
