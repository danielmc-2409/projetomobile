import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const API_BASE = "https://xv14dwsm-3000.brs.devtunnels.ms";

const estados = [
  "Cárie",
  "Restaurado",
  "Extraído",
  "Tratamento",
  "Prótese",
];

export default function RealizarConsulta() {
  const router = useRouter();
  const { id_consulta, id_paciente } = useLocalSearchParams();

  const [dentes, setDentes] = useState([]);
  const [loadingDentes, setLoadingDentes] = useState(true);
  const [selectedDente, setSelectedDente] = useState(null);
  const [estado, setEstado] = useState("");
  const [loadingSalvar, setLoadingSalvar] = useState(false);

  // Novos estados para os inputs
  const [tc, setTc] = useState("");
  const [ts, setTs] = useState("");
  const [paMin, setPaMin] = useState("");
  const [paMax, setPaMax] = useState("");

  useEffect(() => {
    async function fetchDentes() {
      setLoadingDentes(true);
      try {
        const res = await fetch(`${API_BASE}/api/odontograma/retornarDentes`);
        const json = await res.json();
        const list = json?.data ?? json ?? [];
        setDentes(list);
      } catch (e) {
        console.error("Erro ao buscar dentes:", e);
        Alert.alert("Erro", "Não foi possível carregar lista de dentes.");
      } finally {
        setLoadingDentes(false);
      }
    }
    fetchDentes();
  }, []);

  const salvarTudo = async () => {
    setLoadingSalvar(true);

    // Conversão dos valores para número ou null
    const parsedTc = tc.trim() === "" ? null : Number(tc);
    const parsedTs = ts.trim() === "" ? null : Number(ts);
    const parsedPaMin = paMin.trim() === "" ? null : Number(paMin);
    const parsedPaMax = paMax.trim() === "" ? null : Number(paMax);

    try {
      // Salvar odontograma se selecionou dente e estado
      if (selectedDente && estado) {
        const resOdo = await fetch(`${API_BASE}/api/odontograma/editarOdontograma`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_paciente: Number(id_paciente),
            id_dente: Number(selectedDente),
            estado,
            observacoes: "",
          }),
        });

        let jsonOdo = {};
        try {
          jsonOdo = await resOdo.json();
        } catch {
          throw new Error("Resposta inválida do servidor ao salvar odontograma");
        }
        if (!resOdo.ok) {
          throw new Error(jsonOdo.message || "Erro ao salvar odontograma");
        }
      }

      // Marcar consulta como realizada e enviar os dados vitais
      const resConsulta = await fetch(`${API_BASE}/api/consultas/marcarRealizada`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_consulta: Number(id_consulta),
          tc: parsedTc,
          ts: parsedTs,
          pa_min: parsedPaMin,
          pa_max: parsedPaMax,
        }),
      });

      let jsonConsulta = {};
      try {
        jsonConsulta = await resConsulta.json();
      } catch {
        throw new Error("Resposta inválida do servidor ao marcar consulta realizada");
      }
      if (!resConsulta.ok) {
        throw new Error(jsonConsulta.message || "Erro ao marcar consulta realizada");
      }

      Alert.alert("Sucesso", "Consulta realizada e salva com sucesso!");
      router.push("nav/agenda");
    } catch (error) {
      console.error("Erro ao salvar tudo:", error);
      Alert.alert("Erro", error.message || "Erro inesperado.");
    } finally {
      setLoadingSalvar(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.titulo}>Realizar Consulta</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Selecione o dente</Text>
        {loadingDentes ? (
          <ActivityIndicator size="small" color="#666" />
        ) : dentes.length === 0 ? (
          <Text style={{ color: "#666" }}>Nenhum dente cadastrado.</Text>
        ) : (
          <ScrollView horizontal style={{ marginVertical: 8 }}>
            {dentes.map((d) => (
              <TouchableOpacity
                key={d.id_dente}
                onPress={() => setSelectedDente(d.id_dente)}
                style={[
                  styles.denteBox,
                  selectedDente === d.id_dente && styles.denteSelecionado,
                ]}
              >
                <Text>
                  {d.numero} - {d.nome ?? "-"}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <Text style={[styles.label, { marginTop: 16 }]}>Estado</Text>
        <ScrollView horizontal style={{ marginVertical: 8 }}>
          {estados.map((e) => (
            <TouchableOpacity
              key={e}
              onPress={() => setEstado(e)}
              style={[
                styles.estadoBox,
                estado === e && styles.estadoSelecionado,
              ]}
            >
              <Text>{e}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Novos campos de texto */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.label}>TC</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o TC"
            keyboardType="numeric"
            value={tc}
            onChangeText={setTc}
          />

          <Text style={styles.label}>TS</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o TS"
            keyboardType="numeric"
            value={ts}
            onChangeText={setTs}
          />

          <Text style={styles.label}>PA Min</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o PA Min"
            keyboardType="numeric"
            value={paMin}
            onChangeText={setPaMin}
          />

          <Text style={styles.label}>PA Max</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o PA Max"
            keyboardType="numeric"
            value={paMax}
            onChangeText={setPaMax}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={salvarTudo}
        style={styles.btnSalvar}
        disabled={loadingSalvar}
      >
        {loadingSalvar ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnSalvarText}>Salvar Consulta</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7", padding: 16 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  section: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 8,
  },
  denteBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  denteSelecionado: {
    backgroundColor: "#d1fae5",
    borderColor: "#22c55e",
  },
  estadoBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  estadoSelecionado: {
    backgroundColor: "#bfdbfe",
    borderColor: "#3b82f6",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  btnSalvar: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnSalvarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
