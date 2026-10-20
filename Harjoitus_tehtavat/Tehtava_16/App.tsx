import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Map from './Map';
import MyPlaces from './MyPlaces';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = 'MyPlaces' component={MyPlaces}/>
        <Stack.Screen name='Map' component={Map}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
