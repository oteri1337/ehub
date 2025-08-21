import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { BACKEND_URL } from "../../../../env";
import * as FileSystem from "expo-file-system";
import { Store } from "../../../providers/AppProvider";
import { Spinner, Button, Icon, View, Text, Container } from "native-base";

function PdfsReadPage({ navigation, route }) {
  const { params } = route;
  const [base64, setBase] = React.useState("");
  const [percent, setpercent] = React.useState(1);
  const [saving, setSaving] = React.useState(false);
  const { state, callReducer } = React.useContext(Store);
  const { id, title, file_name } = params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerLeft: () => {
        return (
          <Button
            transparent
            onPress={() => {
              navigation.pop();
            }}
          >
            <Icon
              name="arrow-back"
              type="Ionicons"
              style={{ color: "black" }}
            />
          </Button>
        );
      },
    });
  }, []);

  const uri = `${BACKEND_URL}/uploads/pdfs/${file_name}`;

  let saved = false;

  if (state.saved.object[id]) {
    saved = true;
  }

  const removePdf = async () => {
    setSaving(true);
    const path = `${FileSystem.documentDirectory}${file_name}`;
    const file = await FileSystem.getInfoAsync(path);
    if (file.exists) {
      setBase(uri);
      callReducer({ dispatch: "REMOVE_PDF", data: params });
      await FileSystem.deleteAsync(path, { idempotent: true });
    }
    setSaving(false);
  };

  React.useEffect(() => {
    if (saved) {
      setTimeout(async () => {
        // alert("reading from filesystem");

        const path = `${FileSystem.documentDirectory}${file_name}`;
        const file = await FileSystem.getInfoAsync(path);

        if (file.exists) {
          // alert("file exists");
          setBase(file.uri);
        } else {
          removePdf();
        }
      }, 1000);
    }
  }, []);

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

  React.useLayoutEffect(() => {
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
            <Icon name="save" type="Feather" style={{ color: "black" }} />
          </Button>
        ),
      });
    }
  }, [saved]);

  if (saved) {
    if (base64.length) {
      return (
        <Container>
          <PDFReader
            source={{
              uri: base64,
            }}
          />
        </Container>
      );
    }

    return (
      <Container>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Spinner color="black" />
          <Text style={{ textAlign: "center" }}>Loading From FileSystem</Text>
        </View>
      </Container>
    );
  }

  if (base64.length) {
    return (
      <Container>
        <PDFReader
          source={{
            uri: base64,
          }}
        />
      </Container>
    );
  }

  return (
    <Container>
      <PDFReader
        source={{
          uri,
        }}
      />
    </Container>
  );
}

export default PdfsReadPage;
