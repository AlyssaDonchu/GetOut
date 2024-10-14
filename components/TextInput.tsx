import { Text, StyleSheet, TextInput as RNTextInput } from "react-native";

const TextInput = ({
  onBlur,
  onChange,
  placeholder,
  error,
  value,
  keyboardType,
}) => {
  return (
    <>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        keyboardType={keyboardType}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    borderColor: "#bbbbbb",
    marginHorizontal: 20,
  },
  error: {
    color: "red",
  },
});
