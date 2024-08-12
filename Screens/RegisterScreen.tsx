import React from "react";
import { StyleSheet, View } from "react-native";
import Form from "../commonComponent/Form";
import { userData as initialUserData } from "../Data/RegisterData";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../Firebase/Config";

type RegisterScreenProps = {
  navigation: any;
};

interface FormData {
  email: string;
  password: string;
}

interface UserData {
  id: string;
  userDetails: {
    email: string;
    password: string;
  };
  [key: string]: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const addData = async (userId: string, userData: UserData) => {
    try {
      const userRef = doc(firestore, "user", userId);
      await setDoc(userRef, userData, { merge: true });
      navigation.navigate("Login");
      console.log("done");
    } catch (error) {
      console.log("not done", error);
    }
  };

  const handleSubmit = async (
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
  ) => {
    const data: UserData = { ...initialUserData };
    data.userDetails.email = formData.email;
    data.userDetails.password = formData.password;
    const id = `${new Date().valueOf()}`;
    data.id = id;
    setFormData((pdata) => ({
      ...pdata,
      id: id,
    }));
    await addData(id, data);
  };

  return (
    <View style={styles.container}>
      <Form type="Register" onSubmit={handleSubmit} navigation={navigation} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
