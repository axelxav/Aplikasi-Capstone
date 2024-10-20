import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="HomePage"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="ActivityPage"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="UserPage"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
