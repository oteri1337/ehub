import React from "react";
import { FlatList } from "react-native";
import { BACKEND_URL } from "../../../env";
import CachedThumbnail from "./CachedThumbnail";
import { useNavigation } from "@react-navigation/native";
import { Text, ListItem, Left, Body, Spinner, Thumbnail } from "native-base";

class SingleUserComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering user ", item.id);

    const onPress = () => {
      navigation.navigate("UsersReadPage", item);
    };

    const uri = `${BACKEND_URL}/uploads/images/${item.photo_profile}`;

    if (item.first_name.length === 0) {
      return <React.Fragment />;
    }

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <CachedThumbnail
            source={{ uri }}
            style={{ backgroundColor: "silver" }}
          />
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>
            {item.first_name} {item.last_name}
          </Text>
          <Text note style={{ fontWeight: "300" }}>
            {item.department}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

const keyExtractor = (item) => {
  return item.id.toString();
};

function UsersListComponent({ list, refreshing, onRefresh, onEndReached }) {
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
    return <SingleUserComponent item={item} navigation={navigation} />;
  };

  const onEndReachedThreshold = 0.1;

  return (
    <FlatList
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

export default UsersListComponent;
