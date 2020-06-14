import React from "react";
import { Content, View, Text } from "native-base";
import { AppContext } from "../providers/AppProvider";
import { Platform } from "react-native";

const s = {
  padding: 10,
  borderWidth: 2,
  borderRadius: 5,
  marginBottom: 5,
  borderColor: "#ebebeb",
};

function MessageListComponent({ messages = [] }) {
  const sref = React.useRef();
  const { state } = React.useContext(AppContext);

  const renderedMessages = messages.map((message) => {
    if (state.user.id === message.user_id) {
      return (
        <View
          key={message.id}
          style={{ ...s, backgroundColor: "#ebebeb", marginLeft: 25 }}
        >
          <Text style={{ lineHeight: 25 }}>{message.message}</Text>
          <Text note style={{ marginTop: 5 }}>
            {message.created_at}
          </Text>
        </View>
      );
    }

    return (
      <View key={message.id} style={{ ...s, marginRight: 25 }}>
        {/* <Text note>
          {message.user.first_name} {message.user.last_name}
        </Text> */}
        <Text style={{ lineHeight: 25 }}>{message.message}</Text>
        <Text note style={{ marginTop: 5 }}>
          {message.created_at}
        </Text>
      </View>
    );
  });

  return (
    <Content
      padder
      ref={sref}
      onContentSizeChange={() => {
        if (Platform.OS == "android") {
          sref.current._root.scrollToEnd();
        }
      }}
    >
      {renderedMessages}
    </Content>
  );
}

export default MessageListComponent;
