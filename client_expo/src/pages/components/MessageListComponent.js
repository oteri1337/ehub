import React from "react";
import { View, Text } from "native-base";
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

function ItemPureFunctional({ message, list }) {
  const navigation = useNavigation();
  const { state } = React.useContext(Store);
  const tag = "Comment";

  let comment = {};

  if (list?.image) {
    comment = {
      tag,
      message,
      update: {
        dispatch: "UPDATE_EVENT",
        body: { event_id: list?.id, id: message.id },
        endpoint: `/api/events/${list?.slug}/comment`,
      },
      deleteData: {
        dispatch: "UPDATE_EVENT",
        body: { event_id: list?.id, id: message.id },
        endpoint: `/api/events/${list?.slug}/comment`,
      },
    };
  } else {
    comment = {
      tag,
      message,
      update: {
        dispatch: "UPDATE_TOPIC",
        body: { topic_id: list?.id, id: message.id },
        endpoint: `/api/topics/${list?.slug}/comment`,
      },
      deleteData: {
        dispatch: "UPDATE_TOPIC",
        body: { topic_id: list?.id, id: message.id },
        endpoint: `/api/topics/${list?.slug}/comment`,
      },
    };
  }

  return React.useMemo(() => {
    console.log("rendering message", message.id);

    // user message
    if (message.user_id === state.user.id && message.type === 0) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("CommentsReadPage", comment);
          }}
        >
          <View style={{ ...s, marginLeft: 25 }}>
            <Text>{message.data}</Text>
            <Text note style={{ marginTop: 5 }}>
              {message.id} {message.created_at}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

    // user image message
    if (message.user_id === state.user.id && message.type === 1) {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("CommentsReadPage", comment);
          }}
        >
          <View style={{ ...s, marginLeft: 25 }}>
            <Image
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

    // normal message
    return (
      <View style={{ ...s, marginRight: 25 }}>
        {message.user ? (
          <Text note style={{ marginBottom: 5 }}>
            {message.id} {message.user.first_name} {message.user.last_name}
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
  }, [list]);
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
      if (list.next_page_url) {
        return (
          <Text
            style={{ padding: 10 }}
            onPress={() => {
              send(list.next_page_url, next_dispatch);
            }}
          >
            Load More Comments
          </Text>
        );
      }
      return <React.Fragment />;
    } else {
      return <Text style={{ padding: 10 }}>Fetching ...</Text>;
    }
  };

  const ListHeaderComponent = () => {
    if (list?.data.length) {
      const tag = "Topic";

      const comment = {
        tag,
        message: { data: list.data, id: list.id },
        update: {
          method: "PATCH",
          dispatch: "UPDATE_TOPIC",
          endpoint: `/api/topics/${list.slug}`,
        },
      };

      return (
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              if (state.user.id == list.user_id) {
                navigation.navigate("CommentsReadPage", comment);
              }
            }}
          >
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
                {list?.user?.first_name} {list?.user?.last_name}
              </Text>
              <Text>{list?.data}</Text>
              <Text note style={{ marginTop: 5 }}>
                {list.created_at}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          {renderLoadMore()}
          {/* {data.length > 11 && (
            <Text
              style={{ padding: 10 }}
              onPress={() => {
                alert("party scatter");
              }}
            >
              Load Older Comments
            </Text>
          )} */}
        </View>
      );
    }
    return <React.Fragment />;
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
