// import React from "react";
// import { BACKEND_URL } from "../../../env";
// import { WebView } from "react-native-webview";
// import Text from "../../components/TextComponent";
// import HeaderComponent from "../../components/HeaderComponent";
// import { getRequestThenDispatch } from "../../providers/AppProvider";
// import {
//   Container,
//   Thumbnail,
//   Icon,
//   Button,
//   Left,
//   Body,
//   Right,
//   Card,
//   CardItem,
//   Content,
//   View,
// } from "native-base";
// import Human from "../../../assets/human.png";

// function UserHomePage({ navigation }) {
//   const { state } = getRequestThenDispatch("/api/news", "UPDATE_NEWS");

//   const renderNews = () => {
//     return state.news.data.map((news) => {
//       return (
//         <Card transparent key={news.id} style={{ borderBottomWidth: 1 }}>
//           <CardItem>
//             <Left>
// <Thumbnail
//   source={{ uri: `${BACKEND_URL}/uploads/images/${news.image}` }}
// />
//               <Body>
//                 <Text>{news.title}</Text>
//                 <Text note>{news.content_short}</Text>
//                 {/* <WebView source={{ html: news.content_html }} /> */}
//               </Body>
//             </Left>
//           </CardItem>
//           <CardItem>
//             <Left>
//               <Button transparent>
//                 <Icon name="thumbs-up" />
//                 <Text style={{ padding: 5 }}>12 Likes</Text>
//               </Button>
//             </Left>
//             <Right>
//               <Button transparent>
//                 <Icon name="chatbubbles" />
//                 <Text style={{ padding: 5 }}>4 Comments</Text>
//               </Button>
//             </Right>
//           </CardItem>
//         </Card>
//       );
//     });
//   };

//   return (
//     <Container>
//       <HeaderComponent navigation={navigation} />
//       <Content padder>
//         <Text>News</Text>
//         {renderNews()}
//       </Content>
//     </Container>
//   );
// }

// export default UserHomePage;

import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../env";
import Text from "../../components/TextComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import {
  Container,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon,
  Thumbnail,
} from "native-base";

function NewsPage({ navigation }) {
  const url = "/api/news";
  const { state, fetching } = getRequestThenDispatch(url, "UPDATE_NEWS");

  const refreshing = fetching;
  const data = state.news.data;

  const renderItem = ({ item }) => {
    const onPress = () => {
      navigation.navigate("NewsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail
            source={{ uri: `${BACKEND_URL}/uploads/images/${item.image}` }}
          />
        </Left>
        <Body>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto_medium",
              textTransform: "uppercase",
              color: "#59595a",
            }}
          >
            {item.title}
          </Text>
          <Text
            note
            style={{
              fontSize: 11,
              textTransform: "capitalize",
              color: "#5a5a62",
            }}
          >
            0 Likes
          </Text>
          <Text
            note
            style={{
              fontSize: 11,
              textTransform: "capitalize",
              color: "#5a5a62",
            }}
          >
            0 Comments
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  };

  const onRefresh = () => {
    // getRequestThenDispatch(url, "UPDATE_PDFGROUPS");
  };

  const keyExtractor = (item) => {
    return item.id.toString();
  };

  const ListHeaderComponent = () => {
    return <Text style={{ marginLeft: 10, marginBottom: 5 }}>NEWS</Text>;
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <List style={{ padding: 10 }}>
        <FlatList
          {...{
            data,
            renderItem,
            refreshing,
            onRefresh,
            keyExtractor,
            ListHeaderComponent,
          }}
        />
      </List>
    </Container>
  );
}

export default NewsPage;
