import React from "react";
import { Container, Form, Item, Input, Button, Text } from "native-base";

function ChangePasswordPage() {
  return (
    <Container style={{ padding: 10 }}>
      <Form>
        <Item>
          <Input placeholder="Old Password" />
        </Item>
        <Item>
          <Input placeholder="New Password" />
        </Item>
        <Item>
          <Input placeholder="Confirm New Password" />
        </Item>
      </Form>
      <Button full>
        <Text>Change</Text>
      </Button>
    </Container>
  );
}

export default ChangePasswordPage;
