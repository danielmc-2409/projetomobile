import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";

const API_BASE = "https://xv14dwsm-3000.brs.devtunnels.ms"; 

export default function OdontogramaScreen() {
  const { id_consulta, id_paciente } = useLocalSearchParams();

  const [dentes, setDentes] = useState([]);
  const [selectedDente, setSelectedDente] = useState(null);
  const [estado, setEstado] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDentes, setLoadingDentes] = useState(true);

  const estados = [
    "Cárie",
    "Restaurado",
    "Extraído",
    "tratamento",
    "protese"
  ];

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

  const salvarOdontograma = async () => {
    if (!selectedDente || !estado) {
      Alert.alert("Erro", "Selecione o dente e o estado.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/odontograma/editarOdontograma`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_paciente: Number(id_paciente),
          id_consulta: id_consulta ? Number(id_consulta) : null,
          id_dente: Number(selectedDente),
          estado,
          observacoes,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error("Erro salvar:", json);
        Alert.alert("Erro", json.message || "Falha ao salvar.");
        return;
      }
      Alert.alert("Sucesso", "Registro salvo com sucesso!");
      setSelectedDente(null);
      setEstado("");
      setObservacoes("");
    } catch (e) {
      console.error("Erro salvar odontograma:", e);
      Alert.alert("Erro", "Não foi possível salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#e7e7e7", padding: 16 }}>
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>Odontograma</Text>

      <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ marginBottom: 6, fontWeight: "600" }}>Selecione o dente</Text>
        {loadingDentes ? (
          <ActivityIndicator />
        ) : dentes.length === 0 ? (
          <Text style={{ color: "#666" }}>Nenhum dente cadastrado.</Text>
        ) : (
          dentes.map((d) => (
            <TouchableOpacity
              key={d.id_dente}
              onPress={() => setSelectedDente(d.id_dente)}
              style={{
                padding: 8,
                borderRadius: 6,
                backgroundColor: selectedDente === d.id_dente ? "#d1fae5" : "#fff",
                borderWidth: 1,
                borderColor: "#ddd",
                marginBottom: 6,
              }}
            >
              <Text>{d.numero} — {d.nome ?? "-"}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      <View style={{ backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ marginBottom: 6, fontWeight: "600" }}>Estado</Text>
        {estados.map((e) => (
          <TouchableOpacity
            key={e}
            onPress={() => setEstado(e)}
            style={{
              padding: 8,
              borderRadius: 6,
              backgroundColor: estado === e ? "#bfdbfe" : "#fff",
              borderWidth: 1,
              borderColor: "#ddd",
              marginBottom: 6,
            }}
          >
            <Text>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>


      <TouchableOpacity
        onPress={salvarOdontograma}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>{loading ? "Salvando..." : "Salvar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}