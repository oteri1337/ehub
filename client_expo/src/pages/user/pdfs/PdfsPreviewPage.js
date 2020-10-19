import React from "react";
import { Image } from "react-native";
import { BACKEND_URL } from "../../../../env";
import * as FileSystem from "expo-file-system";
import { Store } from "../../../providers/AppProvider";
import { Container, Content, Button, View, Text, Icon, H1 } from "native-base";

function PdfsPreviewPage({ navigation, route }) {
  const { params } = route;
  const [percent, setpercent] = React.useState(1);
  const [saving, setSaving] = React.useState(false);
  const { state, callReducer } = React.useContext(Store);
  const { id, title, description, image_name, file_size, file_name } = params;

  let saved = false;

  if (state?.saved.object[id]) {
    saved = true;
  }

  React.useLayoutEffect(() => {
    const size = file_size / 1e6;

    if (size > 9 && !saved) {
      alert("please download large books before reading for best experience");
    }
  }, []);

  const uri = `${BACKEND_URL}/uploads/pdfs/${file_name}`;

  const viewPdf = () => {
    navigation.navigate("PdfsReadPage", route.params);
  };

  const savePdf = async () => {
    setSaving(true);
    const path = `${FileSystem.documentDirectory}${file_name}`;
    const file = await FileSystem.getInfoAsync(path);

    if (!file.exists) {
      // await FileSystem.downloadAsync(uri, path);

      const dr = FileSystem.createDownloadResumable(uri, path, {}, (data) => {
        const { totalBytesExpectedToWrite, totalBytesWritten } = data;

        const progress = totalBytesExpectedToWrite / totalBytesWritten;

        setpercent((100 / progress).toFixed(0));
      });

      await dr.downloadAsync(uri, path);
    }

    callReducer({ dispatch: "SAVE_PDF", data: params });
    setSaving(false);
  };

  const removePdf = async () => {
    setSaving(true);
    const path = `${FileSystem.documentDirectory}${file_name}`;
    const file = await FileSystem.getInfoAsync(path);

    if (file.exists) {
      await FileSystem.deleteAsync(path, { idempotent: true });
    }

    callReducer({ dispatch: "REMOVE_PDF", data: params });
    setSaving(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerStyle: {
        shadowColor: "transparent",
      },
      headerLeft: () => (
        <Button transparent onPress={() => navigation.pop()}>
          <Icon name="x" type="Feather" style={{ color: "black" }} />
        </Button>
      ),
    });

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
            <Text style={{ color: "black" }}>{percent}%</Text>
            {/* <Spinner color="black" style={{ marginRight: 10 }} /> */}
          </Button>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Button transparent onPress={savePdf}>
            <Icon name="download" type="Feather" style={{ color: "black" }} />
          </Button>
        ),
      });
    }
  }, [percent, saving]);

  return (
    <Container>
      {/* <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" /> */}
      <Content>
        <View style={{ paddingBottom: 10, paddingTop: 10 }}>
          <Image
            resizeMode="contain"
            style={{ width: "100%", height: 250, resizeMode: "contain" }}
            source={{ uri: `${BACKEND_URL}/uploads/images/${image_name}` }}
          />
        </View>
        <H1
          style={{
            padding: 15,
            textAlign: "center",
            textTransform: "capitalize",
            paddingBottom: 5,
            fontWeight: "bold",
          }}
        >
          {title}
        </H1>
        <Text style={{ textAlign: "center" }}>{params.file_size_string}</Text>

        <Text
          style={{
            padding: 20,
            paddingTop: 5,
            paddingBottom: 5,
            lineHeight: 25,
            textAlign: "justify",
          }}
        >
          {description}
        </Text>
        {/* <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Button full transparent>
              <Icon name="server" type="Feather" />
              <Text>{file_size}</Text>
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Button full transparent>
              <Icon name={saved ? "check-circle" : "circle"} type="Feather" />
              <Text>{saved ? "SAVED" : "SERVED"}</Text>
            </Button>
          </View>
        </View> */}
      </Content>
      <View style={{ padding: 10, marginTop: 10 }}>
        <Button full onPress={viewPdf} style={{ borderRadius: 50 }}>
          <Text>Read Now</Text>
        </Button>
      </View>
    </Container>
  );
}

export default PdfsPreviewPage;
