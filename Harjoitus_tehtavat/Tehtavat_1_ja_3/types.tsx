export type RootStackParamList = {
  Calculator: undefined;
  History: {history: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;