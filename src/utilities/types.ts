import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  FirstPage: undefined;
  SecondPage: { info: string };
  PageWithPaper: undefined;

  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type FirstPageProps = NativeStackScreenProps<
  RootStackParamList,
  "FirstPage"
>;

export type SecondPageProps = NativeStackScreenProps<
  RootStackParamList,
  "SecondPage"
>;

export type Person = {
  id: string;
  job: string;
  location: string;
  name: string;
  points: number;
  profilePicture: string;
  badges: string[];
  avatar: string;
};

export type Notification = {
  id: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  points: number;
};

export type SearchPageStackParamList = {
  SearchPage: undefined;
  LeaderboardPage: undefined;
  PersonProfilePage: { id: string };
};

export type SearchPageProps = NativeStackScreenProps<
  SearchPageStackParamList,
  "SearchPage"
>;

export type LeaderboardPageProps = NativeStackScreenProps<
  SearchPageStackParamList,
  "LeaderboardPage"
>;

export type PersonProfilePageProps = NativeStackScreenProps<
  SearchPageStackParamList,
  "PersonProfilePage"
>;
