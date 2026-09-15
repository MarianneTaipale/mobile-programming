import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; //Valuuttavalikko
import { getExchangeRates } from "./api"; //Hakee valuttakurssit API:sta

export default function App() {

  const [rates, setRates] = useState<Record<string, number>>({}); //Tallennetaan API:sta saadut valuuttakurssit
  const [currency, setCurrency] = useState("GBP"); //Valittu valuutta + oletus
  const [amount, setAmount] = useState(""); //käyttäjän kirjoittama rahamäärä
  const [result, setResult] = useState<number | null>(null); //muutoksen tulos euroina

  //haetaan valuuttakurssit
  useEffect(() => {
    getExchangeRates().then((data) => {
      setRates(data);
    });
  }, []);

  //käyttäjä painaa convert, niin suoritetaan
  const convert = () => {
    const amountNumber = Number(amount);
    const rate = rates[currency];

    if (!isNaN(amountNumber) && rate) {
      setResult(amountNumber / rate);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.label}>Amount to convert</Text>
      
      {/* Käyttäjä kirjoittaa tähän rahamäärän */}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="Enter amount"
      />

      <Text style={styles.label}>Currency</Text>

      <View style={styles.pickerContainer}>

        {/* Käyttäjä valitsee valuutan */}
        <Picker
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}
        >
          {/* Valikkoon vaihtoehdot API:sta saaduista valuutoista */}
          {Object.keys(rates).map((code) => (
            <Picker.Item
              key={code}
              label={code}
              value={code}
            />
          ))}
        </Picker>
      </View>

      <Pressable
        style={styles.button}
        onPress={convert}
      >
        <Text style={styles.buttonText}>Convert</Text>
      </Pressable>

      {/* Näytetään tulos vain, jos muunnos on tehty */}
      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            {result.toFixed(2)} EUR
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 80,
  },

  label: {
    fontSize: 16,
    marginBottom: 8,
  },

  input: {
    width: "100%",
    height: 50,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 25,
    overflow: "hidden",
  },

  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  result: {
    fontSize: 20,
    fontWeight: "bold",
  },
});