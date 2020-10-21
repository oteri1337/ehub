import React from "react";
import { Container, Text, Button } from "native-base";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Stack = createStackNavigator();
// const { Navigator, Screen } = createDrawerNavigator();

function PdfsHomePage({ navigation }) {
  return (
    <Container>
      <Text>PdfsHomePage</Text>
      <Button
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Text>test</Text>
      </Button>
    </Container>
  );
}

// function PdfsStackPage() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="PdfsHomePage" component={PdfsHomePage} />
//     </Stack.Navigator>
//   );
// }

// function PdfsRouter() {
//   return (
//     <Navigator>
//       <Screen name="PdfsHomePage" component={PdfsStackPage} />
//     </Navigator>
//   );
// }

export default PdfsHomePage;
