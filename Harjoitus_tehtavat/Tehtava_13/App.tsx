
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from 'react-native';

import {
  Contact,
  requestPermissionsAsync,
  ContactsSortOrder,
  ContactField,
} from 'expo-contacts';

import type { PartialContactDetails } from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState<
    PartialContactDetails<
      [ContactField.FULL_NAME, ContactField.PHONES]
    >[]
  >([]);

  const getContacts = async () => {
    const { status } = await requestPermissionsAsync();

    if (status === 'granted') {
      const contacts = await Contact.getAllDetails(
        [ContactField.FULL_NAME, ContactField.PHONES],
        {
          sortOrder: ContactsSortOrder.FamilyName,
        }
      );

      setContacts(contacts);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} />

      <FlatList
        style={styles.list}
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contact}>
            <Text style={styles.name}>
              {item.fullName}
            </Text>

            <Text>
              {item.phones?.[0]?.number ?? 'No phone number'}
            </Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  list: {
    marginTop: 20,
  },

  contact: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
