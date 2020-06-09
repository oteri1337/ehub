import React from "react";
import chat from "../../../assets/chat.png";
import {
  Keyboard,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { AppContext } from "../../providers/AppProvider";
import CommentsListComponent from "./CommentsListComponent";
import { View, Textarea, Button, Icon, Text } from "native-base";

function TopicsReadPage({ navigation, route }) {
  const initialHeight = Dimensions.get("window").height - 85;
  const [height, setHeight] = React.useState(initialHeight);
  const [comment, setComment] = React.useState("");

  const keyboardShown = (e) => {
    setHeight(initialHeight - e.endCoordinates.height);
  };

  const keyboardHidden = () => {
    setHeight(initialHeight);
  };

  const { title, slug } = route.params;
  const {
    state,
    getRequestThenDispatch,
    sendRequestThenDispatch,
  } = React.useContext(AppContext);
  const topic = state.topics.object[slug];

  React.useEffect(() => {
    getRequestThenDispatch(`/api/topics/${slug}`, "UPDATE_TOPIC");
    Keyboard.addListener("keyboardWillShow", keyboardShown);
    Keyboard.addListener("keyboardWillHide", keyboardHidden);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardWillShow", keyboardShown);
      Keyboard.removeListener("keyboardWillHide", keyboardHidden);
    };
  }, []);

  // prettier-ignore
  navigation.setOptions({
    title,
    headerLeft: () => (
      <Button transparent onPress={() => {navigation.navigate("TopicsPage")}}>
        <Icon name="arrow-back" type="Ionicons" style={{ color: "black" }} />
      </Button>
    ),
    headerRight: () => (
      <Button transparent>
        <Icon name="share-2" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  const { created_at, user_id, content, id } = topic;

  const postComment = () => {
    const body = { topic_id: id, content: comment };
    setComment("");
    sendRequestThenDispatch("/api/topics/comment", "UPDATE_TOPIC", body);

    // console.log(slug);

    // const comment = {
    //   id: Date.now(),
    //   user_id: 8,
    //   topic_id: 1,
    //   user_name: null,
    //   content: "na we bros",
    //   created_at: "Jun 09 09:07 PM",
    //   updated_at: "2020-06-09T21:07:19.000000Z",
    //   user: {
    //     first_name: "Monica",
    //     last_name: "O'Connell",
    //   },
    // };

    // callReducer({
    //   dispatch: "ADD_COMMENT_TO_TOPIC",
    //   data: { slug, comment },
    // });
  };

  // prettier-ignore
  return (
    <View style={{ height: "100%" }}>
      <View style={{ height }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
              <ImageBackground style={{ width: "100%", height: "100%" }} source={chat}>
                <ScrollView contentContainerStyle={{ padding: 10 }}>
                  <View style={{ backgroundColor: "#fff", padding: 10, borderRadius: 5, marginBottom: 10}}>
                    <Text>
                      <Text note>{created_at} </Text>
                      <Text style={{ color: "green" }}>{user_id}</Text>
                    </Text>
                    <Text>{content}</Text>
                  </View>
                  <CommentsListComponent comments={topic.comments} />
                </ScrollView>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
          <View style={{flexDirection: "row"}}>
            <View style={{flex: 1}}> 
            <Textarea  value={comment} onChangeText={text => setComment(text)} style={{ backgroundColor: "white" }} />
            </View>
            <View style={{padding: 5}}>
            <Button rounded onPress={postComment} style={{ height: 50, width: 50 }}>
              <Icon name="send" />
            </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default TopicsReadPage;

// import React from "react";
// import chat from "../../../assets/chat.png";
// import { AppContext } from "../../providers/AppProvider";
// import {
//   ImageBackground,
//   KeyboardAvoidingView,
//   ScrollView,
//   Keyboard,
//   Platform,
//   StatusBar,
//   TouchableOpacity,
// } from "react-native";
// import {
//   Container,
//   Text,
//   View,
//   Form,
//   Button,
//   Icon,
//   Textarea,
//   Input,
//   Item,
//   Content,
// } from "native-base";

// function Comment({ created_at, user_id, content, id, user }) {
//   const { state } = React.useContext(AppContext);

//   if (state.user.id == user_id) {
//     return (
//       <View
//         key={id}
//         style={{
//           backgroundColor: "#cee9b2",
//           padding: 10,
//           borderRadius: 5,
//           marginLeft: 30,
//           marginBottom: 5,
//         }}
//       >
//         <Text>
//           <Text note>{created_at} </Text>
//         </Text>
//         <Text>{content}</Text>
//       </View>
//     );
//   }

//   return (
// <View
//   key={id}
//   style={{
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 5,
//     marginRight: 30,
//     marginBottom: 5,
//   }}
// >
//   <Text>
//     <Text note>{created_at} </Text>
//     <Text style={{ color: "green" }}>
//       {user.first_name} {user.last_name}
//     </Text>
//   </Text>
//   <Text>{content}</Text>
// </View>
//   );
// }

// function TopicsReadPage({ navigation, route }) {
//   return (
//     <Container>

//     </Container>
//   );

//   const [comment, setComment] = React.useState("");
//   const { state, callReducer } = React.useContext(AppContext);
//   const { slug } = route.params;
//   const topic = state.topics.object[slug];

// const arrowBackPressed = () => {
//   navigation.navigate("TopicsPage");
// };

// const { title, user_id, content, created_at } = route.params;
// navigation.setOptions({
//   title,
//   headerLeft: () => (
//     <Button transparent onPress={arrowBackPressed}>
//       <Icon name="arrow-back" type="Ionicons" style={{ color: "black" }} />
//     </Button>
//   ),
//   headerRight: () => (
//     <Button transparent onPress={arrowBackPressed}>
//       <Icon name="share-2" type="Feather" style={{ color: "black" }} />
//     </Button>
//   ),
// });

//   const onPress = () => {
//     callReducer({
//       dispatch: "ADD_COMMENT_TO_TOPIC",
//       data: {
//         slug,
//         user_id: state.user.id,
//         created_at: "May 26 10:22 PM",
//         content: comment,
//       },
//     });
//     setComment("");
//     Keyboard.dismiss();
//   };

//   const renderComments = () => {
//     return topic.comments?.map((comment) => (
//       <Comment key={comment.id} {...comment} />
//     ));
//   };

//   let behavior = "";

//   if (Platform.OS == "ios") {
//     behavior = "padding";
//   }

//   return (
//     <Container>
//       <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" />
//       <KeyboardAvoidingView style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
// <ImageBackground
//   style={{ width: "100%", height: "100%" }}
//   source={chat}
// >
//             <ScrollView contentContainerStyle={{ padding: 10 }}>
//   <View
//     style={{
//       backgroundColor: "#fff",
//       padding: 10,
//       borderRadius: 5,
//       marginBottom: 10,
//     }}
//   >
//     <Text>
//       <Text note>{created_at} </Text>
//       <Text style={{ color: "green" }}>{user_id}</Text>
//     </Text>
//     <Text>{content}</Text>
//  </View>
//               {/* {renderComments()} */}
//             </ScrollView>
//           </ImageBackground>
//         </View>
//         <View
//           style={{
//             paddingLeft: 15,
//             paddingBottom: 5,
//             flexDirection: "row",
//             alignItems: "flex-end",
//             borderTopColor: "silver",
//             borderTopWidth: 1,
//           }}
//         >
//           <View style={{ flex: 5.5 }}>
//             <Form>
//               <Textarea
//                 bordered
//                 rowSpan={2}
//                 value={comment}
//                 onChangeText={(text) => setComment(text)}
//               />
//             </Form>
//           </View>
//           <View style={{ flex: 1, paddingLeft: 5 }}>
// <Button rounded onPress={onPress} style={{ height: 50, width: 50 }}>
//   <Icon name="send" />
// </Button>
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </Container>
//   );
// }

// export default TopicsReadPage;
