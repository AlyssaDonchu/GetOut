import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { Alert } from "react-native";

export const getProfile = async (uid: string) => {
  const userSnap = await firestore().collection("profile").doc(uid).get();

  const userData = userSnap.data();

  return {
    phone: userData?.phone,
    name: userData?.name,
  };
};

export const updateProfile = async (
  uid: string,
  name: string,
  phone: string
) => {
  await firestore()
    .collection("profile")
    .doc(uid)
    .set({
      name: name || "",
      phone: phone || "",
    });
};

export const getProfileImage = async (uid: string) => {
  try {
    const url = await storage().ref(`profile/${uid}.png`).getDownloadURL();
    return url;
  } catch (error) {
    return null;
  }
};

export const updateProfileImage = async (uid: string, image: any) => {
  const reference = storage().ref(`profile/${uid}.png`);
  await reference.putFile(image);
};
