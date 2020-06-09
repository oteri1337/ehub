import React from "react";
import { Icon } from "native-base";
import { DrawerItem } from "@react-navigation/drawer";

function Link(props) {
  const { label, icon = "ios-qr-scanner", onPress } = props;

  return (
    <DrawerItem
      label={label}
      focused={false}
      onPress={onPress}
      activeTintColor="red"
      labelStyle={{ color: "#000000" }}
      icon={({ focused, size }) => (
        <Icon size={size} name={focused ? icon : icon} />
      )}
    />
  );
}

export default Link;
