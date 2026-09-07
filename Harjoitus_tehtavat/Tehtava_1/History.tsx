import {
    StyleSheet, Text, View, TextInput, Button,
    FlatList
} from 'react-native';
import { RootStackScreenProps } from './types';

export default function History({ route }: RootStackScreenProps<'History'>) {
    const { history } = route.params

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, marginTop: 30 }}>
                History
            </Text>

            <FlatList
                style={{ marginTop: 5 }}
                data={history}
                renderItem={({ item }) => (
                    <Text style={styles.titleText}>{item.title} = {item.result}
                    </Text>
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
        justifyContent: 'center',
    },
    
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

