import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './Calculator'
import History from './History'
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
        return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Calculator" component={Calculator} />
            <Stack.Screen name="History" component={History} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

