import React from "react";
import { View, Text } from "native-base";
import { BACKEND_URL } from "../../../env";
import { AppContext } from "../../providers/AppProvider";
import { useNavigation } from "@react-navigation/native";
import { Image, FlatList, TouchableWithoutFeedback } from "react-native";

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
  const { state } = React.useContext(AppContext);

  return React.useMemo(() => {
    console.log("rendering message", message.id);

    if (message.type === 1) {
      if (state.user.id === message.user_id) {
        return (
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
        );
      }

      return (
        <View style={{ ...s, marginRight: 25 }}>
          {message.user ? (
            <Text note style={{ marginBottom: 5 }}>
              {message.user.first_name} {message.user.last_name}
            </Text>
          ) : (
            <React.Fragment />
          )}
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
      );
    }

    if (state.user.id === message.user_id) {
      let tag = "Comment";

      if (message.chat_id) {
        tag = "Message";
      }

      const comment = {
        tag,
        message,
        update: {
          method: "PATCH",
          dispatch: "UPDATE_TOPIC",
          body: { topic_id: list?.id },
          endpoint: `/api/topics/${list?.slug}/comment`,
        },
      };

      return (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("CommentsReadPage", comment);
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
  }, [list]);
}

class PureItem extends React.PureComponent {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const { message } = this.props;

    console.log("rendering message", message.id);

    return <Text>{message.data}</Text>;

    //   return (
    //     <View style={{ ...s, marginRight: 25 }}>
    //       {message.user ? (
    //         <Text note style={{ marginBottom: 5 }}>
    //           {message.user.first_name} {message.user.last_name}
    //         </Text>
    //       ) : (
    //         <React.Fragment />
    //       )}
    //       <Text>{message.data}</Text>
    //       <Text note style={{ marginTop: 5 }}>
    //         {message.created_at}
    //       </Text>
    //     </View>
    //   );
  }
}

function MessageListComponent({ data = [], list, image = "" }) {
  const sref = React.useRef();
  const navigation = useNavigation();
  const { state } = React.useContext(AppContext);

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
          {data.length > 11 && (
            <Text style={{ padding: 10 }}>Load Older Comments</Text>
          )}
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
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => {
          return <ItemPureFunctional message={item} list={list} />;
        }}
        onContentSizeChange={() => {
          sref.current.scrollToEnd({ animated: false });
        }}
      />
    </View>
  );
}

export default MessageListComponent;
