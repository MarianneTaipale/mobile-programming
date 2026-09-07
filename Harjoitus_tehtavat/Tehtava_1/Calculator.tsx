import { useState } from 'react';
import {
    StyleSheet, Text, View, TextInput, Button,
} from 'react-native';
import { RootStackScreenProps } from './types';

type CalculatorItem = {
    title: string,
    result: string
}

export default function Calculator({navigation}: RootStackScreenProps<'Calculator'>) {
    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");
    const [result, setResult] = useState("");

    const [history, setHistory] = useState<CalculatorItem[]>([]);

    const handleMinus = () => {
        const answer = Number(number1) - Number(number2);
        setResult(answer.toString());

        setHistory([
            ...history,
            {
                title: `${number1} - ${number2}`,
                result: answer.toString(),
            },
        ]);
    };

    const handlePlus = () => {
        const answer = Number(number1) + Number(number2);
        setResult(answer.toString());

        setHistory([
            ...history,
            {
                title: `${number1} + ${number2}`,
                result: answer.toString(),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.calculator}>
                <Text style={{ fontSize: 20 }}>Result: {result}</Text>
                <View>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Number1'
                        keyboardType='numeric'
                        onChangeText={text => setNumber1(text)}
                        value={number1}
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.inputBox}
                        placeholder='Number2'
                        keyboardType='numeric'
                        onChangeText={text => setNumber2(text)}
                        value={number2}
                    />
                </View>

                <View style={styles.buttons}>
                    <Button title="+" onPress={handlePlus} />
                    <Button title="-" onPress={handleMinus} />
                </View>

                <Button
                title='History'
                onPress={() => navigation.navigate('History', {
                    history: history
                })}
                />
            </View>
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

    result: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    calculator: {
        width: '85%',
        alignItems: 'center'
    },

    buttons: {
        flexDirection: 'row',
        gap: 30,
        marginTop: 25,

    },

    inputBox: {
        height: 30,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        paddingHorizontal: 60,
        fontSize: 16,
        backgroundColor: '#fff',
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    history: {
        width: '100%',
        marginTop: 10,
    },
});

