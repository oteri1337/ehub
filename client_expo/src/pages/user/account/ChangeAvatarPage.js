import React from "react";
import { BACKEND_URL } from "../../../../env";
import { AppContext } from "../../../providers/AppProvider";
import { Container, Picker, Thumbnail } from "native-base";

function ChangeAvatarPage() {
  const { state } = React.useContext(AppContext);
  const { photo_profile } = state.user;

  const uri = `${BACKEND_URL}/uploads/images/${photo_profile}`;

  return (
    <Container style={{ alignItems: "center" }}>
      <Thumbnail large source={{ uri }} style={{ marginTop: 10 }} />

      <Picker selectedValue="key0" note mode="dialog">
        <Picker.Item label="Select Avatar" value="key0" />
        <Picker.Item label="ATM Card" value="key1" />
        <Picker.Item label="Debit Card" value="key2" />
        <Picker.Item label="Credit Card" value="key3" />
        <Picker.Item label="Net Banking" value="key4" />
      </Picker>
    </Container>
  );
}

export default ChangeAvatarPage;
