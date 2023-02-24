import { Slider } from '@miblanchard/react-native-slider';
import { AppBar, Button } from '@react-native-material/core';
import {Selector} from 'react-native-flatlist-selector';
import { StatusBar } from 'expo-status-bar';

import React, {useState} from 'react';
//import {launchCamera, launchImageLibrary} from react-native-image-picker
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableHighlight, Image,
PermissionsAndroid } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import  Modal  from 'react-native-modal';
import ToggleSwitch from 'toggle-switch-react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function Abschluss({navigation}) {
    const [Checked, setChecked]=useState(false);
    const [toggle1,setToggle1] = useState(false);
    const [toggle2,setToggle2] = useState(false);
    const [selectedPersonIndex, setSelectedPersonIndex] = useState(0);
    const [unterschrift, setUnterschrift]= useState('https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png');

    function openGalleryUnterschrift(){
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          setUnterschrift(image.path);
        });
      }
    return (
        <SafeAreaView style = {styles.parent}>
            <View style= {styles.body}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <Text style={styles.headings}>
                    Offene Punkte</Text>
                    <BouncyCheckbox
                        size={20}
                        fillColor="green"
                        unfillColor="#FFFFFF"
                        text="Meine"
                        iconStyle={{ borderColor: "green",  }}
                        innerIconStyle={{ borderWidth: 1 }}
                        textStyle={{ fontSize: 15, textDecorationLine: "none",  }}
                        isChecked={Checked}
                        disableBuiltInState
                        onPress={() => {setChecked(!Checked)}}/>
                    </View>

                <View style={styles.sectionParent} >
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.headings}>
                        Ertellungsdatum</Text>
                        <Text style={{fontSize: 18, marginBottom: 10}}>
                        Behinderung Beschreibung</Text>
                    </View>
                    <ToggleSwitch
                        isOn={toggle1}
                        onColor="blue"
                        offColor="grey"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="small"
                        
                        onToggle={isOn => setToggle1(isOn)}
                        />
                </View>
                <View style={styles.sectionParent} >
                    <View style={{flexDirection: 'column'}}>
                        <Text style={styles.headings}>
                        Bauteil, Raum, Stock</Text>
                        <Text style={{fontSize: 18, marginBottom: 10}}>
                        Beschreibung</Text>
                    </View>
                    <ToggleSwitch
                        isOn={toggle2}
                        onColor="blue"
                        offColor="grey"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="small"
                        
                        onToggle={isOn => setToggle2(isOn)}
                        />
                </View>

            <Text style={styles.headings}>
                Team auf Baustelle
            </Text>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
            <TextInput
                style={styles.input}
                editable
                multiline
                numberOfLines={3}
                placeholder="Suche"
            />
            <Button
                title="+" color="#0277bd" style={{flex: 1, height: 40}}
            />

            </View>

            <View style={styles.scrollView}>
                <Selector
                    selectedIndex = {selectedPersonIndex}
                    getSelectedIndex={selectedIndex => setSelectedPersonIndex(selectedIndex)}
                    selectedColor = 'lightgreen'
                    data={[
                    {
                        index: 0,
                        value: 'Jim Halpert',
                    }, 
                    {
                        index: 1,
                        value: 'Dwight Schrute',
                    },
                    {
                        index: 2,
                        value: 'Michael Scott',
                    },
                    ]}
                    renderItem={item => <Text style={{fontSize: 18,}}>{item.value}</Text>}/>
            </View>
            <Text style={styles.headings}>
                Unterschrift
            </Text>
            <TouchableHighlight onPress={()=>{openGalleryUnterschrift()}}>
            <Image style={styles.unterschrift} source={{uri: unterschrift}} />
            </TouchableHighlight>

            <Button
        title="Taetigkeitsberischt senden" color="#0277bd" style={{marginTop: 5, padding: 5}}
      />
            </View>
            <View style= {styles.bottomButtonsParent}>
     <Button
     onPress={()=>navigation.navigate('Stunden')}
        title="Stunden" color="#0277bd" style={{flex: 2, padding: 5, margin: 5}}
      />
      <Button
      
        title="Abschluss" color="#0277bd"  style={{flex: 2, padding: 5, margin: 5}}
      />
     </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
        marginTop: StatusBar.currentHeight
      },
      body: {
        flexDirection: 'column',
        padding: 15
      },
      headings: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
      },
      
      sectionParent: {
        borderWidth: 2,
        borderColor: 'black',
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
      },
      input: {
        alignItems: 'stretch',
        height: 40,
        width: 302,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: 2
      },
      scrollView: {
        marginTop: 10,
        height: 80,
        borderWidth: 1
      },
      unterschrift: {
        height: 84,
        width: 298,
        backgroundColor: 'pink',
        alignSelf: 'center',
      },
      bottomButtonsParent: {
        flexDirection: 'row',
        alignItems: 'stretch'
      },

});