import React from "react";
import PdfsList from "../../components/PdfsListComponent";
import { Container, List, Button, Icon } from "native-base";
import { getRequestThenDispatch } from "../../../providers/AppProvider";

function PdfsListPage({ navigation }) {
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: "All Books",
  //     headerLeft: () => (
  //       <Button
  //         transparent
  //         onPress={() => {
  //           navigation.openDrawer();
  //         }}
  //       >
  //         <Icon name="menu" type="Feather" style={{ color: "black" }} />
  //       </Button>
  //     ),
  //     headerRight: () => (
  //       <Button
  //         transparent
  //         onPress={() => {
  //           navigation.navigate("AccountPage");
  //         }}
  //       >
  //         <Icon name="user" type="Feather" style={{ color: "black" }} />
  //       </Button>
  //     ),
  //   });
  // }, []);

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
