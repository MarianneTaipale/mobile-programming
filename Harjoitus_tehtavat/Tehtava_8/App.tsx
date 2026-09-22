import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TextInput } from 'react-native';
import { Button } from 'react-native';

const API_KEY = '6aabd65b1ac27673508071dws14becc';

export default function App() {

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })

  const [address, setAddress] = useState('');

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 60.201373,
    longitude: 24.934041,
  })

  const handleLocation = async () => {
    try {
      const response = await fetch(
        `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${API_KEY}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const latitude = parseFloat(data[0].lat);
        const longitude = parseFloat(data[0].lon);

        setMarkerCoordinate({ latitude, longitude });
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <MapView
        style={{ width: '100%', height: '80%' }}
        region={region}>

        <Marker
          coordinate={markerCoordinate}
        />
      </MapView>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Button title='SHOW' onPress={handleLocation} />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    fontSize: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});