import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Agenda, Grupo, Boneco, Lapis, Plus} from '@/assets/components/HeroIcon'; 


export default function Index() {
  return (
    <View style={styles.container}>
        <View style={styles.foto}></View>
        <View style={styles.nome}></View>
        <View style = {styles.infos}></View>
        <View style = {styles.tratamento}></View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9'
  },

  
});
