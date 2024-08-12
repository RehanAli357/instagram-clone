import { RouteProp, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Landing: undefined;
  Search: undefined;
  Reels: undefined;
  Story: { someParam: string }; 
  User: undefined;
};

export type StoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Story'
>;

export type StoryScreenRouteProp = RouteProp<RootStackParamList, 'Story'>;

export type StoryScreenProps = {
  navigation: StoryScreenNavigationProp;
  route: StoryScreenRouteProp;
};
