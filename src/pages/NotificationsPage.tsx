import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "../../firebase";

function NotificationsPage(): JSX.Element {
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc, index) => {
        return doc.data();
      });

      setText(posts[0].name);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>This is the notifications page</Text>
      <Text>{text}</Text>
    </View>
  );
}

export default React.memo(NotificationsPage);
