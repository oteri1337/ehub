import React from "react";
import { Icon } from "native-base";
import { getRequestThenDispatch } from "../providers/AppProvider";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

function DrawerContent(props) {
  const url = "/api/pdfparentgroups";
  const { state } = getRequestThenDispatch(url, "UPDATE_PDFPARENTGROUPS");

  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="All Books"
        icon={() => <Icon name="minus-square" type="Feather" />}
      />
      <DrawerItem
        label="Saved Books"
        icon={() => <Icon name="save" type="Feather" />}
      />
      <DrawerItem
        label="Sample Category"
        icon={() => <Icon name="save" type="Feather" />}
      />
    </DrawerContentScrollView>
  );
}

export default DrawerContent;
