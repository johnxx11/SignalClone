import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, Text, View, Image, useWindowDimensions } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" 
      component={HomeScreen} 
      options={{ headerTitle: HomeHeader}}
      />
      <Stack.Screen name="ChatRoom" 
      component={ChatRoomScreen}
      options={{ 
        headerTitle: ChatRoomHeader, 
        headerBackTitleVisible: false,
      }}/>
      <Stack.Screen name="UsersScreen" 
      component={UsersScreen}
      options={{ 
        title: "Users", 
      }}/>
      <Stack.Screen name="NotFound" 
      component={NotFoundScreen} 
      options={{ title: 'Oops!'}} 
      />
    </Stack.Navigator>
  );
}

const HomeHeader = (props) => {

  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      width,
      padding: 10,
      alignItems: 'center', 
      }}>
      <Image 
        source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg'}}
        style={{width: 30, height: 30, borderRadius: 30}}
      />
      <Text style={{flex: 1, textAlign: 'center', marginLeft: 35, fontWeight: 'bold'}}>Signal</Text>
      <Feather name="camera" size={24} color="black" style={{marginHorizontal: 10}}/>
      <Pressable onPress ={() => navigation.navigate('UsersScreen')}>
        <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 10}}/>
      </Pressable>
    </View>
    
  );
};

const ChatRoomHeader = (props) => {

  const {width} = useWindowDimensions();
  return (
    <View style={{ 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      width: width - 25,
      marginRight: 100,
      padding: 10,
      alignItems: 'center', 
      }}>
      <Image 
        source={{ uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg'}}
        style={{width: 30, height: 30, borderRadius: 30}}
      />
      <Text style={{flex: 1, marginLeft: 10, fontWeight: 'bold'}}>{props.children}</Text>
      <Feather name="camera" size={24} color="black" style={{marginHorizontal: 10}}/>
      <Feather name="edit-2" size={24} color="black" style={{marginHorizontal: 10}}/>
    </View>
    
  );
};