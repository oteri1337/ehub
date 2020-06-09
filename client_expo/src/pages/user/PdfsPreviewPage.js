import React from "react";
import { BACKEND_URL } from "../../../env";
import { Image, StatusBar } from "react-native";
import { AppContext } from "../../providers/AppProvider";
import {
  savePdfToDatabase,
  removePdfFromDatabase,
} from "../../providers/functions/sqlite";
import {
  Container,
  Content,
  Button,
  View,
  Text,
  Spinner,
  Icon,
} from "native-base";

function PdfsPreviewPage({ navigation, route }) {
  const { params } = route;
  const [saving, setSaving] = React.useState(false);
  const { state, callReducer } = React.useContext(AppContext);
  const { id, title, description, image_name, file_size, file_name } = params;

  let saved = false;

  if (state.saved[id]) {
    saved = true;
  }

  navigation.setOptions({ title });

  const uri = `${BACKEND_URL}/uploads/pdfs/${file_name}`;

  const viewPdf = () => {
    navigation.navigate("PdfsReadPage", route.params);
  };

  const savePdf = async () => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const onSuccess = () => {
        callReducer({ dispatch: "SAVE_PDF", data: params });
        setSaving(false);
      };

      await savePdfToDatabase(id, title, fileReader.result, onSuccess);
    };

    async function getPdfFromNetwork() {
      setSaving(true);
      let response = await fetch(uri);
      const blob = await response.blob();
      fileReader.readAsDataURL(blob);
    }

    getPdfFromNetwork();
  };

  const removePdf = () => {
    setSaving(true);

    const onSuccess = () => {
      callReducer({ dispatch: "REMOVE_PDF", data: params });
      setSaving(false);
    };

    removePdfFromDatabase(id, onSuccess);
  };

  if (saved) {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent onPress={removePdf}>
          <Icon name="trash" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
    });
  } else if (saving) {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent>
          <Spinner color="black" style={{ marginRight: 10 }} />
        </Button>
      ),
    });
  } else {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent onPress={savePdf}>
          <Icon name="save" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
    });
  }

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" />
      <Content>
        <View style={{ backgroundColor: "silver" }}>
          <Image
            style={{ width: "100%", height: 250, resizeMode: "contain" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${image_name}` }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Button full transparent>
              <Icon name="server" type="Feather" style={{ color: "gray" }} />
              <Text note>{file_size}</Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button full transparent>
              <Icon
                name={saved ? "check-circle" : "circle"}
                type="Feather"
                style={{ color: "gray" }}
              />
              <Text note>{saved ? "SAVED" : "SERVED"}</Text>
            </Button>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Button bordered dark full onPress={viewPdf}>
            <Text>View</Text>
          </Button>
          <Text style={{ marginTop: 10, padding: 2, lineHeight: 25 }}>
            {description}
          </Text>
        </View>
      </Content>
    </Container>
  );
}

export default PdfsPreviewPage;
