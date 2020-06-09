import React from "react";
import { Container, Button, Text, Form, Item, Input } from "native-base";

function ChangeEmailPage() {
  return (
    <Container style={{ padding: 10 }}>
      <Form>
        <Item>
          <Input placeholder="New Email" />
        </Item>
        <Item>
          <Input placeholder="Confirm New Email" />
        </Item>
        <Button full>
          <Text>Change</Text>
        </Button>
      </Form>
    </Container>
  );
}

export default ChangeEmailPage;
