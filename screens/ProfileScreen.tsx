import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import {
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";

import TextInput from "../components/TextInput";
import UploadImage from "../components/UploadImage";
import { useUserContext } from "../context/userContext";
import { updateProfile, updateProfileImage } from "../services/profile.service";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();
  const { user, profile, setProfile, profileImage, setProfileImage } =
    useUserContext();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isLoading },
  } = useForm({
    defaultValues: profile,
    values: profile,
  });

  const [image] = watch(["image"]);

  const onChangeImage = async (name, file) => {
    setValue(name, file);
  };

  const onSubmit = async (data) => {
    try {
      await updateProfile(user.uid, data.name, data.phone);
      setProfile({
        uid: user.uid,
        name: data.name,
        phone: data.phone,
      });

      if (image) {
        await updateProfileImage(user.uid, image);
      }
    } catch (error) {
      Alert.alert("Error", error?.message);
    }
  };

  const onLogout = async () => {
    await auth().signOut();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <UploadImage
          image={image || profileImage}
          name="image"
          onChange={onChangeImage}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Username"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
          }) => (
            <TextInput
              placeholder="Phone"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              keyboardType="phone-pad"
              error={error?.message}
            />
          )}
          rules={{
            pattern: {
              value: /^\+[1-9]\d{1,14}$/,
              message: "Invalid phone number format. Must be 10-14 digits.",
            },
          }}
          name="phone"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonnText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleSubmit(onLogout)}
          style={styles.logoutButton}
        >
          <Text style={styles.saveButtonnText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ActivityIndicator
        style={styles.activityIndicator}
        size="large"
        animating={isLoading || isSubmitting}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    borderColor: "#bbbbbb",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  activityIndicator: StyleSheet.absoluteFillObject,
  saveButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    padding: 14,
    borderRadius: 50,
    marginVertical: 20,
    width: 160,
    alignSelf: "center",
  },
  logoutButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f41603",
    padding: 14,
    borderRadius: 50,
    marginVertical: 20,
    width: 160,
    alignSelf: "center",
  },
  saveButtonnText: {
    color: "#fff",
    fontSize: 14,
  },
});
