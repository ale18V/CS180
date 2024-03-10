import React from 'react';
import { Text, View, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function UserBiometrics() {
  
  return (
    
    <View className="flex-1 mx-10 justify-center items-center">
      <View className="w-full">
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Height: </Text>
            <Text>170cm </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">Weight: </Text>
            <Text>200lbs </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["rgba(56, 163, 165, 0.5)", "rgba(128, 237, 153, 0.3)"]}
          className="flex-row items-center p-3 rounded-xl justify-between mb-4"
          >
          <View className="flex-row items-center">
            <Text className="font-bold ml-2">BMI: </Text>
            <Text>Weight/Height^2 </Text>
          </View>
        </LinearGradient>


      </View>
    </View>
  );
}