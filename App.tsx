import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, Button, Platform, StyleSheet, View } from 'react-native';

import ChatGPT, { ChatGPTRef } from 'react-native-chatgpt';

export default function App() {
  const refChatGPT = React.useRef<ChatGPTRef>(null);

  const getTextInput = async (): Promise<string> => {
    return new Promise((resolve) => {
      if (Platform.OS == 'ios') {
        Alert.prompt('Search', 'Type something', [{ text: 'OK', onPress: (value) => resolve(`${value}`) }], 'plain-text');
      } else {
        resolve('Hello World');
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ChatGPT ref={refChatGPT} />

      <Button
        onPress={async () => {
          const response = await refChatGPT.current?.loginChatGPT();
          Alert.alert(`login: ${JSON.stringify(response)}`);
        }}
        title="Login"
      />

      <Button
        onPress={async () => {
          const response = await refChatGPT.current?.logoutChatGPT();
          Alert.alert(`logout: ${JSON.stringify(response)}`);
        }}
        title="Logout"
      />

      <Button
        onPress={async () => {
          const search = await getTextInput();
          if (search) {
            const message = await refChatGPT.current?.getResponse(`${search}`, (data: string) => {
              console.log('onProgress:', data);
            });

            Alert.alert(`Response: ${JSON.stringify(message)}`);
          }
        }}
        title="Search answer"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
