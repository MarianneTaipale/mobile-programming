import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

export default function MapScreen({ route }: Props) {
    const { address } = route.params;
    const [region, setRegion] = useState<Region | null>(null);

    useEffect(() => {
        const findAddress = async () => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`,
                    { headers: { 'User-Agent': 'PlaceFinderApp/1.0' } }
                );
                const data = await response.json();

                if (!data.length) {
                    Alert.alert('Address not found.');
                    return;
                }

                setRegion({
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            } catch (error) {
                console.error('Error');
                Alert.alert('Error. Search for address failed.');
            }
        };
        findAddress();
    }, [address]);

    if (!region) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <MapView style={styles.map} region={region}>
            <Marker
                coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                }}
                title={address}
            />
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: { flex: 1 },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});