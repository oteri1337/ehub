import React from "react";
import { Container, List } from "native-base";
import PdfsList from "../../../components/PdfsListComponent";
import { getRequestThenDispatch } from "../../../../providers/AppProvider";

function PdfgroupPage({ navigation, route }) {
  const { slug, title } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title });
  }, []);

  const { send, refreshing, state } = getRequestThenDispatch();
  const { pdfs, next_page_url } = state.pdfgroups.object[slug];

  const list = { data: pdfs };

  const onEndReached = async () => {
    console.log("on end reached fired");
    if (!refreshing) {
      if (next_page_url) {
        send(next_page_url, `UPDATE_PDFGROUP_OBJECT`);
      }
    }
  };

  return (
    <Container>
      <List>
        <PdfsList {...{ list, refreshing, onEndReached }} />
        {/* <PdfsList {...{ list, onRefresh, refreshing, onEndReached }} /> */}
      </List>
    </Container>
  );
}

export default PdfgroupPage;
