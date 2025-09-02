import { Lixo } from '@/assets/components/HeroIcon';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [consultas, setConsultas] = useState([]);

  const getConsultas = async () => {
    const response = await fetch("https://mx2dv4ww-3000.brs.devtunnels.ms/api/consultas/mostrarConsultaMob");
    const consulta = await response.json();
    setConsultas(consulta.data);
  };

  useEffect(() => {
    getConsultas();
  }, []);

  const handleRemove = (id) => {
    setConsultas((prevConsultas) => prevConsultas.filter(item => item.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Consultas do Dia</Text>

      {consultas.map((user) => (
        <View style={styles.card} key={user.id || user.nome}>
          <Text style={styles.texto}>
            <Text style={styles.label}>Nome:</Text> {user.nome_paciente}
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Procedimento:</Text> {user.nome
              
            }
          </Text>
          <Text style={styles.texto}>
            <Text style={styles.label}>Horário:</Text> {user.hora}
          </Text>

          <View style={styles.botoes}>
            <TouchableOpacity style={styles.botao}>
              <Text style={styles.botaoTexto}>Marcar como atendido</Text>
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
    backgroundColor: "#D9D9D9",
    alignItems: "center",
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
  }
});
