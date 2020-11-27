import React from "react";
import { Container } from "native-base";
import * as Linking from "expo-linking";
import { BACKEND_URL } from "../../../env";
import { TouchableWithoutFeedback } from "react-native";
import TopicsListComponent from "../components/TopicsListComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import { Button, View, Text, Icon, Thumbnail, H1 } from "native-base";

function UsersReadPage({ navigation, route }) {
  const { id } = route.params;
  const url = `/api/users/${id}`;
  const dispatch = "UPDATE_USER_IN_USERS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);

  const onRefresh = () => {
    send(url, dispatch);
  };

  const user = state.users.object[id] || route.params;
  const { nse_number, topics = [], photo_profile } = user;
  const { first_name, last_name, department, email, bio, link } = user;
  const title = `${first_name} ${last_name}`;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, [user]);

  const open = () => {
    Linking.openURL(link);
  };

  // const openMail = () => {
  //   Linking.openURL(`mailto:${email}`);
  // };

  const onPress = () => {
    navigation.navigate("ChatsReadPage", {
      recvr: route.params,
      recvr_id: id,
    });
  };

  const renderMessageButton = () => {
    if (state.user.id === id) {
      return <React.Fragment />;
    }
    return (
      <Button bordered small dark onPress={onPress}>
        <Text>Send Message</Text>
      </Button>
    );
  };

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  const imagePressed = () => {
    navigation.navigate("FullImagePage", { title, uri });
  };

  const renderNseNumber = () => {
    if (nse_number.length) {
      return (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="settings"
              type="Feather"
              style={{ color: "black", fontSize: 20 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text onPress={open} style={{ color: "black" }}>
              {nse_number}
            </Text>
          </View>
        </View>
      );
    }

    return <React.Fragment />;
  };

  const renderLink = () => {
    if (link.length) {
      return (
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="link-2"
              type="Feather"
              style={{ color: "black", fontSize: 20 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text onPress={open} style={{ color: "black" }}>
              {link.substring(0, 35)}
            </Text>
          </View>
        </View>
      );
    }

    return <React.Fragment />;
  };

  const ListHeaderComponent = () => {
    return (
      <React.Fragment>
        <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 10 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableWithoutFeedback onPress={imagePressed}>
              <Thumbnail large source={{ uri }} />
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              flex: 1.4,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {/* <Text
              style={{ marginTop: 10, marginBottom: 10, fontWeight: "500" }}
            >
              {topics.length} Forum Posts
            </Text> */}
            {renderMessageButton()}
          </View>
        </View>

        {renderNseNumber()}

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="award"
              type="Feather"
              style={{ color: "black", fontSize: 20 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text style={{ color: "black" }}>{department}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Icon
              name="mail"
              type="Feather"
              style={{ color: "black", fontSize: 20 }}
            />
          </View>
          <View style={{ flex: 4 }}>
            <Text style={{ color: "black" }}>{email}</Text>
          </View>
        </View>

        {renderLink()}

        <Text
          style={{
            marginBottom: 10,
            lineHeight: 25,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          {bio}
        </Text>
      </React.Fragment>
    );
  };

  if (topics.length === 0) {
    return (
      <Container>
        {ListHeaderComponent()}

        <View style={{ marginTop: 50 }}>
          <Icon
            name="stop-circle"
            type="Feather"
            style={{ fontSize: 40, textAlign: "center", color: "#696969" }}
          />
          <H1 style={{ textAlign: "center", marginTop: 5, color: "#696969" }}>
            No Posts Yet
          </H1>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <TopicsListComponent
        onRefresh={onRefresh}
        refreshing={refreshing}
        list={{ data: topics }}
        ListHeaderComponent={ListHeaderComponent}
      />
    </Container>
  );
}

export default UsersReadPage;
