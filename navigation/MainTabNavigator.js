import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import NewsScreen from '../screens/NewsScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import CollectionScreen from '../screens/CollectionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DecksScreen from '../screens/DecksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddCollection from '../screens/AddCollectionScreen';
import AddWantList from '../screens/AddWantListScreen';
import DeckListScreen from '../screens/DeckListScreen';
import CreateDeckScreen from '../screens/CreateDeckScreen';
import MessageUserScreen from '../screens/MessageUserScreen';
import BanlistScreen from '../screens/BanlistScreen';
import CardListScreen from '../screens/CardListScreen';
import CharacteristicsScreen from '../screens/CharacteristicsScreen';
import CommunityMembersScreen from '../screens/CommunityMembersScreen';
import CommunityDeckScreen from '../screens/CommunityDecksScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ChatScreen from '../screens/ChatScreen';
import StartChatScreen from '../screens/StartChatScreen';
import CardScreen from '../screens/CardScreen';
import AddToDeckScreen from '../screens/AddToDeckScreen';

const NewsStack = createStackNavigator({
  News: NewsScreen,
  Profile: ProfileScreen,
  Card: CardScreen,
  OtherCard: CardScreen,
  AddtoWantList: AddWantList,
  CommunityMembers: CommunityMembersScreen,
  CommunityDecks: CommunityDeckScreen,
  AddtoCollection: AddCollection,
  Banlist: BanlistScreen,
  CardList: CardListScreen,
  MessageUser: MessageUserScreen,
  DeckList: DeckListScreen,
  Characteristics: CharacteristicsScreen,
  ChatList: ChatListScreen,
  Chat: ChatScreen,
  StartChat: StartChatScreen,
  Search: SearchScreen,
  SearchResults: SearchResultsScreen,
});

NewsStack.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list-box' : 'md-list-box'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  SearchResults: SearchResultsScreen,
  Card: CardScreen,
  OtherCard: CardScreen,
  MessageUser: MessageUserScreen,
  AddtoWantList: AddWantList,
  Profile: ProfileScreen,
  StartChat: StartChatScreen,
  Chat: ChatScreen,
  AddtoCollection: AddCollection,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const CollectionStack = createStackNavigator({
  Collection: CollectionScreen,
  Card: CardScreen,
  OtherCard: CardScreen,
  Profile: ProfileScreen,
  StartChat: StartChatScreen,
  Chat: ChatScreen,
  Search: SearchScreen,
  SearchResults: SearchResultsScreen,
  MessageUser: MessageUserScreen,
  AddtoWantList: AddWantList,
  AddtoCollection: AddCollection,
});

CollectionStack.navigationOptions = {
  tabBarLabel: 'Collection',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />
  ),
};

const DecksStack = createStackNavigator({
  Decks: DecksScreen,
  DeckList: DeckListScreen,
  CreateDeck: CreateDeckScreen,
  Card: CardScreen,
  OtherCard: CardScreen,
  MessageUser: MessageUserScreen,
  Profile: ProfileScreen,
  StartChat: StartChatScreen,
  Chat: ChatScreen,
  MessageUser: MessageUserScreen,
  Search: SearchScreen,
  SearchResults: SearchResultsScreen,
  AddToDeck: AddToDeckScreen,
});

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'logo-buffer' : 'logo-buffer'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  MyProfile: {screen: ProfileScreen, params: {user: 'self'}},
  Setting: SettingsScreen,
  Card: CardScreen,
  OtherCard: CardScreen,
  Profile: ProfileScreen,
  StartChat: StartChatScreen,
  Chat: ChatScreen,
  MessageUser: MessageUserScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};
const TabNavigator = createBottomTabNavigator({
  NewsStack,
  SearchStack,
  CollectionStack,
  DecksStack,
  ProfileStack,
});
export default createAppContainer(TabNavigator);
