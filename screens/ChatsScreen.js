import { StyleSheet, Text, View ,ScrollView, Pressable} from "react-native";
import React, { useContext,useEffect,useState } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../components/UserChat";
import { API_BASE_URL } from "../api/constants/api";


const ChatsScreen = () => {
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/accepted-friends/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("error showing the accepted friends", error);
      }
    };

    acceptedFriendsList();
  }, []);
  console.log("friends",acceptedFriends)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
          {acceptedFriends.map((item,index) => (
              <UserChat key={index} item={item}/>
          ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
