import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

type Shopping = {
  id: number;
  product: string;
  amount: string;
};

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState<Shopping[]>([]);

  const initialize = async () => {
    //Tietokanta nimeltä shoppingdb avataan, jos ei ole niin luo
    const db = await SQLite.openDatabaseAsync('shoppingdb');

    //luodaan taulu
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS shopping (
        id INTEGER PRIMARY KEY NOT NULL,
        product TEXT NOT NULL,
        amount TEXT NOT NULL
      );
    `);
    updateShoppingList();
  };

  const updateShoppingList = async () => {
    const db = await SQLite.openDatabaseAsync('shoppingdb');

    const list = await db.getAllAsync<Shopping>(
      'SELECT * FROM shopping ORDER BY id'
    );

    setShoppingList(list);
  };

  const handleSave = async () => {
    if (!product || !amount) return;

    const db = await SQLite.openDatabaseAsync('shoppingdb');

    await db.runAsync(
      'INSERT INTO shopping (product, amount) VALUES (?, ?)',
      product,
      amount
    );

    setProduct('');
    setAmount('');
    updateShoppingList();
  };

  const handleBought = async (id: number) => {
    const db = await SQLite.openDatabaseAsync('shoppingdb');

    await db.runAsync(
      'DELETE FROM shopping WHERE id = ?',
      id
    );

    updateShoppingList();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.border}
        placeholder="Product"
        onChangeText={setProduct}
        value={product}
      />

      <TextInput
        style={styles.border}
        placeholder="Amount"
        onChangeText={setAmount}
        value={amount}
      />

      <Button
        onPress={handleSave}
        title="SAVE"
      />

      <Text style={styles.title}>Shopping list</Text>

      {shoppingList.map(item => (
        <View style={styles.item} key={item.id}>
          <Text>
            {item.product}, {item.amount}
          </Text>

          <Button
            title="bought"
            onPress={() => handleBought(item.id)}
          />
        </View>
      ))}

      <StatusBar style="auto" />
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

  border: {
    width: 275,
    height: 40,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
  },

  title: {
    fontSize: 20,
    marginTop: 40,
    marginBottom: 15,
  },

  item: {
    width: 275,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});