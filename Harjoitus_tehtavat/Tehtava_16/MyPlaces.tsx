import { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';
import { Button, Text, TextInput, List, Divider } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Address = {
    id: number;
    address: string;
};

type Props = NativeStackScreenProps<RootStackParamList, 'MyPlaces'>;

const openDb = () => SQLite.openDatabaseAsync('addressdb');

export default function MyPlaces({ navigation }: Props) {
    const [address, setAddress] = useState('');
    const [addressList, setAddressList] = useState<Address[]>([]);

    const updateAddressList = async () => {
        const db = await openDb();
        const list = await db.getAllAsync<Address>(
            'SELECT * FROM address ORDER BY id'
        );
        setAddressList(list);
    };

    const initialize = async () => {
        const db = await openDb();
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS address (
                id INTEGER PRIMARY KEY NOT NULL,
                address TEXT NOT NULL
            );
        `);
        await updateAddressList();
    };

    const handleSave = async () => {
        const trimmed = address.trim();
        if (!trimmed) {
            Alert.alert('Write address');
            return;
        }
        try {
            const db = await openDb();
            await db.runAsync('INSERT INTO address (address) VALUES (?)', trimmed);
            setAddress('');
            await updateAddressList();
        } catch (error) {
            console.error('Error saving address:', error);
            Alert.alert('Saving address failed');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const db = await openDb();
            await db.runAsync('DELETE FROM address WHERE id = ?', id);
            await updateAddressList();
        } catch (error) {
            console.error('Error deleting address:', error);
            Alert.alert('Error deleting address');
        }
    };

    useEffect(() => {
        initialize().catch(error => {
            console.error('Database initialization failed:', error);
            Alert.alert('Database initialization failed:');
        });
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                label="PLACE FINDER"
                placeholder="Type in address"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
            />

            <Button
                mode="contained"
                icon="content-save"
                onPress={handleSave}
                style={styles.saveButton}
            >
                SAVE
            </Button>

            <FlatList
                data={addressList}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={Divider}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No addresses.</Text>
                }
                renderItem={({ item }) => (
                    <List.Item
                        title={item.address}
                        titleNumberOfLines={1}
                        onPress={() =>
                            navigation.navigate('Map', { address: item.address })
                        }
                        onLongPress={() => handleDelete(item.id)}
                        right={() => (
                            <View style={styles.right}>
                                <Text style={styles.showOnMap}>show on map</Text>
                            </View>
                        )}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    input: {
        marginBottom: 10,
    },
    saveButton: {
        marginBottom: 16,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    showOnMap: {
        color: '#999',
        fontSize: 12,
    },
});