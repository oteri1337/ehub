import React from "react";
import { BACKEND_URL } from "../../../env";
import { View, Text, Icon, Toast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import MessageFormComponent from "./MessageFormComponent";
import {
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Clipboard,
} from "react-native";
import { Store, getRequestThenDispatch } from "../../providers/AppProvider";

const s = {
  padding: 10,
  borderWidth: 2,
  borderRadius: 10,
  marginBottom: 5,
  borderColor: "#e7e6e6",
  backgroundColor: "white",
};

function ItemPureFunctional({ message }) {
  const navigation = useNavigation();
  const { state } = React.useContext(Store);

  let marginLeft = 0;
  let marginRight = 25;

  if (message.user_id === state.user.id) {
    marginLeft = 25;
    marginRight = 0;
  }

  return React.useMemo(() => {
    // user message
    if (message.user_id === state.user.id && message.type === 0) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (!message.chat_id) {
              navigation.navigate("CommentsReadPage", message);
            }
          }}
          onLongPress={() => {
            Clipboard.setString(message.data);
            Toast.show({ text: "Copied" });
          }}
        >
          <View style={{ ...s, marginLeft: 25, backgroundColor: "#e2eefe" }}>
            <Text>{message.data}</Text>
            <Text note style={{ marginTop: 5 }}>
              {message.created_at}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    // image message
    if (message.type == 1) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            // if (!message.chat_id) {
            navigation.navigate("CommentsReadPage", message);
            // }
          }}
        >
          <View style={{ ...s, marginLeft, marginRight }}>
            <Image
              resizeMode="contain"
              source={{
                uri: `${BACKEND_URL}/uploads/images/${message.data}`,
              }}
              style={{ height: 400 }}
            />
            <Text note style={{ marginTop: 5 }}>
              {message.created_at}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    //  pdf message
    if (message.type == 2) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("CommentsReadPage", message);
          }}
        >
          <View style={{ ...s, marginRight, marginLeft }}>
            <Text>
              <Icon name="book" type="Feather" /> {message.data}
            </Text>
            <Text note style={{ marginTop: 5 }}>
              {message.created_at}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    // others messagez
    return (
      <TouchableWithoutFeedback
        onLongPress={() => {
          Clipboard.setString(message.data);
          Toast.show({ text: "Copied" });
        }}
      >
        <View style={{ ...s, marginRight: 25 }}>
          {message.user ? (
            <Text note style={{ marginBottom: 5 }}>
              {message.user.first_name} {message.user.last_name}
            </Text>
          ) : (
            <React.Fragment />
          )}
          <Text>{message.data}</Text>
          <Text note style={{ marginTop: 5 }}>
            {message.created_at}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }, [message]);
}

function MessageListComponent(props) {
  let { onSubmit, onImage, type } = props;
  const { data = [], list, image = "", next_dispatch = "" } = props;
  const sref = React.useRef();
  const navigation = useNavigation();
  const { state, refreshing, send } = getRequestThenDispatch();

  const renderLoadMore = () => {
    if (!refreshing) {
      if (list?.next_page_url && list.comments_count > 12) {
        return (
          <Text
            style={{ padding: 10, textAlign: "center" }}
            onPress={() => {
              send(list.next_page_url, next_dispatch);
            }}
          >
            Load Older
          </Text>
        );
      }
      return <React.Fragment />;
    } else {
      return <Text style={{ padding: 10 }}>Fetching ...</Text>;
    }
  };

  const ListHeaderComponent = () => {
    if (list?.data?.length) {
      return (
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (state.user.id == list.user_id) {
                navigation.navigate("CommentsReadPage", list);
              }
            }}
          >
            <View style={s}>
              {image.length ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("CommentsReadPage", {
                      type: 1,
                      data: image,
                    });
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={{ uri: `${BACKEND_URL}/uploads/images/${image}` }}
                    style={{ minHeight: 250 }}
                  />
                </TouchableWithoutFeedback>
              ) : (
                <React.Fragment />
              )}
              <Text note style={{ marginBottom: 5 }}>
                {list?.user?.first_name} {list?.user?.last_name}
              </Text>
              <Text style={{ lineHeight: 25 }}>{list?.data}</Text>
              <Text note style={{ marginTop: 5 }}>
                {list.created_at}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {renderLoadMore()}
        </View>
      );
    }
    return renderLoadMore();
  };

  const onMessageHook = () => {
    sref.current.scrollToEnd({ animated: false });
  };

  return (
    <React.Fragment>
      <View style={{ flex: 1 }}>
        <FlatList
          ref={sref}
          data={data}
          refreshing={refreshing}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => {
            return <ItemPureFunctional message={item} list={list} />;
          }}
          onContentSizeChange={() => {
            if (type == "chat") {
              sref.current.scrollToEnd({ animated: false });
            }
          }}
        />
      </View>
      <MessageFormComponent {...{ onMessageHook, onSubmit, onImage }} />
    </React.Fragment>
  );
}

export default MessageListComponent;
