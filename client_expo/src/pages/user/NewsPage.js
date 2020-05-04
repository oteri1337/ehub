import React from "react";
import { BACKEND_URL } from "../../../env";
import { WebView } from "react-native-webview";
import Text from "../../components/TextComponent";
import HeaderComponent from "../../components/HeaderComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import {
  Container,
  Thumbnail,
  Icon,
  Button,
  Left,
  Body,
  Right,
  Card,
  CardItem,
  Content,
  View,
} from "native-base";
import Human from "../../../assets/human.png";

function UserHomePage({ navigation }) {
  const { state } = getRequestThenDispatch("/api/news", "UPDATE_NEWS");

  const renderNews = () => {
    return state.news.data.map((news) => {
      return (
        <Card transparent key={news.id} style={{ borderBottomWidth: 1 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{ uri: `${BACKEND_URL}/uploads/images/${news.image}` }}
              />
              <Body>
                <Text>{news.title}</Text>
                <Text note>{news.content_short}</Text>
                {/* <WebView source={{ html: news.content_html }} /> */}
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon name="thumbs-up" />
                <Text style={{ padding: 5 }}>12 Likes</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Icon name="chatbubbles" />
                <Text style={{ padding: 5 }}>4 Comments</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      );
    });
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>News</Text>
        {renderNews()}
      </Content>
    </Container>
  );
}

export default UserHomePage;
