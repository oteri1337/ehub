import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { BACKEND_URL } from "../../../env";
import HeaderComponent from "../../components/HeaderBackComponent";

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
    <React.Fragment>
      <HeaderComponent {...{ navigation, title }} />
      <PDFReader
        source={{
          uri,
        }}
      />
    </React.Fragment>
  );
}

export default PdfsReadPage;
