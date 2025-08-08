import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Agenda, Grupo, Boneco, Lixo } from '@/assets/components/HeroIcon';

const consultas = [
  { id: 1, horario: "09:00", nome: "Henrique", procedimentos: "Limpeza" },
  { id: 2, horario: "10:30", nome: "Daniel ", procedimentos: "Extração Simples" },
  { id: 3, horario: "11:15", nome: "Hyoran ", procedimentos: "Obturação" }
];

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consultas do Dia</Text>

      {consultas.map((user) => (
        <View style={styles.card} key={user.id}>
          <Text style={styles.texto}><Text style={styles.label}>Nome:</Text> {user.nome}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Procedimento:</Text> {user.procedimentos}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Horário:</Text> {user.horario}</Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Marcar como atendido</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lixo}>
              <Lixo size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#D9D9D9",
    alignItems: "center"
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  texto: {
    fontSize: 16,
    marginBottom: 4,
  },

  label: {
    fontWeight: "bold",
  },

  botao: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },

  lixo: {
    padding: 10,

  },

  botaoTexto: {
    fontWeight: "bold",
    color: "#333",
  },

  botoes: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 20
  }
});
