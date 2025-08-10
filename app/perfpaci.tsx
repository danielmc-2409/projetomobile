import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Agenda, Grupo, Boneco, Lapis, Plus, Seta} from '@/assets/components/HeroIcon'; 


export default function Index() {
  return (
    <View style={styles.container}>
        <View style={styles.foto}> 
          <Image source={require("@/assets/images/perfil.png")} style={styles.ftdeperfil}></Image>
        </View>
        <View style={styles.caixanome}>
          <Text style={styles.nome}>Lucas Henrique Duarte Silva</Text>
        </View>

        <View style = {styles.infos}>
          <Text style={styles.nome}>Informações Detalhadas</Text>
     
        <TouchableOpacity onPress={() => (console.log('chegou aq'))}>  <Seta size={30} color="black" style={styles.seta}/></TouchableOpacity>
          </View>
      
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems:'center',
    flexDirection:'column',
    padding: 40
  },

  ftdeperfil: {
    width: 150,         
    height: 150,
    borderRadius: 100,
    marginBottom: 20
  },
  nome:{
    fontSize: 20,
  fontWeight: 'bold',
   textAlign: 'center',
   marginHorizontal: 10
},

  infos:{
    backgroundColor: "white",
    width: '90%',
    height: 40,
    borderRadius: 15,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30

  },
 
  
});
