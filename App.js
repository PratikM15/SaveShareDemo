import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Platform } from 'react-native';
import React, { useState, useRef, useEffect } from 'react'
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import * as MediaLibrary from 'expo-media-library';

export default function App() {

  const viewRef = useRef();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    requestPermission()
    MediaLibrary.requestPermissionsAsync()
  }, [])

  const saveToFiles = async () => {
    try {
      let uri = null
      uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      if (Platform.OS === 'android') {
        if (status === null) {
          requestPermission()
          MediaLibrary.requestPermissionsAsync()
        }
      }
      await MediaLibrary.saveToLibraryAsync(uri);
      if (uri) {
        Alert.alert(
          'Successfull',
          'Image saved successfully.',
          [{ text: 'OK', onPress: () => { } }],
          { cancelable: false },
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const share = async () => {
    try {
      let uri = null
      uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });
      const shareResponse = await Share.open({ url: uri });
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Save and Share Demo</Text>
      <View style={styles.viewContainer} ref={viewRef}>
        <Text>Hello World!</Text>
        <Text>Let's see the demo of saving and sharing the "View" as "Image" in react native.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={saveToFiles}
          title="Save to files"
          color="#841584"
        />
        <Button
          onPress={share}
          title="Share"
          color="#841584"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  heading: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  viewContainer: {
    margin: 10,
    padding: 10,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  buttonContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 5
  }
});
