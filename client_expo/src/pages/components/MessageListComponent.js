import React from "react";
import { BACKEND_URL } from "../../../env";
import {
  Platform,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Content, View, Text } from "native-base";
import { AppContext } from "../../providers/AppProvider";

const s = {
  padding: 10,
  borderWidth: 2,
  borderRadius: 5,
  marginBottom: 5,
  borderColor: "#e7e6e6",
};

function MessageListComponent({ messages = [], top = "", user, image = "" }) {
  const sref = React.useRef();
  const { state } = React.useContext(AppContext);

  const _keyboardDidShow = () => {
    console.log("show");
    // sref.current._root.scrollToEnd();
  };

  React.useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
    };
  }, []);

  const renderedMessages = messages.map((message) => {
    if (state.user.id === message.user_id) {
      return (
        <View
          key={message.id}
          style={{ ...s, backgroundColor: "#e7e6e6", marginLeft: 25 }}
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
        {message.user ? (
          <Text note style={{ marginBottom: 5 }}>
            {message.user.first_name} {message.user.last_name}
          </Text>
        ) : (
          <React.Fragment />
        )}
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
    <View style={{ flex: 1 }}>
      <Content
        padder
        ref={sref}
        onContentSizeChange={() => {
          if (Platform.OS == "android") {
            // sref.current._root.scrollToEnd();
          }
        }}
      >
        {renderTop()}
        {renderedMessages}
      </Content>
    </View>
  );
}

export default MessageListComponent;
