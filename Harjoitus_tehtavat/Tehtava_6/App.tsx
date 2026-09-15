import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';

type Meals = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}


export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [meals, setMeals] = useState<Meals[]>([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(response => {return response.json()})
      .then(data => setMeals(data.meals))
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Enter ingredient'
        value={ingredient}
        onChangeText={text => setIngredient(text)}
      />
      <Button title="FIND" onPress={handleFetch} />
      <FlatList
        data={meals}
        renderItem={({ item }) =>
          <View>
            <Text style={styles.title}>
              {item.strMeal}
            </Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            />
          </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },

  input: {
    fontSize: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },

  recipe: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 10,
  },
});
