import React from "react";
import { View, Text } from "native-base";
import { BACKEND_URL } from "../../../env";
import { AppContext } from "../../providers/AppProvider";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

const s = {
  padding: 10,
  borderWidth: 2,
  borderRadius: 5,
  marginBottom: 5,
  borderColor: "#e7e6e6",
  backgroundColor: "white",
};

function ItemPureFunctional({ message }) {
  const { state } = React.useContext(AppContext);

  return React.useMemo(() => {
    console.log("rendering message", message.id);

    // if (state.user.id === message.user_id) {
    //   return (
    //     <View style={{ ...s, marginLeft: 25 }}>
    //       <Text>{message.message}</Text>
    //       <Text note style={{ marginTop: 5 }}>
    //         {message.created_at}
    //       </Text>
    //     </View>
    //   );
    // }

    if (message.type === 1) {
      if (state.user.id === message.user_id) {
        return (
          <View style={{ ...s, marginLeft: 25 }}>
            <Image
              source={{
                uri: `${BACKEND_URL}/uploads/images/${message.message}`,
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
              uri: `${BACKEND_URL}/uploads/images/${message.message}`,
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
      return (
        <View style={{ ...s, marginLeft: 25 }}>
          <Text>{message.message}</Text>
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
        <Text>{message.message}</Text>
        <Text note style={{ marginTop: 5 }}>
          {message.created_at}
        </Text>
      </View>
    );

    // if (state.user.id === message.user_id) {
    //   if (message.type == 1) {
    //     return (
    //       <View
    //         key={message.id}
    //         style={{ ...s, backgroundColor: "white", marginLeft: 25 }}
    //       >
    //         <Image
    //           source={{
    //             uri: `${BACKEND_URL}/uploads/images/${message.message}`,
    //           }}
    //           style={{ height: 400 }}
    //         />
    //         <Text note style={{ marginTop: 5 }}>
    //           {message.created_at}
    //         </Text>
    //       </View>
    //     );
    //   }

    //   return (
    //     <TouchableWithoutFeedback
    //       key={message.id}
    //       onPress={() => {
    //         navigation.navigate("CommentsReadPage", message);
    //       }}
    //     >
    //       <View style={{ ...s, backgroundColor: "#e7e6e6", marginLeft: 25 }}>
    //         <Text style={{ lineHeight: 25 }}>{message.message}</Text>
    //         <Text note style={{ marginTop: 5 }}>
    //           {message.created_at}
    //         </Text>
    //       </View>
    //     </TouchableWithoutFeedback>
    //   );
    // }

    // if (message.type == 1) {
    //   return (
    //     <View key={message.id} style={{ ...s, marginRight: 25 }}>
    //       {message.user ? (
    //         <Text note style={{ marginBottom: 5 }}>
    //           {message.user.first_name} {message.user.last_name}
    //         </Text>
    //       ) : (
    //         <React.Fragment />
    //       )}
    //       <Image
    //         source={{ uri: `${BACKEND_URL}/uploads/images/${message.message}` }}
    //         style={{ height: 400 }}
    //       />
    //       <Text note style={{ marginTop: 5 }}>
    //         {message.created_at}
    //       </Text>
    //     </View>
    //   );
    // }

    // return (
    //   <View key={message.id} style={{ ...s, marginRight: 25 }}>
    //     {message.user ? (
    //       <Text note style={{ marginBottom: 5 }}>
    //         {message.user.first_name} {message.user.last_name}
    //       </Text>
    //     ) : (
    //       <React.Fragment />
    //     )}
    //     <Text style={{ lineHeight: 25 }}>{message.message}</Text>
    //     <Text note style={{ marginTop: 5 }}>
    //       {message.created_at}
    //     </Text>
    //   </View>
    // );
  }, []);
}

class PureItem extends React.PureComponent {
  // shouldComponentUpdate() {
  //   return false;
  // }

  render() {
    const { message } = this.props;

    console.log("rendering message", message.id);

    return <Text>{message.message}</Text>;

    //   return (
    //     <View style={{ ...s, marginRight: 25 }}>
    //       {message.user ? (
    //         <Text note style={{ marginBottom: 5 }}>
    //           {message.user.first_name} {message.user.last_name}
    //         </Text>
    //       ) : (
    //         <React.Fragment />
    //       )}
    //       <Text>{message.message}</Text>
    //       <Text note style={{ marginTop: 5 }}>
    //         {message.created_at}
    //       </Text>
    //     </View>
    //   );
  }
}

function MessageListComponent({ data = [], header = "", user, image = "" }) {
  const sref = React.useRef();
  const navigation = useNavigation();

  // const _keyboardWillHide = () => {
  //   // alert("hidden");
  //   // console.log("show");
  //   // sref.current._root.scrollToEnd();
  // };

  // React.useEffect(() => {
  //   Keyboard.addListener("keyboardWillHide", _keyboardWillHide);

  //   // cleanup function
  //   return () => {
  //     Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
  //   };
  // }, []);

  // const renderedMessages = messages.map((message) => {
  //   console.log("rendering message", message.id);

  // if (state.user.id === message.user_id) {
  //   if (message.type == 1) {
  //     return (
  //       <View
  //         key={message.id}
  //         style={{ ...s, backgroundColor: "white", marginLeft: 25 }}
  //       >
  //         <Image
  //           source={{
  //             uri: `${BACKEND_URL}/uploads/images/${message.message}`,
  //           }}
  //           style={{ height: 400 }}
  //         />
  //         <Text note style={{ marginTop: 5 }}>
  //           {message.created_at}
  //         </Text>
  //       </View>
  //     );
  //   }

  //   return (
  //     <TouchableWithoutFeedback
  //       onPress={() => {
  //         navigation.navigate("CommentsReadPage", message);
  //       }}
  //     >
  //       <View
  //         key={message.id}
  //         style={{ ...s, backgroundColor: "#e7e6e6", marginLeft: 25 }}
  //       >
  //         <Text style={{ lineHeight: 25 }}>{message.message}</Text>
  //         <Text note style={{ marginTop: 5 }}>
  //           {message.created_at}
  //         </Text>
  //       </View>
  //     </TouchableWithoutFeedback>
  //   );
  // }

  // if (message.type == 1) {
  //   return (
  //     <View key={message.id} style={{ ...s, marginRight: 25 }}>
  //       {message.user ? (
  //         <Text note style={{ marginBottom: 5 }}>
  //           {message.user.first_name} {message.user.last_name}
  //         </Text>
  //       ) : (
  //         <React.Fragment />
  //       )}
  //       <Image
  //         source={{ uri: `${BACKEND_URL}/uploads/images/${message.message}` }}
  //         style={{ height: 400 }}
  //       />
  //       <Text note style={{ marginTop: 5 }}>
  //         {message.created_at}
  //       </Text>
  //     </View>
  //   );
  // }

  // return (
  //   <View key={message.id} style={{ ...s, marginRight: 25 }}>
  //     {message.user ? (
  //       <Text note style={{ marginBottom: 5 }}>
  //         {message.user.first_name} {message.user.last_name}
  //       </Text>
  //     ) : (
  //       <React.Fragment />
  //     )}
  //     <Text style={{ lineHeight: 25 }}>{message.message}</Text>
  //     <Text note style={{ marginTop: 5 }}>
  //       {message.created_at}
  //     </Text>
  //   </View>
  // );
  // });

  // const renderTop = () => {
  //   if (top.length) {
  //     return (
  // <View style={{ ...s, backgroundColor: "white" }}>
  // {image.length ? (
  //   <Image
  //     source={{ uri: `${BACKEND_URL}/uploads/images/${image}` }}
  //     style={{ height: 400 }}
  //   />
  // ) : (
  //   <React.Fragment />
  // )}
  // <Text note style={{ marginBottom: 5 }}>
  //   {user?.first_name} {user?.last_name}
  // </Text>
  //   <Text style={{ lineHeight: 25 }}>{top}</Text>
  // </View>
  //     );
  //   }
  //   return <React.Fragment />;
  // };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={sref}
        data={data}
        ListHeaderComponent={() => {
          if (header.length) {
            return (
              <View>
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
                  <Text>{header}</Text>
                </View>

                {data.length > 11 && (
                  <Text style={{ padding: 10 }}>Load Older Comments</Text>
                )}
              </View>
            );
          }
          return <React.Fragment />;
        }}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => {
          return <ItemPureFunctional message={item} />;
        }}
        onContentSizeChange={() => {
          sref.current.scrollToEnd({ animated: false });
        }}
      />
    </View>
  );
}

export default MessageListComponent;
