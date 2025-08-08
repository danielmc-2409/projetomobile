import { Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { Stack, useRouter } from "expo-router";


const usuario = [
  { id: 1, nome: "Henrique", idade: 17 },
  { id: 2, nome: "Daniel", idade: 17 }
];

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.proxAt}>
        <View style={styles.tituloAt}>
          <Text style={styles.titulo}>Próximo Atendimento</Text>
        </View>

        <View style={styles.dados}>
          <Text>Nome:</Text>
          <Text>ID:</Text>
          <Text>Horário:</Text>
        </View>

        <View style={styles.marcar}>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoTexto}>Marcar como atendido</Text>
          </TouchableOpacity>
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

  proxAt: {
    backgroundColor: "#D9D9D9",
    width: "90%",
    height: "45%",
    borderRadius: 15,

    justifyContent: 'space-around',
    alignItems: "center",
    padding: 20,
  },

  tituloAt: {
    marginBottom: 10,
  },

  titulo: {
    fontWeight: "bold"
  },

  dados: {
    alignItems: 'flex-start', // alinha os textos à esquerda
    width: '100%',
    paddingHorizontal: 10,
  },

  marcar: {
    width: '100%'
  },

  botao: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  },

  botaoTexto: {
    fontWeight: "bold",
    textAlign: 'center'
  }
});
