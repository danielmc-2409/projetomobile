import { Text, View, StyleSheet, ScrollView } from "react-native";


const usuario = [
  { id: 1, nome: "Henrique", idade: 17 },
  { id: 2, nome: "Daniel", idade: 17 },
  { id: 3, nome: "Hyoran", idade: 18 },
  { id: 4, nome: "Hugo", idade: 40 },
  { id: 5, nome: "Lucas", idade: 25 },  // Adicionando mais para teste
  { id: 6, nome: "Fernanda", idade: 22 },
  { id: 7, nome: "Julia", idade: 30 },
  { id: 8, nome: "Carlos", idade: 50 },
];

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
       
        {usuario.map((user) => (
          <View style={styles.pac} key={user.id}>
            <View style={styles.tituloAt}>
              <Text style={styles.nome}>{user.nome}</Text>
              <Text style={styles.idade}>{user.idade} Anos</Text>
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
  },

  content: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    paddingBottom: 20, 
  },

  pac: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    height: 100, 
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },

  tituloAt: {
    marginBottom: 10,
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
