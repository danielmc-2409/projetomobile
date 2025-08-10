import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Agenda, Grupo, Boneco, Lapis, Plus, Seta} from '@/assets/components/HeroIcon'; 
import { useState } from "react";





export default function Index() {
const[infos, setInfos]= useState((false)
  
)

  return (
    <ScrollView style={styles.container}>
       <View style={styles.content}>
            <View style= {styles.prontuarios}></View>









       </View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
   
  }
  
});
