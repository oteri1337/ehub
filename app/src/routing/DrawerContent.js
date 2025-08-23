import React from "react";
import {
  Icon,
  Container,
  ListItem,
  Thumbnail,
  Left,
  Body,
  List,
  H1,
  Text,
  Header,
} from "native-base";
import { BACKEND_URL } from "../../env";
import { getRequestThenDispatch } from "../providers/AppProvider";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

function DrawerContent(props) {
  const activeStyle = { backgroundColor: "#9fcdfb", color: "#045cbd" };

  const url = "/api/pdfparentgroups";
  const { state } = getRequestThenDispatch(url, "UPDATE_PDFPARENTGROUPS");
  const { first_name, last_name, email, photo_profile } = state.user;

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  const renderParentGroups = () => {
    return state.pdfparentgroups.data.map((g) => {
      return (
        <DrawerItem
          key={g.id}
          label={g.title}
          labelStyle={{
            fontSize: 13,
            color: "black",
            marginLeft: -10,
          }}
          onPress={() => props.navigation.navigate("PdfsParentPage", g)}
          icon={() => (
            <Icon name={g.icon} type="Feather" style={{ fontSize: 20 }} />
          )}
        />
      );
    });
  };

  return (
    <Container>
      <Header transparent style={{ backgroundColor: "#007aff" }} />
      <List style={{ backgroundColor: "#007aff" }}>
        <ListItem thumbnail>
          <Left>
            <Thumbnail source={{ uri }} />
          </Left>
          <Body>
            <H1 style={{ color: "white" }}>
              {first_name} {last_name.charAt(0)}.
            </H1>
            <Text style={{ color: "white" }}>{email}</Text>
          </Body>
        </ListItem>
      </List>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="All Books"
          style={{}}
          labelStyle={{ fontSize: 13, marginLeft: -10 }}
          onPress={() => props.navigation.navigate("PdfsListPage")}
          icon={() => (
            <Icon type="Feather" style={{ fontSize: 20 }} name="folder" />
          )}
        />
        <DrawerItem
          labelStyle={{ fontSize: 13, color: "black", marginLeft: -10 }}
          label="Saved Books"
          onPress={() => props.navigation.navigate("PdfsSavedPage")}
          icon={() => (
            <Icon name="folder-plus" style={{ fontSize: 20 }} type="Feather" />
          )}
        />
        <DrawerItem
          labelStyle={{ fontSize: 13, color: "black", marginLeft: -10 }}
          label="Search Books"
          onPress={() => props.navigation.navigate("SearchPage")}
          icon={() => (
            <Icon name="search" style={{ fontSize: 20 }} type="Feather" />
          )}
        />
        {renderParentGroups()}
      </DrawerContentScrollView>
    </Container>
  );
}

export default DrawerContent;
