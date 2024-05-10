// useChatClient.js

import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  chatApiKey,
  chatUserId,
  chatUserName,
  chatUserToken,
} from "../chatConfig";
import { useAppContext } from "../AppContext";

const user = {
  id: chatUserId,
  name: chatUserName,
};
const chatClient = StreamChat.getInstance(chatApiKey, {
  timeout: 6 * 1000,
});

const partialUpdateUserNvKhang = async()=>{
  try{
    const updatedUser = await chatClient.partialUpdateUser({
      ...user,
      token: chatUserToken,
      set: {
        friends: [
          {id: "2b866cd5-7b7f-414e-8917-1832179a1a5d", name: "Khôi", email:"khoi123@gmail.com"},
          {id: "75d6a6a1-2c0c-45f6-8538-c5cbd7d601c7", name: "Hamer", email:"hammer1613@gmail.com"},
        ], // Mảng chứa các ID của bạn bè
      },
    });
  }catch(error){
    console.error(
      `An error occurred while update user'prop: ${error.message}`
    );
  }
}

// const deleteUser = async()=>{
//   try{
//     const updatedUser = await chatClient.partialUpdateUser({
//       id:'nvkhang',
//       unset: ['friend_requests'],
//     });
//   }catch(error){
//     console.error(
//       `An error occurred while update user'prop: ${error.message}`
//     );
//   }
// }

// const partialUpdateUser = async () => {
//   try {
//     const updatedUser = await chatClient.partialUpdateUser({
//       ...user,
//       set: {
//         friends: [], // Mảng chứa các ID của bạn bè
//       },
//     });
//   } catch (error) {
//     console.error(`An error occurred while update user'prop: ${error.message}`);
//   }
// };
export const useChatClient = () => {
  const { setChatClient, setUser,setChannelList } = useAppContext();
  const [clientIsReady, setClientIsReady] = useState(false);
  useEffect(() => {
    const setupClient = async () => {
      try {
        const client = chatClient.connectUser(user, chatUserToken);

        setClientIsReady(true);
        setChatClient(chatClient);
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`
          );
        }
      }
    };

    //get user information
    const getUserInfo = async () => {
      try {
        const response = await chatClient.queryUsers({
          id: { $in: [chatUserId] },
        });
        // if (!response.users[0].friends) {
        //   partialUpdateUser();
        // }
        partialUpdateUserNvKhang();
        setUser(response.users[0]);
      } catch (error) {
        console.error(`An error occurred while getting user: ${error.message}`);
      }
    };
    getUserInfo();
    // If the chat client has a value in the field `userID`, a user is already connected
    // and we can skip trying to connect the user again.
    if (!chatClient.userID) {
      setupClient();
    }
  }, []);

  return {
    clientIsReady,
  };
};
