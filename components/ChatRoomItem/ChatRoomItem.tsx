import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoomUser, User, Message } from "../../src/models";
import styles from "./styles";
import Auth from "@aws-amplify/auth";
import { AWS_CLOUDWATCH_BASE_BUFFER_SIZE } from "@aws-amplify/core";

export default function ChatRoomItem({ chatRoom }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User|null>(null);
  
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter(chatRoomUser => chatRoomUser.chatRoom.id == chatRoom.id)
        .map(chatRoomUser => chatRoomUser.user);
      setUsers(fetchedUsers);
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(fetchedUsers.find(user => user.id != authUser.attributes.sub) || null);
    };
    fetchUsers();
  }, []);
  
  const onPress = () => {
    navigation.navigate('ChatRoom', { id: chatRoom.id });
  }
  if (!user) {
    return <ActivityIndicator />
  }
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <Image source={{uri:user.imageUri}} style={styles.image} />

        {!!chatRoom.newMessages && <View style={styles.badgeContainer}> 
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>}

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.text}>{chatRoom.lastMessage?.createdAt}</Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>{chatRoom.lastMessage?.content}</Text>
        </View>
      </Pressable>
    );
}
