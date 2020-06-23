import React from "react";
import { Container, List, Text } from "native-base";
import { AppContext } from "../../../providers/AppProvider";
import PdfsList from "../../components/PdfsListComponent";

function PdfsListPage({ navigation }) {
  navigation.setOptions({ title: "All Books" });

  const context = React.useContext(AppContext);
  const { getRequestThenDispatch, state } = context;
  const dispatch = "UPDATE_PDFS";
  const { refreshing, send } = getRequestThenDispatch("/api/pdfs", dispatch);
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
