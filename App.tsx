import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert} from 'react-native';

export default function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [randomNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [guesses, setGuesses] = useState(0)

  const handlePress = () => {
    const guess = Number(number);
    const newGuesses = guesses + 1;

    setGuesses(newGuesses);

    if (guess < randomNumber) {
      setResult(`Your guess ${guess} is too low`);
    } else if (guess > randomNumber) {
      setResult(`Your guess ${guess} is too high`);
    } else {
      Alert.alert(`Correct! You guessed the number in ${newGuesses} guesses.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Guess a number between 1-100</Text>
      <View>
        <TextInput
          style={styles.inputBox}

          keyboardType='numeric'
          onChangeText={text => setNumber(text)}
          value={number}
        />
      </View>

      <View style={styles.button}>
        <Button title="Make Guess" onPress={handlePress} />
      </View>

      <Text style={styles.result}>{result}</Text>
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

  button: {
    flexDirection: 'row',
    marginTop: 25
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

  result: {
    fontSize: 18,
    marginTop: 25,
  },
});
