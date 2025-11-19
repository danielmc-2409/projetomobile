import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Lapis, Plus } from "@/assets/components/HeroIcon";

export default function DetalhesPaciente() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [paciente, setPaciente] = useState(null);
  const [originalPaciente, setOriginalPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPacienteDetalhes = async () => {
      try {
        const response = await fetch(
          `https://xv14dwsm-3000.brs.devtunnels.ms/api/mostrarPacienteMob/${id}`
        );
        const data = await response.json();
        setPaciente(data.data);
        setOriginalPaciente(data.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do paciente:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getPacienteDetalhes();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "red" }}>Paciente não encontrado.</Text>
      </View>
    );
  }

  const updateField = (field, value) => {
    setPaciente((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const houveMudanca =
    JSON.stringify(paciente) !== JSON.stringify(originalPaciente);

  const salvarAlteracoes = async () => {
    try {
      const response = await fetch(
        "https://xv14dwsm-3000.brs.devtunnels.ms/api/usuario",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endereco: paciente.endereco,
            enderecoComercial: paciente.enderecoComercial,
            profissao: paciente.profissao,
            telefone: paciente.telefone,
            estadoCivil: paciente.estadoCivil,
            id_paciente: paciente.id_paciente,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Erro ao atualizar.");
        return;
      }

      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
      setOriginalPaciente(paciente);
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar à API.");
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* NAV */}
        <View style={styles.navHeader}>
          <TouchableOpacity
            onPress={() => router.push(`/paciente/historicoConsultas?id=${id}`)}
          >
            <Text style={styles.navArrowText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.navTitle}>Dados Pessoais</Text>

          <TouchableOpacity
            onPress={() => router.push(`/paciente/historicoConsultas?id=${id}`)}
          >
            <Text style={styles.navArrowText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* FOTO + NOME */}
        <View style={styles.profileImageContainer}>
          {paciente.fotoUrl ? (
            <Image source={{ uri: paciente.fotoUrl }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder} />
          )}

          <Text style={styles.nomePaciente}>{paciente.nome}</Text>
        </View>

        <ScrollView style={{ width: "100%" }}>
          {[ 
            { label: "Endereço", field: "endereco" },
            { label: "Endereço Comercial", field: "enderecoComercial" },
            { label: "Profissão", field: "profissao" },
            { label: "Telefone", field: "telefone" },
            { label: "Estado Civil", field: "estadoCivil" },
          ].map(({ label, field }, index) => (
            <View key={index} style={styles.fieldContainer}>
              <TextInput
                style={styles.inputField}
                value={paciente[field] ?? ""}
                onChangeText={(text) => updateField(field, text)}
                placeholder={label}
                placeholderTextColor="#666"
              />
              <TouchableOpacity style={styles.editButton}>
                <Lapis size={25} color="black" />
              </TouchableOpacity>
            </View>
          ))}

          {houveMudanca && (
            <TouchableOpacity style={styles.saveButton} onPress={salvarAlteracoes}>
              <Text style={styles.saveButtonText}>Salvar alterações</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => router.push(`/paciente/agendarConsulta?id=${id}`)}
        >
          <Plus size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", alignItems: "center", paddingTop: 40 },
  center: { justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    width: "90%",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  navHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  navArrowText: { fontSize: 24, fontWeight: "bold", color: "#333" },
  navTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },

  profileImageContainer: { alignItems: "center", marginBottom: 15 },
  profileImage: { width: 90, height: 90, borderRadius: 45, backgroundColor: "black" },
  profilePlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: "black" },
  nomePaciente: { marginTop: 10, fontWeight: "bold", fontSize: 16, color: "#333" },

  fieldContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  inputField: { flex: 1, fontSize: 14, color: "#333" },
  editButton: { paddingLeft: 10 },

  saveButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },

  plusButton: {
    position: "absolute",
    right: 15,
    bottom: 15,
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});