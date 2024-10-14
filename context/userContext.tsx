import { createContext, useState, useEffect, useContext } from "react";
import auth from "@react-native-firebase/auth";
import {
  getProfile,
  getProfileImage,
  updateProfile,
} from "../services/profile.service";

const UserContext = createContext({
  user: null,
  setUser: (value) => {},
  isAuthChecked: false,
  profile: null,
  setProfile: (value) => {},
  profileImage: null,
  setProfileImage: (value) => {},
});

const UserProvider = (props) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (currentUser) => {
      try {
        if (currentUser) {
          getUserProfile(currentUser);
          setUser(currentUser);
          setIsAuthChecked(true);
        } else {
          setUser(null);
          setIsAuthChecked(true);
        }
      } catch (error) {
        setUser(null);
        setIsAuthChecked(true);
      }
      setIsAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const getUserProfile = async (user) => {
    const userProfile = await getProfile(user?.uid);
    const image = await getProfileImage(user?.uid);

    setProfile({
      ...userProfile,
      phone: userProfile?.phone || user?.phoneNumber,
    });

    if (image) {
      setProfileImage(image);
    }

    if (!userProfile?.phone) {
      await updateProfile(user?.uid, userProfile?.name, user?.phoneNumber);
    }
  };

  const dataContext = {
    user,
    setUser,
    isAuthChecked,
    profile,
    setProfile,
    profileImage,
    setProfileImage,
  };

  return (
    <UserContext.Provider value={dataContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
