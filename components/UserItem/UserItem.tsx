import React from 'react';
import { Text, Image, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, User } from '../../src/models';
import { ChatRoomUser } from '../../src/models';

export default function UserItem({ user }) {
  
  const navigation = useNavigation();

  const onPress = async () => {
    //if there is already a chatroom between 2 users then redirect to the existing chat room
    
    // create a chat room
    const newChatRoom = await DataStore.save(new ChatRoom({newMessages: 0}));
    // connect authenticated user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    await DataStore.save(new ChatRoomUser({
      user: dbUser,
      chatRoom: newChatRoom
    }))

    // connect clicked user with the chat room
    await DataStore.save(new ChatRoomUser({
      user,
      chatRoom: newChatRoom
    }));
    navigation.navigate('ChatRoom', { id: newChatRoom.id });
  }
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <Image source={{uri:user.imageUri}} style={styles.image} />


        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
        </View>
      </Pressable>
    );
}
