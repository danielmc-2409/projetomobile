import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";

function formatarDataHora(dataISO, hora) {
  if (!dataISO) return "";

  // pega apenas AAAA-MM-DD
  const [year, month, day] = dataISO.split("T")[0].split("-");

  // hora vem como "14:30:00"
  const horaFormatada = hora ? hora.slice(0, 5) : "00:00";

  return `${day}/${month}/${year} ${horaFormatada}`;
}

export default function HistoricoConsultas() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarConsultas = async () => {
    try {
      const response = await fetch(
        `https://xv14dwsm-3000.brs.devtunnels.ms/api/consultas/${id}`
      );
      const data = await response.json();
      setConsultas(data.data);
    } catch (error) {
      console.log("Erro ao carregar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) carregarConsultas();
  }, [id]);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* HEADER COM SETAS */}
        <View style={styles.navHeader}>
          <TouchableOpacity
            onPress={() => router.push(`/paciente/detalhesPaciente?id=${id}`)}
          >
            <Text style={styles.navArrow}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.navTitle}>Histórico de Consultas</Text>

          <TouchableOpacity
            onPress={() => router.push(`/paciente/detalhesPaciente?id=${id}`)}
          >
            <Text style={styles.navArrow}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Tabela */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Data</Text>
          <Text style={styles.headerCell}>Procedimento</Text>
          <Text style={styles.headerCell}>Status</Text>
        </View>

        <FlatList
          data={consultas}
          keyExtractor={(item) => item.id_consulta.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>  {formatarDataHora(item.data, item.hora)} </Text>
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
  container: { flex: 1, backgroundColor: "#f6f6f6", alignItems: "center", paddingTop: 40 },

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
  navArrow: { fontSize: 24, color: "#333" },
  navTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
  },
  headerCell: { flex: 1, fontWeight: "bold", color: "#333" },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: { flex: 1, color: "#333" },
});
