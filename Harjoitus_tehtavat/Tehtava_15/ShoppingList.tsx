
import { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Alert,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

type Shopping = {
    id: number;
    product: string;
    amount: string;
};

export default function ShoppingList() {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList] = useState<Shopping[]>([]);

    const initialize = async () => {
        const db = await SQLite.openDatabaseAsync('shoppingdb');

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS shopping (
                id INTEGER PRIMARY KEY NOT NULL,
                product TEXT NOT NULL,
                amount TEXT NOT NULL
            );
        `);

        await updateShoppingList();
    };

    const updateShoppingList = async () => {
        const db = await SQLite.openDatabaseAsync('shoppingdb');

        const list = await db.getAllAsync<Shopping>(
            'SELECT * FROM shopping ORDER BY id'
        );

        setShoppingList(list);
    };

    const handleSave = async () => {
        if (!product.trim() || !amount.trim()) {
            Alert.alert('Error', 'Enter both product and amount.');
            return;
        }

        try {
            const db = await SQLite.openDatabaseAsync('shoppingdb');

            await db.runAsync(
                'INSERT INTO shopping (product, amount) VALUES (?, ?)',
                product.trim(),
                amount.trim()
            );

            setProduct('');
            setAmount('');

            await updateShoppingList();
        } catch (error) {
            console.error('Error saving item:', error);
            Alert.alert('Error', 'Could not save the item.');
        }
    };

    const handleBought = async (id: number) => {
        try {
            const db = await SQLite.openDatabaseAsync('shoppingdb');

            await db.runAsync(
                'DELETE FROM shopping WHERE id = ?',
                id
            );

            await updateShoppingList();
        } catch (error) {
            console.error('Error deleting item:', error);
            Alert.alert('Error', 'Could not remove the item.');
        }
    };

    useEffect(() => {
        initialize().catch(error => {
            console.error('Database initialization failed:', error);
            Alert.alert('Error', 'Could not initialize the database.');
        });
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                label="Product"
                value={product}
                onChangeText={setProduct}
            />

            <TextInput
                style={styles.input}
                label="Amount"
                value={amount}
                onChangeText={setAmount}
            />

            <Button
                mode="contained"
                icon="content-save"
                onPress={handleSave}
                style={styles.saveButton}
            >
                SAVE
            </Button>

            <ScrollView style={styles.list}>
                {shoppingList.map(item => (
                    <View style={styles.item} key={item.id}>
                        <Text style={styles.itemText}>
                            {item.product}, {item.amount}
                        </Text>

                        <Button
                            mode="outlined"
                            onPress={() => handleBought(item.id)}
                        >
                            BOUGHT
                        </Button>
                    </View>
                ))}

                {shoppingList.length === 0 && (
                    <Text style={styles.emptyText}>
                        Your shopping list is empty.
                    </Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 16,
    },
    input: {
        width: '100%',
        marginBottom: 10,
    },
    saveButton: {
        marginBottom: 20,
    },
    list: {
        flex: 1,
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    itemText: {
        flex: 1,
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});
