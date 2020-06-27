import React from "react";
import { Container, List, Button, Icon } from "native-base";
import PdfsList from "../../components/PdfsListComponent";
import { getRequestThenDispatch } from "../../../providers/AppProvider";

function PdfsListPage({ navigation }) {
  navigation.setOptions({
    title: "All Books",
    headerRight: () => (
      <Button
        transparent
        onPress={() => {
          navigation.navigate("SearchPage");
        }}
      >
        <Icon name="search" type="Feather" style={{ color: "black" }} />
      </Button>
    ),
  });

  const url = "/api/pdfs";
  const dispatch = "UPDATE_PDFS";
  const { state, refreshing, send } = getRequestThenDispatch(url, dispatch);
  const list = state.pdfs;

  const onRefresh = async () => {
    send("/api/pdfs", dispatch);
  };

  const onEndReached = async () => {
    if (!refreshing) {
      const { next_page_url } = list;
      if (next_page_url) {
        send(next_page_url, `${dispatch}_PAGE`);
      }
    }
  };

  return (
    <Container>
      <List>
        <PdfsList {...{ list, onRefresh, refreshing, onEndReached }} />
      </List>
    </Container>
  );
}

export default PdfsListPage;
