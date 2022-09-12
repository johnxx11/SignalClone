import React, { useState, useEffect } from 'react';
import { Text, Image, Pressable, View, StyleSheet, FlatList } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import ChatRoomItem from '../components/ChatRoomItem';
import { ChatRoom, ChatRoomUser } from '../src/models';


export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
      const fetchChatRooms = async() => {
        const userData = await Auth.currentAuthenticatedUser();
        const chatRooms = await (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.user.id == userData.attributes.sub)
        .map(chatRoomUser => chatRoomUser.chatRoom);
        setChatRooms(chatRooms);
      };
      fetchChatRooms();
  }, []);

  const Logout = () => {
    Auth.signOut();
  }
  return (
    <View style={styles.page}>
      {/*<FlatList 
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item}/>}
        showsVerticalScrollIndicator={false}
      />
      <Pressable onPress={Logout} 
      style={{backgroundColor: '#3777f0', height: 50, margin: 10, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Logout</Text>
  </Pressable>*/} 
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1
  }
});