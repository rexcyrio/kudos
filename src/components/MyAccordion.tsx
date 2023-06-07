import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import { List } from "react-native-paper";

function MyAccordion(): JSX.Element {
  return (
    <List.Section title="Frequently Asked Questions">
      <List.Accordion
        title="What is this for?"
        left={(props) => (
          <AntDesign name="forward" {...props} size={12} color="black" />
        )}
      >
        <List.Item
          left={(props) => <></>}
          descriptionNumberOfLines={9}
          title="We celebrate the birth of potatoes. Amet reprehenderit proident nisi minim ea cillum est aute."
          description={<Text>hey there</Text>}
        />
      </List.Accordion>
      <List.Accordion title="When will this be?">
        <List.Item title="Whenever this pandemic is over." />
      </List.Accordion>
      <List.Accordion title="Where will this be?">
        <List.Item title="Ireland" />
      </List.Accordion>
    </List.Section>
  );
}

export default React.memo(MyAccordion);
