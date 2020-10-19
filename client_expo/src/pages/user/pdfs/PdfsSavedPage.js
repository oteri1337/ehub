import React from "react";
import { Container, Text } from "native-base";
import PdfsList from "../../components/PdfsListComponent";
import { Store } from "../../../providers/AppProvider";

function PdfsSavedPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Saved Books" });
  }, []);

  const { state } = React.useContext(Store);

  const list = state.saved;

  console.log(list);

  const refreshing = false;

  const onRefresh = () => {};

  const onEndReached = () => {};

  if (list.data.length === 0) {
    return (
      <Container style={{ justifyContent: "center" }}>
        <Text style={{ textAlign: "center" }}>
          You can save books for offline use
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <PdfsList {...{ list, onRefresh, refreshing, onEndReached }} />
    </Container>
  );
}

export default PdfsSavedPage;
