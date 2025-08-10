import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Agenda, Grupo, Boneco, Lapis, Plus, Seta} from '@/assets/components/HeroIcon'; 
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { push } from "expo-router/build/global-state/routing";

export default function Index() {

    const router = useRouter();
const[infos, setInfos]= useState((false)
  
)

  return (
    <View style={styles.container}>
        <View> 
          <Image source={require("@/assets/images/perfil.png")} style={styles.ftdeperfil}></Image>
        </View>
        <View >
          <Text style={styles.nome}>Lucas Henrique Duarte Silva</Text>
        </View>

        <View style = {styles.infos}>
          <Text style={styles.nome}>Informações Detalhadas</Text>
     
        <TouchableOpacity onPress={() => setInfos(!infos)}>  <Seta size={30} color="black" /></TouchableOpacity>


       
          
          </View>
       
          {infos && (

            <View style={styles.quadro}>
             <TouchableOpacity onPress={() => router.push("/prontuarios")} style={styles.prontuario}>Prontuários</TouchableOpacity>
              <Text style={styles.textoInfo}>Última consulta: 10/07/2025 – Limpeza
Próxima consulta: 25/07/2025 – Restauração</Text>
               <Text style={styles.textoInfo}>Observação rápida: Paciente com sensibilidade no molar superior esquerdo.</Text>
            </View>

          ) }
    <View style={styles.tratamento}> <TouchableOpacity style={styles.trat}>Iniciar Tratamento</TouchableOpacity></View>
      
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
  quadro:{
    backgroundColor: "white",
    width: "90%",
    borderRadius: 15,
    height: 300,
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  textoInfo: {
    padding: 20
  },
  prontuario: {
    padding: 20,
    fontSize: 17,
    fontWeight: 'bold',
   textDecorationLine: 'underline'

  },
  tratamento:{
      position: 'absolute',
       bottom: '5%',
        width: '60%',
       
  },
  trat: {
    backgroundColor: 'white',
    
    height: 50,
    borderRadius: 15,
    textAlign: 'center',
    padding: 15,
    fontSize: 20,
    fontWeight: 'bold'

  }

 
  
});
