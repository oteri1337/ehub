import React from "react";
import HeaderComponent from "../../../components/HeaderComponent";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Icon,
} from "native-base";

function AccountPage({ navigation }) {
  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>MY ACCOUNT</Text>
        <List>
          <ListItem onPress={() => navigation.navigate("ProfilePage")}>
            <Left>
              <Text>View Profile</Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Update Photo</Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Update Profile</Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Change Email</Text>
            </Left>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Change Password</Text>
            </Left>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
}

export default AccountPage;
