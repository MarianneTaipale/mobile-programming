import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [item, setItem] = useState("")
  const [list, setList] = useState<string[]>([]);

  const handleItem = () => {

    setList([
      ...list,
      item,
    ]);

    setItem("");
  };

  const handleClear = () => {
    setList([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.allign}>

      <TextInput
        style={styles.input}
        value={item}
        onChangeText={Text => setItem(Text)}
      />

      <View style={styles.buttons}>
        <Button title="ADD" onPress={handleItem}/>
        <Button title="CLEAR" onPress={handleClear}/>
      </View>

      <Text style={styles.title}>
        Shopping List
      </Text>

      <FlatList
        data={list}
        renderItem={({item}) => (
          <Text style={styles.item}>
            {item}
          </Text>
        )}
        />

    
      <StatusBar style="auto" />
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

  input: {
    width: 250,
    height: 40,
    borderWidth: 1,
    padding: 10,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    color: 'blue'
  },

  item: {
    fontSize: 18,
    marginTop: 5,
  },

  allign: {
    width: '85%',
    marginTop: 10,
    alignItems: 'center'
  },
});
