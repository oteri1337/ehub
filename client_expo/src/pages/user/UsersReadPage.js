import React from "react";
import * as Linking from "expo-linking";
import { BACKEND_URL } from "../../../env";
import { ImageBackground } from "react-native";
import { Store } from "../../providers/AppProvider";
import TopicsListComponent from "../components/TopicsListComponent";
import {
  Container,
  Content,
  Button,
  View,
  Text,
  Icon,
  H1,
  Thumbnail,
} from "native-base";

function UsersReadPage({ navigation, route }) {
  const { state } = React.useContext(Store);

  const { params } = route;
  const {
    first_name,
    last_name,
    department,
    photo_profile,
    email,
    bio,
    link,
    id,
    topics,
  } = params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: `${first_name} ${last_name}` });
  }, []);

  const open = () => {
    Linking.openURL(link);
  };

  // const openMail = () => {
  //   Linking.openURL(`mailto:${email}`);
  // };

  const onPress = () => {
    navigation.navigate("ChatsReadPage", {
      recvr: params,
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

  const ListHeaderComponent = () => {
    return (
      <React.Fragment>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Thumbnail large source={{ uri }} />
          </View>
          <View
            style={{
              flex: 1.4,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ marginTop: 10, marginBottom: 10, fontWeight: "500" }}
            >
              {topics.length} Forum Posts
            </Text>
            {renderMessageButton()}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginTop: 10,
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

  return (
    <Container>
      <TopicsListComponent
        list={{ data: topics }}
        ListHeaderComponent={ListHeaderComponent}
      />
    </Container>
  );

  return (
    <Container>
      <Content>
        <View style={{ height: 350, backgroundColor: "silver" }}>
          <ImageBackground
            style={{ width: "100%", height: "100%" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${photo_profile}` }}
          />
        </View>
        <View style={{ padding: 10 }}>
          {renderMessageButton()}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              marginBottom: 10,
              marginTop: 10,
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

          <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
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

          <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Icon
                name="link-2"
                type="Feather"
                style={{ color: "black", fontSize: 20 }}
              />
            </View>
            <View style={{ flex: 4 }}>
              <Text onPress={open} style={{ color: "black" }}>
                {link}
              </Text>
            </View>
          </View>
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
        </View>
      </Content>
    </Container>
  );
}

export default UsersReadPage;
