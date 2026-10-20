import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import MapScreen from './Map';
import MyPlaces from './MyPlaces';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MyPlaces">
                    <Stack.Screen
                        name="MyPlaces"
                        component={MyPlaces}
                        options={{ title: 'My Places' }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={MapScreen}
                        options={{ title: 'Map' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}