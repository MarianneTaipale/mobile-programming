
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { getDatabase, ref, push, onValue } from "firebase/database";
import { app } from './firebaseConfig';
import { FlatList } from 'react-native';

type Product = {
  title: string;
  amount: string;
};

const database = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState<Product>({
    title: '',
    amount: ''
  });

  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    return onValue(ref(database, 'items/'), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        setItems(Object.values(data) as Product[]);
      } else {
        setItems([]);
      }
    });
  }, []);

  const handleSave = () => {
    if (product.amount && product.title) {
      push(ref(database, 'items/'), product);

      setProduct({
        title: '',
        amount: ''
      });
    } else {
      Alert.alert('Type product and amount');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.border}
        placeholder="Product"
        onChangeText={text =>
          setProduct({ ...product, title: text })
        }
        value={product.title}
      />

      <TextInput
        style={styles.border}
        placeholder="Amount"
        onChangeText={text =>
          setProduct({ ...product, amount: text })
        }
        value={product.amount}
      />

      <Button onPress={handleSave} title="Save" />

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 18 }}>
              {item.title}, {item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
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
    marginTop: 20,
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