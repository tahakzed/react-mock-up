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

export default function Stunden({navigation}) { 

      
  function changeTeamValue(v){
    setTeamValue(v);
    setSliderTextValue(v);
  }
  function changeStundenValue(v){
    setStundenValue(v);
    setSliderTextValue(v);
  }
  const [teamValue, setTeamValue] = useState(0.2);
  const [StundenValue, setStundenValue] = useState(0.2);
  const [sliderTextValue, setSliderTextValue] = useState(0.2);
  const [Checked, setChecked]=useState(false);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0);
  const [isModalOpen,setModalOpen] = useState(false);
  
  const [Verortung, setVerortung]= useState('https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png');
  const [bilder, setBilder]= useState('https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png');

  function openGalleryVerortung(){
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setVerortung(image.path);
    });
  }

  function openGalleryBilder(){
    const options = {
      storageOptions :{
        path: 'images',
        mediaType: 'photo',
      },
      
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response)
      if(response.didCancel){
        console.log('User cancelled the selection');
      }
      else if(response.error){
        console.log('Some error= ', response.error);
      }
      else{
        console.log('User selected an image');
        const source = response.assets[0].uri;
        console.log('Source='+source);
        setBilder(source);
      }
    });
  }

  

  async function openCameraBilder()  {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        const options = {
          storageOptions :{
            path: 'images',
            mediaType: 'photo',
          },
          
        };
    
        launchCamera(options, response => {
          console.log('Response = ', response)
          if(response.didCancel){
            console.log('User cancelled the selection');
          }
          else if(response.error){
            console.log('Some error= ', response.error);
          }
          else{
            console.log('User selected an image');
            const source = response.assets[0].uri;
            console.log('Source='+source);
            setBilder(source);
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    
  }
  return (
    <SafeAreaView style = {styles.parent}>
      <View style={styles.body}>
      <Text style={styles.headings}>Verortung</Text>
      
     
      <View style={styles.image1parent}>
        <TouchableHighlight onPress={()=> {
          openGalleryVerortung();
        }}>
        <Image style={styles.image1} source={{uri: Verortung}} />
        </TouchableHighlight>

        <View style={styles.optionscontainer}>

          <View style={styles.options}>
            <Text style={styles.optionText}>
            Bauteil
            </Text>
          </View>
          <View style={styles.options}>
            <Text style={styles.optionText}>
            Stock
            </Text>
          </View>
          <View style={styles.options}>
            <Text style={styles.optionText}>
            Raum
            </Text>
          </View>

        </View>
      </View>

      <Text style={styles.headings}>
        Bilder
      </Text>
      <TouchableHighlight onPress={()=> {
          setModalOpen(true);
        }}>
        <Image style={styles.bilder} source={{uri: bilder}} />
        </TouchableHighlight>

        <Modal style={{
          margin: 0,
          justifyContent: 'flex-end'
        }}
          isVisible = {isModalOpen}
          onBackdropPress = {() => {setModalOpen(false)}}
          onBackButtonPress = {()=> {setModalOpen(false)}}
          swipeDirection = "down"
          // onSwipeComplete={setModalOpen(!isModalOpen)}
          animationIn= "bounceInUp"
          animationOut = "bounceOutDown"
          animationInTiming = {900}
          animcationOutTiming = {500}
          backdropTransitionInTiming = {1000}
          backdropTransitionOutTiming = {500}
        >
          <View
          style={styles.modalContent} 
          >
            <Button
            variant='text'
             title="Open Camera"
             style={{margin: 10, padding:10}}
              onPress={()=>{openCameraBilder()}}/>

            <Button
            variant='text'
             title="Open Gallery"
             style={{margin: 10, padding:10}}
              onPress={()=>{openGalleryBilder()}}/>
            
          </View>
        </Modal>
      <TextInput
        style={styles.input}
        editable
        multiline
        numberOfLines={3}
        placeholder="Beschreibung der Stundenlohntaetigkeit"
      />

        <View style={styles.sliderParent}>
          <View style={styles.sliderLabelParent}>
            <Text style= {styles.sliderLabel}>
              Team
            </Text>
            <Text style= {styles.sliderLabel}>
              Stunden
            </Text>
          </View>
          <View style={styles.slider}>
            <Slider value={teamValue}  onValueChange= {value => changeTeamValue(value)} />
            <Slider value={StundenValue}  onValueChange= {value => changeStundenValue(value)} />
         </View>

         <View style= {styles.sliderValueParent}>
          <Text style={styles.sliderValue}>
            {Number(Number(sliderTextValue).toFixed(2)*100).toFixed(0)} Std.
          </Text>
         </View>
        </View>

        <View style={styles.auftraggeberParent}>
          <Text style={styles.headings2}>
            Auftraggeber Vorort
          </Text>
          <BouncyCheckbox
              size={20}
              fillColor="green"
              unfillColor="#FFFFFF"
              text="Aufwand nicht schaetzoar"
              iconStyle={{ borderColor: "green",  }}
              innerIconStyle={{ borderWidth: 1 }}
              textStyle={{ fontSize: 15, textDecorationLine: "none",  }}
              isChecked={Checked}
              disableBuiltInState
              onPress={() => {setChecked(!Checked)}}/>
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
         {
          index: 3,
          value: 'Pamela Anderson',
         }
        ]}
        renderItem={item => <Text style={styles.listItems}>{item.value}</Text>}
      />
            </View>
      
      <Button
        title="Anmeldung" color="#0277bd" style={{marginTop: 5, padding: 5}}
      />
      </View>
     <View style= {styles.bottomButtonsParent}>
     <Button
        title="Stunden" color="#0277bd" style={{flex: 2, padding: 5, margin: 5}}
      />
      <Button
      onPress={()=>navigation.navigate('Abschluss')}
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
    image1parent:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    image1: {
      height: 90,
      width: 213,
      borderColor: 'black',
      padding: 20,
      borderWidth: 2,
    },
    optionscontainer:{
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    options: {
      borderWidth:2,
      alignItems: 'center',
    },
    optionText: {
      padding: 3
    },
  
    bilder: {
      height: 73,
      width: 302,
      backgroundColor: 'pink',
      alignSelf: 'center'
    },
    input: {
      alignItems: 'stretch',
      height: 60,
      width: 302,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    sliderParent: {
      flexDirection: 'row',
      
    },
    sliderLabelParent: {
      flex: 3,
      flexDirection: 'column',
      
    },
    sliderLabel:{
      padding: 10
    },
    slider:{
      flexDirection: 'column',
      flex:5,
      paddingRight: 10
    },
    sliderValueParent: {
      flex:2,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    sliderValue: {
      fontWeight: 'bold',
    },
    auftraggeberParent: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    headings2:{
      fontWeight: 'bold',
      fontSize: 16
    },
    scrollView: {
      marginTop: 10,
      height: 80,
      borderWidth: 1
    },
    listItems: {
      fontSize: 18,
    },
    bottomButtonsParent: {
      flexDirection: 'row',
      alignItems: 'stretch'
    },
    bottomButton: {
      flex: 2
    },
    modalContent: {
      backgroundColor: 'white',
      paddingTop:10,
      paddingHorizontal: 12,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      minHeight: 100,
      paddingBottom: 20,
    }
  
  });