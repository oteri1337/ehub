import React from "react";
import { BACKEND_URL } from "../../../env";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, TouchableWithoutFeedback } from "react-native";
import {
  Text,
  Left,
  Body,
  Card,
  Icon,
  Right,
  Button,
  Spinner,
  CardItem,
} from "native-base";

class SingleTopicComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering event ", item.id);

    const onPress = () => {
      navigation.navigate("EventsReadPage", item);
    };

    const uri = `${BACKEND_URL}/uploads/images/${item.image}`;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>{item.title}</Text>
                <Text note>
                  {item.data?.replace(/\s/g, " ").substring(0, 35)}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon
                  active
                  name="calendar"
                  type="Feather"
                  style={{ color: "black" }}
                />
                <Text style={{ color: "black" }}>2 Days Left</Text>
              </Button>
            </Left>

            <Right>
              <Button transparent>
                <Icon
                  active
                  name="message-square"
                  type="Feather"
                  style={{ color: "black" }}
                />
                <Text style={{ color: "black" }}>
                  {item.comments_count} Comments
                </Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const keyExtractor = (item) => {
  return item.id.toString();
};

function EventsListComponent({ list, refreshing, onRefresh, onEndReached }) {
  const navigation = useNavigation();
  const { data } = list;

  const ListFooterComponent = () => {
    if (refreshing) {
      if (Platform.OS == "ios") {
        return <Spinner />;
      } else {
        return <React.Fragment />;
      }
    }
    return <React.Fragment />;
  };

  const renderItem = ({ item }) => {
    return <SingleTopicComponent item={item} navigation={navigation} />;
  };

  const onEndReachedThreshold = 0.1;

  return (
    <FlatList
      contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
      {...{
        data,
        onRefresh,
        refreshing,
        renderItem,
        keyExtractor,
        onEndReached,
        ListFooterComponent,
        onEndReachedThreshold,
      }}
    />
  );
}

export default EventsListComponent;
