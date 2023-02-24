// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Stunden from './Stunden';
import Abschluss from './Abschluss';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';




const Stack = createNativeStackNavigator();


export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Stunden" component={Stunden} />
        <Stack.Screen name="Abschluss" component={Abschluss} />
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}


const styles = StyleSheet.create({
  parent: {
    flex:1,
    justContent: 'center',
    alignContent: 'center'
  }
});

