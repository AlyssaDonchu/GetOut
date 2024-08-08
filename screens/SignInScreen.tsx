// screens/SignInScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSignIn = () => {
    const actionCodeSettings = {
      url: 'http://localhost:8081', // Ensure this is correct
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        Alert.alert('Check your email for the sign-in link');
      })
      .catch((error) => {
        console.error('Error sending email link:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default SignInScreen;
