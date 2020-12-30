import React from "react";
import CachedImage from "./CachedImage";
import { BACKEND_URL } from "../../../env";
import { useNavigation } from "@react-navigation/native";
import { FlatList, TouchableWithoutFeedback, Dimensions } from "react-native";
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

class SingleEventComponent extends React.PureComponent {
  render() {
    const { item, navigation, lookup } = this.props;

    const onPress = () => {
      navigation.navigate("EventsReadPage", item);
    };

    const uri = `${BACKEND_URL}/uploads/images/${item.image}`;

    let comments = item.comments_count;

    // if (lookup.comments.length > comments) {
    //   comments = lookup.comments.length;
    // }

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

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
            <CachedImage
              source={{ uri }}
              style={{ height: windowHeight/3, width: null, flex: 1 }}
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
                <Text style={{ color: "black" }}>{item.date}</Text>
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
                <Text style={{ color: "black" }}>{comments} Comments</Text>
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
    const lookup = list.object[item.id];

    return (
      <SingleEventComponent
        item={item}
        lookup={lookup}
        navigation={navigation}
      />
    );
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
