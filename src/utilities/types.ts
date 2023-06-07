import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  FirstPage: undefined;
  SecondPage: { info: string };
  PageWithPaper: undefined;
};

export type FirstPageProps = NativeStackScreenProps<
  RootStackParamList,
  "FirstPage"
>;

export type SecondPageProps = NativeStackScreenProps<
  RootStackParamList,
  "SecondPage"
>;
