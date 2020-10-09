import React from "react";
import shorthash from "shorthash";
import { Thumbnail } from "native-base";
import * as FileSystem from "expo-file-system";

function CachedThumbnail(props) {
  const { uri } = props.source;
  const name = shorthash.unique(uri);
  const path = `${FileSystem.cacheDirectory}${name}`;
  const [source, setSource] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        setSource(image.uri);
        return;
      }

      const new_image = await FileSystem.downloadAsync(uri, path);
      setSource(new_image.uri);
    })();
  }, []);

  return <Thumbnail source={{ uri: source }} {...props} />;
}

export default CachedThumbnail;
