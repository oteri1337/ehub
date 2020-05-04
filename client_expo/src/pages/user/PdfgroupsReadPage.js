import React from "react";
import { BACKEND_URL } from "../../../env";
import HeaderComponent from "../../components/HeaderComponent";
import { getRequestThenDispatch } from "../../providers/AppProvider";
import {
  Container,
  Content,
  Text,
  List,
  Left,
  Body,
  Card,
  CardItem,
  Thumbnail,
} from "native-base";

function PdfsPage({ navigation, route }) {
  const { title, slug } = route.params;
  const url = `/api/pdfgroups/${slug}`;
  const { state } = getRequestThenDispatch(url, "UPDATE_PDFGROUP");

  const renderPdfs = () => {
    const group = state.pdfgroups.object[slug];
    const pdfs = group.pdfs?.data || [];

    return pdfs.map((pdf) => {
      return (
        <Card transparent key={pdf.id} style={{ borderBottomWidth: 1 }}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: `${BACKEND_URL}/uploads/images/${pdf.image_name}`,
                }}
              />
              <Body>
                <Text onPress={() => navigation.navigate("PdfsReadPage", pdf)}>
                  {pdf.title}
                </Text>
                <Text note>{pdf.file_size}</Text>
                <Text note>{pdf.description}</Text>
                {/* <WebView source={{ html: pdf.content_html }} /> */}
              </Body>
            </Left>
          </CardItem>
          {/* <CardItem>
            <Left>
              <Button transparent>
                <Icon name="thumbs-up" />
                <Text style={{ padding: 5 }}>{pdf.file_size}</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent>
                <Icon name="ios-save" />
                <Text style={{ padding: 5 }}>{pdf.file_size}</Text>
              </Button>
            </Right>
          </CardItem> */}
        </Card>
      );
    });
  };

  return (
    <Container>
      <HeaderComponent navigation={navigation} />
      <Content padder>
        <Text>{title}</Text>
        <List>{renderPdfs()}</List>
      </Content>
    </Container>
  );
}

export default PdfsPage;
