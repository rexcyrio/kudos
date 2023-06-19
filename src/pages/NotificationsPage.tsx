import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
import { db } from "../../firebase";
import { Notification } from "../utilities/types";
import NotificationItem from "../components/NotificationItem";

const USER_ID = "IA3mQj16E0EfLJYRRl1z";

function NotificationsPage(): JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const q = query(collection(db, "users", USER_ID, "pointsHistory"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc, index) => {
        const notification = {
          id: doc.id,
          ...doc.data(),
        } as Notification;

        console.log("notification", notification);
        return notification;
      });

      setNotifications(posts);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>This is the notifications page</Text>
      <FlatList
        data={notifications}
        renderItem={({ item, index }) => (
          <NotificationItem timestamp={item.timestamp} points={item.points} />
        )}
        keyExtractor={(notification, index) => notification.id}
      />
    </View>
  );
}

export default React.memo(NotificationsPage);
