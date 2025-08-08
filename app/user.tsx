import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

const usuario = [
  { id: 1, nome: "Henrique", idade: 17 },
  { id: 2, nome: "Daniel", idade: 17 }
];

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.pac}>
        <View style={styles.tituloAt}>
          <Text style={styles.titulo}>{usuario[0].nome}</Text>
        </View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40
  },

  pac: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    height: "45%",
    borderRadius: 15,  
    padding: 20,
    
  },

  tituloAt: {
    marginBottom: 10,
  },

  titulo: {
    fontWeight: "bold"
  },


});
