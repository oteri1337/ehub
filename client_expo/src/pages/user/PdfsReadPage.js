import React from "react";
import { StatusBar } from "react-native";
import PDFReader from "rn-pdf-reader-js";
import { BACKEND_URL } from "../../../env";
import { Spinner, Button, Icon, View } from "native-base";
import { AppContext } from "../../providers/AppProvider";
import {
  savePdfToDatabase,
  removePdfFromDatabase,
  readPdfFromDatabase,
} from "../../providers/functions/sqlite";

function PdfsReadPage({ navigation, route }) {
  const { params } = route;
  const [base64, setBase] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const { state, callReducer } = React.useContext(AppContext);
  const { id, title, file_name } = params;

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
          <Icon name="arrow-back" type="Ionicons" style={{ color: "black" }} />
        </Button>
      );
    },
  });

  const uri = `${BACKEND_URL}/uploads/pdfs/${file_name}`;

  let saved = false;

  if (state.saved[id]) {
    saved = true;
  }

  React.useEffect(() => {
    if (saved) {
      setTimeout(() => {
        console.log("reading from database");

        const onSuccess = (_, { rows }) => {
          setBase(rows._array[0].blob);
        };

        readPdfFromDatabase(id, onSuccess);
      }, 1000);
    }
  }, []);

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

  if (saved) {
    if (base64.length) {
      return (
        <React.Fragment>
          <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" />
          <PDFReader
            source={{
              base64,
            }}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" />
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Spinner color="black" />
        </View>
      </React.Fragment>
    );
  }

  if (base64.length) {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" />
        <PDFReader
          source={{
            base64,
          }}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#f0f0f0" />
      <PDFReader
        source={{
          uri,
        }}
      />
    </React.Fragment>
  );
}

export default PdfsReadPage;
