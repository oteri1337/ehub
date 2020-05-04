import React from "react";
// import Pdf from "react-native-pdf";
import PDFReader from "rn-pdf-reader-js";
import { BACKEND_URL } from "../../../env";
import { Container, Content, Text } from "native-base";
import HeaderComponent from "../../components/HeaderComponent";

function PdfsReadPage({ navigation, route }) {
  const { title, file_name } = route.params;

  const uri = `${BACKEND_URL}/uploads/pdfs/${file_name}`;

  // React.useEffect(() => {
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     console.log(fileReader.result);
  //   };
  //   async function getPdfFromNetwork() {
  //     let response = await fetch(uri);
  //     const blob = await response.blob();
  //     fileReader.readAsDataURL(blob);
  //   }
  //   getPdfFromNetwork();
  // }, []);

  // return (
  //   <View style={{ flex: 1 }}>
  //     <Pdf source={source} style={{ flex: 1, height: 300, width: 100 }} />
  //   </View>
  // );

  return (
    <PDFReader
      source={{
        uri,
      }}
    />
  );
}

export default PdfsReadPage;
