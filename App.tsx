import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {NativeModules} from 'react-native';

// Here I call the native module called CustomModule which is made in java
const {CustomModule} = NativeModules;

const App = () => {

  const [deviceId, setDeviceId] = useState('');

  // This function is communicating with a native function that displays a Toast Native
  const onPress = () => {
    CustomModule.show();
  }

  // This function is communicating with a native function that shows the cell id in phone Native
  const getDeviceId = async () => {
    const id = await CustomModule.getDeviceId();
    setDeviceId(id);
  }

  useEffect(() => {
    getDeviceId();
  }, [])
  
  return (
    <View style={styles.body}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text>Show Toast</Text>
      </TouchableOpacity>
      <View style={styles.deviceContent}>
        <Text>Device id: </Text>
        <Text>{deviceId}</Text>
      </View>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 10
  },
  deviceContent: {
    flexDirection: 'row',
    marginTop: 10
  }
})