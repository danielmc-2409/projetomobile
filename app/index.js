import { Lixo } from '@/assets/components/HeroIcon';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";

export default function Index() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);

  const getConsultas = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://kbj9vsq6-3000.brs.devtunnels.ms/api/consultas/mostrarConsultaMob");
      const consulta = await response.json();
      setConsultas(consulta.data);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConsultas();
  }, []);

  const handleRemove = (id) => {
    setConsultas((prevConsultas) => prevConsultas.filter(item => item.id !== id));
  };

  if (loading) {
    return <View style={styles.loader}><ActivityIndicator size="large" color="#d4af37" /></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consultas do Dia</Text>

      {consultas.map((user, index) => (
        <View style={styles.card} key={user.id ?? index}>
          <Text style={styles.texto}>
            <Text style={styles.label}>Nome: </Text>
            <Text>{user.nome_paciente}</Text>
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Procedimento: </Text>
            <Text>{user.nome}</Text>
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Horário: </Text>
            <Text>{user.hora}</Text>
          </Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Realizar Consulta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.lixo} onPress={() => handleRemove(user.id)}>
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
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
