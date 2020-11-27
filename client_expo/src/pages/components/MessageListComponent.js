import React from "react";
import { BACKEND_URL } from "../../../env";
import { useNavigation } from "@react-navigation/native";
import MessageFormComponent from "./MessageFormComponent";
import { View, Text, Icon, Toast, Spinner } from "native-base";
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

  let backgroundColor = "white";
  let marginLeft = 0;
  let marginRight = 25;

  if (message.user_id === state.user.id) {
    marginLeft = 25;
    marginRight = 0;
    backgroundColor = "#e2eefe";
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
          <View style={{ ...s, marginLeft: 25, backgroundColor }}>
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
          <View style={{ ...s, marginLeft, marginRight, backgroundColor }}>
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
          <View style={{ ...s, marginRight, marginLeft, backgroundColor }}>
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
        onPress={() => {
          if (!message.chat_id) {
            navigation.navigate("UsersReadPage", message.user);
          }
        }}
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
  const sref = React.useRef();
  const navigation = useNavigation();
  let { onSubmit, onImage, type } = props;
  const { data = [], list, image = "", next_dispatch = "" } = props;
  const { state, refreshing, send } = getRequestThenDispatch();
  //  const inverted = props.inverted ?? true;

  const onMessageHook = () => {
    // if (inverted) {
    if (data.length) {
      sref.current.scrollToIndex({ index: 0 });
    }
    // }else {
    //   sref.current.scrollToEnd({ animated: false });
    // }
  };

  const onEndReached = () => {
    if (type != "forum") {
      if (!refreshing) {
        if (list?.next_page_url && list.comments_count > 12) {
          send(list.next_page_url, next_dispatch);
        }
      }
    }
  };

  const renderLoadMore = () => {
    if (list?.next_page_url && list.comments_count > 12) {
      if (!refreshing) {
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
    }
  };

  const header = () => {
    if (list?.data?.length) {
      return (
        <React.Fragment>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                if (state.user.id == list.user_id) {
                  navigation.navigate("CommentsReadPage", list);
                }
              }}
            >
              <View style={{ ...s, paddingTop: 0 }}>
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
                  <Text />
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
          </View>
          {renderLoadMore()}
        </React.Fragment>
      );
    }
  };

  const ListFooterComponent = () => {
    if (data.length >= 2) {
      if (!refreshing) {
        return <React.Fragment>{header()}</React.Fragment>;
      } else {
        return (
          <React.Fragment>
            {header()}
            <Spinner />
          </React.Fragment>
        );
      }
    }
    return <React.Fragment />;
  };

  const ListHeaderComponent = () => {
    if (data.length < 2) {
      if (!refreshing) {
        return <React.Fragment>{header()}</React.Fragment>;
      } else {
        return (
          <React.Fragment>
            <Text>lh</Text>
            {header()}
            <Spinner />
          </React.Fragment>
        );
      }
    }
    return <React.Fragment />;
  };

  // const ListHeaderComponent = () => {
  // if (list?.data?.length) {
  //   return (
  //     <View>
  //       <TouchableWithoutFeedback
  //         onPress={() => {
  //           if (state.user.id == list.user_id) {
  //             navigation.navigate("CommentsReadPage", list);
  //           }
  //         }}
  //       >
  //         <View style={s}>
  //           {image.length ? (
  //             <TouchableWithoutFeedback
  //               onPress={() => {
  //                 navigation.navigate("CommentsReadPage", {
  //                   type: 1,
  //                   data: image,
  //                 });
  //               }}
  //             >
  //               <Image
  //                 resizeMode="contain"
  //                 source={{ uri: `${BACKEND_URL}/uploads/images/${image}` }}
  //                 style={{ minHeight: 250 }}
  //               />
  //             </TouchableWithoutFeedback>
  //           ) : (
  //             <React.Fragment />
  //           )}
  //           <Text note style={{ marginBottom: 5 }}>
  //             {list?.user?.first_name} {list?.user?.last_name}
  //           </Text>
  //           <Text style={{ lineHeight: 25 }}>{list?.data}</Text>
  //           <Text note style={{ marginTop: 5 }}>
  //             {list.created_at}
  //           </Text>
  //         </View>
  //       </TouchableWithoutFeedback>
  //       {renderLoadMore()}
  //     </View>
  //   );
  // }
  //   return renderLoadMore();
  // };
  const [started, setStarted] = React.useState(false);

  let inverted = true;

  if (data.length < 2 && type == "forum") {
    inverted = false;
  }

  return (
    <React.Fragment>
      <View style={{ flex: 1 }}>
        <FlatList
          inverted={inverted}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          ref={sref}
          data={data}
          refreshing={refreshing}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          keyExtractor={(item) => {
            return item.id.toString();
          }}
          contentContainerStyle={{ padding: 10 }}
          renderItem={({ item }) => {
            return <ItemPureFunctional message={item} list={list} />;
          }}
          onContentSizeChange={() => {
            // if (type == "forum" && !started) {
            //   if (data.length) {
            //     sref.current.scrollToEnd({ animated: false });
            //     setStarted(true);
            //   }
            // }
            // console.log(data.length);
            //            if (inverted) {
            // if (data.length) {
            //   sref.current.scrollToIndex({ index: d });
            // }
            // }else {
            // }
            // sref.current.scrollToIndex({index: 0});
            //sref.current.scrollToEnd({ animated: false });
          }}
        />
      </View>
      <MessageFormComponent {...{ onMessageHook, onSubmit, onImage }} />
    </React.Fragment>
  );
}

export default MessageListComponent;
