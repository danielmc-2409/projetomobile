import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HistoricoConsultas() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [consultas, setConsultas] = useState([
    { id: 1, data: "2025-08-01", procedimento: "Limpeza", status: "Concluída" },
    { id: 2, data: "2025-08-15", procedimento: "Restauração", status: "Agendada" },
    { id: 3, data: "2025-09-01", procedimento: "Extração", status: "Cancelada" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        {/* Header com setas dos dois lados */}
        <View style={styles.navHeader}>
          <TouchableOpacity onPress={() => router.push("/perfpaci?id=${id}")}>
            <Text style={styles.navArrow}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.navTitle}>Histórico de Consultas</Text>

          <TouchableOpacity onPress={() => console.log("Ação da seta direita")}>
            <Text style={styles.navArrow} onPress={() => router.push("/perfilPaci?id=${id}")}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Tabela de consultas */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Data</Text>
          <Text style={styles.headerCell}>Procedimento</Text>
          <Text style={styles.headerCell}>Status</Text>
        </View>
        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id.toString()}
          style={{ marginTop: 5 }}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{item.data}</Text>
              <Text style={styles.cell}>{item.procedimento}</Text>
              <Text
                style={[
                  styles.cell,
                  item.status === "Concluída"
                    ? { color: "green" }
                    : item.status === "Cancelada"
                    ? { color: "red" }
                    : { color: "orange" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    paddingTop: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flex: 1,
  },
  navHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  navArrow: {
    fontSize: 24,
    color: "#333",
  },
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#333",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    color: "#333",
  },
});
