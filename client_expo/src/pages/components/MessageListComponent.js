import React from "react";
import { View, Text, Icon } from "native-base";
import { BACKEND_URL } from "../../../env";
import { useNavigation } from "@react-navigation/native";
import { Image, FlatList, TouchableWithoutFeedback } from "react-native";
import { Store, getRequestThenDispatch } from "../../providers/AppProvider";

const s = {
  padding: 10,
  borderWidth: 2,
  borderRadius: 5,
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
    console.log("rendering message", message.id);

    // user message
    if (message.user_id === state.user.id && message.type === 0) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (!message.chat_id) {
              navigation.navigate("CommentsReadPage", message);
            }
          }}
        >
          <View style={{ ...s, marginLeft: 25 }}>
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
            if (!message.chat_id) {
              navigation.navigate("CommentsReadPage", message);
            }
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
    );
  }, [message]);
}

function MessageListComponent({
  data = [],
  list,
  image = "",
  next_dispatch = "",
}) {
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
                <Image
                  resizeMode="contain"
                  source={{ uri: `${BACKEND_URL}/uploads/images/${image}` }}
                  style={{ minHeight: 250 }}
                />
              ) : (
                <React.Fragment />
              )}
              <Text note style={{ marginBottom: 5 }}>
                {list?.user?.first_name} {list?.user?.last_name}
              </Text>
              <Text>{list?.data}</Text>
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

  return (
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
          // sref.current.scrollToEnd({ animated: false });
        }}
      />
    </View>
  );
}

export default MessageListComponent;
