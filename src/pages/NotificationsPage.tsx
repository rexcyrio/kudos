import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { db } from "../../firebase";
import NotificationItem from "../components/NotificationItem";
import { Notification } from "../utilities/types";

const USER_ID = "IA3mQj16E0EfLJYRRl1z";

function NotificationsPage(): JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "users", USER_ID, "pointsHistory"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc, index) => {
        const notification = {
          id: doc.id,
          ...doc.data(),
        } as Notification;

        return notification;
      });

      setNotifications(posts);
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <FlatList
        data={notifications}
        renderItem={({ item, index }) => (
          <NotificationItem
            timestamp={item.timestamp}
            points={item.points}
            index={index}
          />
        )}
        keyExtractor={(notification, index) => notification.id}
      />
    </View>
  );
}

export default React.memo(NotificationsPage);
