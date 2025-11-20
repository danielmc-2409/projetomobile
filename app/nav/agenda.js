import { Lixo } from '@/assets/components/HeroIcon';
import React, { useEffect, useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TouchableOpacity, View,
  ActivityIndicator, Alert
} from "react-native";
import { useRouter } from "expo-router";
import ProtectedScreen from '../portecaoTelas';

export default function Index() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getConsultas = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://xv14dwsm-3000.brs.devtunnels.ms/api/consultas/mostrarConsultaMob");
      const consulta = await response.json();
console.log("RESPOSTA DA API ===>", consulta);

setConsultas(consulta.data || []);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsultas();
  }, []);

  const cancelarConsulta = async (id_consulta) => {
  try {
    const response = await fetch(
      "https://xv14dwsm-3000.brs.devtunnels.ms/api/consultas/cancelar",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_consulta })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      Alert.alert("Erro", result.error || "Erro ao cancelar consulta.");
      return;
    }

    setConsultas(prev => prev.filter(c => c.id_consulta !== id_consulta));

    Alert.alert("Pronto!", "Consulta cancelada com sucesso.");

  } catch (error) {
    console.log(error);
    Alert.alert("Erro", "Não foi possível cancelar.");
  }
};

  const confirmarCancelamento = (id_consulta) => {
    Alert.alert(
      "Cancelar Consulta",
      "Tem certeza que deseja cancelar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: () => cancelarConsulta(id_consulta)
        }
      ]
    );
  };

  if (loading) {
    return <View style={styles.loader}><ActivityIndicator size="large" color="#d4af37" /></View>;
  }

  return (
    <ProtectedScreen>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consultas do Dia</Text>

      {consultas.map((item, index) => (
        <View style={styles.card} key={item.id_consulta ?? index}>

          <Text style={styles.texto}><Text style={styles.label}>Nome: </Text>{item.nome_paciente}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Procedimento: </Text>{item.procedimento}</Text>
          <Text style={styles.texto}><Text style={styles.label}>Horário: </Text>{item.hora}</Text>

          <View style={styles.botoes}>

            {/* REALIZAR CONSULTA */}
            <TouchableOpacity
              style={styles.botao}
               onPress={() =>
                router.push({
                pathname: "/consulta/realizarConsulta",
                params: { 
                id_consulta: item.id_consulta, 
                id_paciente: item.id_paciente 
      }
    })
  }
>
              <Text style={styles.botaoTexto}>Realizar Consulta</Text>
            </TouchableOpacity>

            {/* CANCELAR */}
            <TouchableOpacity
              style={styles.lixo}
              onPress={() => confirmarCancelamento(item.id_consulta)}
            >
              <Lixo size={30} color="black" />
            </TouchableOpacity>

          </View>
        </View>
      ))}
    </ScrollView>
    </ProtectedScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#d9d9d9",
    width: "100%",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  texto: { fontSize: 16, marginBottom: 4 },
  label: { fontWeight: "bold" },
  botao: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  botaoTexto: { fontWeight: "bold", color: "#333", textAlign: "center" },
  lixo: { padding: 10 },
  botoes: { flexDirection: 'row', marginTop: 20 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
});