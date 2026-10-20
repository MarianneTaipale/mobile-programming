import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Appbar } from 'react-native-paper';
import ShoppingList from './ShoppingList';

export default function App() {
  return (
    <PaperProvider>
      <Appbar.Header elevated>
        <Appbar.Content title="Shopping list"/>
      </Appbar.Header>
      <ShoppingList/>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}