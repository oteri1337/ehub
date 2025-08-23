import React from "react";
import { Platform } from "react-native";
import { Store } from "../providers/AppProvider";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { CardStyleInterpolators } from "@react-navigation/stack";

import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import PasswordPage from "../pages/PasswordPage";
// import FullImagePage from "../pages/user/FullImagePage";

// import AvatarPage from "../pages/user/auth/AvatarPage";
// import DetailsPage from "../pages/user/auth/DetailsPage";
// import VerificationPage from "../pages/user/auth/VerificationPage";

// import AccountPage from "../pages/user/account/AccountPage";
// import ChangeEmailPage from "../pages/user/account/ChangeEmailPage";
// import ChangePhotoPage from "../pages/user/account/UpdatePhotoPage";
// import ChangePasswordPage from "../pages/user/account/UpdatePasswordPage";
// import UpdateProfilePage from "../pages/user/account/UpdateProfilePage";

// import TabRoutes from "./TabRoutes";
// import DrawerContent from "./DrawerContent";

// import SearchPage from "../pages/user/SearchPage";

// import UsersReadPage from "../pages/user/UsersReadPage";
// import ChatsReadPage from "../pages/user/ChatsReadPage";

// import PdfsReadPage from "../pages/user/pdfs/PdfsReadPage";
// import PdfGroupPage from "../pages/user/pdfs/groups/PdfgroupPage";
// import PdfsPreviewPage from "../pages/user/pdfs/PdfsPreviewPage";

// import TopicsReadPage from "../pages/user/TopicsReadPage";
// import TopicsCreatePage from "../pages/user/TopicsCreatePage";

// import EventsReadPage from "../pages/user/EventsReadPage";
// import CommentsReadPage from "../pages/user/CommentsReadPage";

const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();

// function MainApp() {
//   let modalNav = {
//     cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
//   };

//   if (Platform.OS == "ios") {
//     modalNav = {};
//   }

//   // prettier-ignore
//   return (
//     <Navigator>
//       <Screen name="eHUB" component={TabRoutes} />

//       <Screen name="AccountPage" component={AccountPage} options={{ ...modalNav }} />
//       <Screen name="ChangePhotoPage" component={ChangePhotoPage} options={{ ...modalNav }}/>
//       <Screen name="ChangeEmailPage" component={ChangeEmailPage} options={{ ...modalNav }} />
//       <Screen name="ChangePasswordPage" component={ChangePasswordPage} options={{ ...modalNav }}/>
//       <Screen name="UpdateProfilePage" component={UpdateProfilePage} options={{ ...modalNav }} />

//       <Screen name="SearchPage" component={SearchPage} />

//       <Screen name="UsersReadPage" component={UsersReadPage} />
//       <Screen name="ChatsReadPage" component={ChatsReadPage} />

//       <Screen name="PdfsReadPage" component={PdfsReadPage} />
//       <Screen name="PdfGroupPage" component={PdfGroupPage} />
//       <Screen name="PdfsPreviewPage" component={PdfsPreviewPage} />

//       <Screen name="TopicsReadPage" component={TopicsReadPage} />
//       <Screen name="TopicsCreatePage" component={TopicsCreatePage} />

//       <Screen name="EventsReadPage" component={EventsReadPage} />

//       <Screen name="CommentsReadPage" component={CommentsReadPage} />
//       <Screen name="FullImagePage" component={FullImagePage} />
//     </Navigator>
//   );
// }

function Routes() {
  const { state } = React.useContext(Store);

  // // prettier-ignore
  // if (state.user ?? false) {

  //   if (state.user.verified == 0) {
  //     return <Navigator>
  //         <Screen name="VerificationPage" component={VerificationPage}/>
  //     </Navigator>
  //   }

  //   if (!state.user.first_name.length) {
  //     return <Navigator>
  //         <Screen name="DetailsPage" component={DetailsPage}/>
  //     </Navigator>
  //   }

  //   if (state.user.photo_profile == "human.png") {
  //     return <Navigator>
  //         <Screen name="AvatarPage" component={AvatarPage}/>
  //     </Navigator>
  //   }

  //   return <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
  //     <Drawer.Screen name="Library" component={MainApp}/>
  //   </Drawer.Navigator>
  // }

  return (
    <Navigator headerMode="none">
      <Screen name="HomePage" component={HomePage} />
      <Screen name="SignInPage" component={SignInPage} />
      <Screen name="SignUpPage" component={SignUpPage} />
      <Screen name="PasswordPage" component={PasswordPage} />
    </Navigator>
  );
}

export default Routes;
