import React from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, ListItem, Left, View, Body, Icon, Spinner } from "native-base";

class SingleTopicComponent extends React.PureComponent {
  render() {
    const { item, navigation } = this.props;

    console.log("rendering topic ", item.id);

    const onPress = () => {
      navigation.navigate("TopicsReadPage", item);
    };

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: item.color,
              justifyContent: "center",
            }}
          >
            <Icon
              name={item.icon}
              type="AntDesign"
              style={{
                color: "#FFFFFF",
                textAlign: "center",
              }}
            />
          </View>
        </Left>
        <Body>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text note style={{ fontWeight: "300" }}>
            {item.content?.replace(/\s/g, " ").substring(0, 70)}
          </Text>
        </Body>
      </ListItem>
    );
  }
}

const keyExtractor = (item) => {
  return item.id.toString();
};

function TopicsListComponent({ list, refreshing, onRefresh, onEndReached }) {
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

export default TopicsListComponent;
