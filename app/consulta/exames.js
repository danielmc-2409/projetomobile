import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function Consulta() {
  const router = useRouter();

  // 🔥 RECEBE O ID EXATAMENTE COMO NO SEU CÓDIGO MODELO
  const { id_consulta, id_paciente } = useLocalSearchParams();

  const onLeftPress = () => {
    router.push({
      pathname: "/consulta/odontograma",
      params: { id_consulta, id_paciente }
    });
  };

  const onRightPress = () => {
    router.push({
      pathname: "/consulta/odontograma", 
      params: { id_consulta, id_paciente }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={onLeftPress}>
            <Text style={styles.navArrowText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.navTitle}>Odontograma</Text>

          <TouchableOpacity onPress={onRightPress}>
            <Text style={styles.navArrowText}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitulo}>Observações e exames</Text>

        <Text style={{ marginTop: 40, fontSize: 16 }}>
          Nenhum envio de exames necessário.
        </Text>

        

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 20,
    alignItems: "center",
  },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },

  navHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 40,
    alignItems: "center",
  },
  navArrowText: { fontSize: 26, fontWeight: "bold", color: "#333" },
  navTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
});
