// screens/SignInScreen.tsx
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { View, TextInput, Button, StyleSheet } from "react-native";

const PhoneSignIn = ({
  setConfirmationResult,
}: {
  setConfirmationResult: (confirmationResult: any) => void;
}) => {
  const [phone, setPhone] = useState("");
  const handleSignIn = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirmationResult(confirmation);
    } catch (error) {
      console.log("error " + error);
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const PhoneVerification = ({
  confirmationResult,
}: {
  confirmationResult: any;
}) => {
  const [code, setCode] = useState("");
  const handleVerify = async () => {
    try {
      if (confirmationResult) {
        const result = await confirmationResult.confirm(code);
        console.log("result", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        onChangeText={setCode}
        keyboardType="phone-pad"
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

export default () => {
  const [confirmationResult, setConfirmationResult] = useState();

  return (
    <View style={styles.container}>
      {!confirmationResult ? (
        <PhoneSignIn setConfirmationResult={setConfirmationResult} />
      ) : (
        <PhoneVerification confirmationResult={confirmationResult} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
