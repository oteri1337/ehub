import React from "react";
import { Container, List, Spinner } from "native-base";
import PdfsList from "../../../components/PdfsListComponent";
import { getRequestThenDispatch } from "../../../../providers/AppProvider";

function PdfgroupPage({ navigation, route }) {
  const data = route.params;
  const { send, refreshing, state, callReducer } = getRequestThenDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: data.title });
    callReducer({ dispatch: "UPDATE_PDFGROUP", data });
  }, []);

  const group = state.pdfgroups?.object[data.slug];

  if (!group) {
    return <Container>
      <Spinner/>
    </Container>
  }

  const { pdfs, next_page_url } = group;

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
      </List>
    </Container>
  );
}

export default PdfgroupPage;
