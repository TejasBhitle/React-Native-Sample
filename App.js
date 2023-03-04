import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
// import {PermissionsAndroid} from 'react-native';
// import { messaging } from '@react-native-firebase/messaging';
import { initializeApp } from '@react-native-firebase/app';
import { getMessaging, getToken, onMessage } from '@react-native-firebase/messaging';
 

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme(); 
  const firebaseConfig = {
    apiKey: "AIzaSyBGlp6rfK0_6FqZfnV_c0I3FaOR10qNEKU",
    authDomain: "thefoodcourt-fc44b.firebaseapp.com",
    projectId: "thefoodcourt-fc44b",
    storageBucket: "thefoodcourt-fc44b.appspot.com",
    messagingSenderId: "331502870463",
    appId: "1:331502870463:web:83060c9b62082015bb0b0a",
    measurementId: "G-8ZLRXEJ1X9"
};

  console.log('initializeApp');
  initializeApp(firebaseConfig);
  console.log('initializeApp done');
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const messaging = getMessaging();
  const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

  onMessageListener().then((payload) => {
    console.log("got fcm notification");
    console.log(payload);
  })
  .catch((err) => console.log('failed', err));

  useEffect(() => {
    
    console.log('useEffect');
    const checkToken = async () => {
      console.log("checking token");
      getToken(messaging, { validKey : 'BOeiooI1eZV7Oh6q1Zw8ffJvTX120Av4HcsPj9romHxFmVolquC5oRnbSG-wHPmHDm8I8X1dP7I5iGKP4pOS0co' })
      .then(fcmToken => {
        if(fcmToken){
          console.log('fcmToken :'+fcmToken);
        }
        console.log("token checked");
      })
      .catch(error => {
        console.log(error);
      });
      
    }

    checkToken();

  }, []);



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
