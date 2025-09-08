import { useLocalSearchParams, useRouter} from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Lapis, Plus } from "@/assets/components/HeroIcon";


export default function DetalhesPaciente() {
    const router = useRouter();
  const { id } = useLocalSearchParams();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPacienteDetalhes = async () => {
      try {
        const response = await fetch(`https://2n49k5s7-3000.brs.devtunnels.ms/api/mostrarPacienteMob/${id}`);
        const data = await response.json();
        setPaciente(data.data);
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

  // Função para atualizar o estado do paciente conforme edição
  const updateField = (field, value) => {
    setPaciente(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.card}>
        
        <View style={styles.navHeader}>
          <TouchableOpacity style={styles.navArrow}  onPress={() => router.push("/historicoConsultas")}>{"<"}</TouchableOpacity>
          <Text style={styles.navTitle}>Dados Pessoais</Text>
     <TouchableOpacity style={styles.navArrow}  onPress={() => router.push("/historicoConsultas")}>{">"}</TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          {paciente.fotoUrl ? (
            <Image source={{ uri: paciente.fotoUrl }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder} />
          )}
          
          <TextInput
            style={[styles.nomePaciente, styles.inputNome]}
            value={paciente.nome}
            onChangeText={(text) => updateField("nome", text)}
          />
        </View>

        {/* Campos editáveis */}
        <ScrollView style={{ width: "100%" }}>
          {[
            { label: "Endereço", field: "endereco" },
            { label: "Endereço Comercial", field: "enderecoComercial" },
            { label: "Profissão", field: "profissao" },
            { label: "Data de nascimento", field: "idade" },
            { label: "Nacionalidade", field: "nacionalidade" },
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
                <Lapis size={30} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.plusButton} onPress={() => router.push("/procedimento")}>
          <Plus size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const gold = "#c5a234";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", 
    alignItems: "center",
    paddingTop: 40,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#d9d9d9",
    borderRadius: 10,
    width: "90%",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "relative",
  },
  navHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  navArrow: {
    fontSize: 20,
    color: "#333",
  },
  navTitle: {
    fontSize: 16,
    color: "#333",
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "black",
  },
  profilePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "black",
  },
  nomePaciente: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  inputNome: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    paddingVertical: 4,
    minWidth: 150,
  },
  fieldContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 6,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  editButton: {
    paddingLeft: 10,
  },
  editIcon: {
    fontSize: 18,
    color: "#333",
  },
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
  plusIcon: {
    color: "white",
    fontSize: 24,
    lineHeight: 24,
  },
});
