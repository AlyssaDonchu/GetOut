// import { StackScreenProps } from '@react-navigation/stack';

// export type AppEvent = {
//   id: string;
//   title: string;
//   description: string;
//   fullDescription: string;
//   image: string;
// };

// export type RootStackParamList = {
//   CreateEvent: { addEvent: (event: AppEvent) => void };
//   Home: undefined;
// };

// export type HomeScreenNavigationProp = StackScreenProps<RootStackParamList, 'Home'>;

// types.ts
import { StackScreenProps } from "@react-navigation/stack";

export type AppEvent = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
};

export type RootStackParamList = {
  SignIn: undefined;
  Home: undefined;
  CreateEvent: { addEvent: (event: AppEvent) => void };
  PhoneSignInScreen: undefined;
};

export type HomeScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "Home"
>;
export type CreateEventScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  "CreateEvent"
>;
