import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput} from "react-native";
import { Lixo } from '@/assets/components/HeroIcon';
import React, { useState } from 'react';
import { Stack, useRouter } from "expo-router";


export default function Index() {
 const router = useRouter();








  const [usuario, setUsuario] = useState([
  { id: 1, nome: "Henrique", idade: 17 },
  { id: 2, nome: "Daniel", idade: 17 },
  { id: 3, nome: "Hyoran", idade: 18 },
  { id: 4, nome: "Hugo", idade: 40 },
  { id: 5, nome: "Venicios", idade: 25 },
  { id: 6, nome: "Alan", idade: 22 },
  { id: 7, nome: "Joao", idade: 30 },
  { id: 8, nome: "Vitor", idade: 50 },
  { id: 9, nome: "Jose", idade: 50 }
]);

  return (
    

    <ScrollView style={styles.container}>
      <View style = {styles.pesquisa}>
        <TextInput style={styles.pesq} placeholder="Nome ou Id do Usuário"></TextInput>
      </View>
      <View style={styles.content}>
        {usuario.map((user) => (
          <View style={styles.pac} key={user.id}>

            <View style={styles.tituloAt}>
         
              <TouchableOpacity 
                style={styles.info}
                onPress={() => router.push('/perfpaci')}
              >
                <Text style={styles.nome}>{user.nome}</Text>
                <Text style={styles.idade}>{user.idade} Anos</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setUsuario(usuario.filter(item => item.id !== user.id))}>
                <Lixo size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#D9D9D9",

  },

pesq: {
    fontSize: 18,
    color: '#989898ff',
   textAlign: "center",
     backgroundColor:"#ffffffff",
     width: '90%',
     height: 40,
         borderRadius: 15,
         marginBottom: 40
},

pesquisa: {
width:'100%',
display: 'flex',
justifyContent:'center',
alignItems:'center'
},



  content: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    paddingBottom: 20, 
  },
  pac: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 100, 
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },
  tituloAt: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },
  info: {
    flex: 1
  },
  nome: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
  idade: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});
