import React from "react";
import { View, Text } from "native-base";
import { AppContext } from "../../providers/AppProvider";

function CommentsListComponent({ comments }) {
  const { state } = React.useContext(AppContext);

  return comments.map((comment) => {
    const { id, created_at, user_id, user, content } = comment;

    if (user_id === state.user.id) {
      return (
        <View
          key={id}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 5,
            marginLeft: 30,
            marginBottom: 5,
          }}
        >
          <Text>
            <Text note>{created_at} </Text>
            <Text style={{ color: "green" }}>
              {user.first_name} {user.last_name}
            </Text>
          </Text>
          <Text>{content}</Text>
        </View>
      );
    }

    return (
      <View
        key={id}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 5,
          marginRight: 30,
          marginBottom: 5,
        }}
      >
        <Text>
          <Text note>{created_at} </Text>
          <Text style={{ color: "green" }}>
            {user.first_name} {user.last_name}
          </Text>
        </Text>
        <Text>{content}</Text>
      </View>
    );
  });
}

export default CommentsListComponent;
