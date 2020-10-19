import React from "react";
import shorthash from "shorthash";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";

function CachedImage(props) {
  const { uri } = props.source;
  const name = shorthash.unique(uri);
  const path = `${FileSystem.documentDirectory}${name}`;
  const [source, setSource] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;

    (async () => {
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        if (mounted) {
          setSource(image.uri);
        }
        return;
      }

      console.log(`fetching ${uri}`);
      const new_image = await FileSystem.downloadAsync(uri, path);
      if (mounted) {
        setSource(new_image.uri);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return <Image source={{ uri: source }} {...props} />;
}

export default CachedImage;
