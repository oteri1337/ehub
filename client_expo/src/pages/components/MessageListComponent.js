import React from "react";
import { BACKEND_URL } from "../../../env";
import { Platform, Image } from "react-native";
import { Content, View, Text } from "native-base";
import { AppContext } from "../../providers/AppProvider";

const s = {
  padding: 10,
  borderWidth: 2,
  borderRadius: 5,
  marginBottom: 5,
  borderColor: "#ebebeb",
};

function MessageListComponent({ messages = [], top = "", user, image = "" }) {
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
        <Text style={{ lineHeight: 25 }}>{message.message}</Text>
        <Text note style={{ marginTop: 5 }}>
          {message.created_at}
        </Text>
      </View>
    );
  });

  const renderTop = () => {
    if (top.length) {
      return (
        <View style={s}>
          {image.length ? (
            <Image
              source={{ uri: `${BACKEND_URL}/uploads/images/${image}` }}
              style={{ height: 400 }}
            />
          ) : (
            <React.Fragment />
          )}
          <Text note style={{ marginBottom: 5 }}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text>{top}</Text>
        </View>
      );
    }
    return <React.Fragment />;
  };

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
      {renderTop()}
      {renderedMessages}
    </Content>
  );
}

export default MessageListComponent;
