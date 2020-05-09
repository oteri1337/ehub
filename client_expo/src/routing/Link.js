import React from "react";
import { Icon } from "native-base";
import { DrawerItem } from "@react-navigation/drawer";

function Link({ label, icon = "ios-qr-scanner", onPress }) {
  return (
    <DrawerItem
      label={label}
      icon={({ focused, color, size }) => (
        <Icon
          size={size}
          name={focused ? icon : icon}
          // style={{ color: "rgba(28, 28, 30, 0.68)" }}
        />
      )}
      onPress={onPress}
    />
  );
}

export default Link;
