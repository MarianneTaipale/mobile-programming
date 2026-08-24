import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState("");

  const handleMinus = () => {
    const answer = Number(number1) - Number(number2);
    setResult(answer.toString());
  };

  const handlePlus = () => {
    const answer = Number(number1) + Number(number2);
    setResult(answer.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20}}>Result: {result}</Text>
      <View>
        <TextInput
          style={styles.inputBox}
          placeholder='Number1'
          keyboardType='numeric'
          onChangeText={text => setNumber1(text)}
          value={number1}
        />
      </View>

      <View>
        <TextInput
          style = {styles.inputBox}
          placeholder='Number2'
          keyboardType='numeric'
          onChangeText={text => setNumber2(text)}
          value={number2}
        />
      </View>

      <View style={styles.buttons}>
        <Button title="+" onPress={handlePlus} />
        <Button title="-" onPress={handleMinus} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  buttons: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 25,

  },

  inputBox: {
    height: 30,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 60,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

