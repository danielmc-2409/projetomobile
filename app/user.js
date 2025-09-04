import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Lixo } from '@/assets/components/HeroIcon';
import React, { useState, useEffect } from 'react';
import { useRouter } from "expo-router";


export default function Index() {
  const router = useRouter();


  const [paciente, setPaciente] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  const getPaciente = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://kbj9vsq6-3000.brs.devtunnels.ms/api/mostrarPacienteMob");
      const data = await response.json();
      setPaciente(data.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getPaciente();
  }, []);


  const filteredPacientes = paciente.filter(user =>
    user.nome?.toLowerCase().includes(search.toLowerCase()) ||
    user.id?.toString().includes(search)
  );


  if (loading) {
    return <ActivityIndicator size="large" color="#d4af37" style={styles.loader} />;
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.pesquisa}>
        <TextInput
          style={styles.pesq}
          placeholder="Nome ou ID do Usuário"
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>


      <View style={styles.content}>
        {filteredPacientes.map((user) => (
          <View style={styles.pac} key={user.id}>
            <View style={styles.tituloAt}>
              <TouchableOpacity
                style={styles.info}
                onPress={() => router.push(`/perfpaci?id=${user.id}`)}
              >
                <Text style={styles.nome}>{user.nome}</Text>
                <Text style={styles.idade}>{user.idade} anos</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() =>
                  setPaciente(paciente.filter(item => item.id !== user.id))
                }
              >
                <Lixo size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  pesq: {
    fontSize: 18,
    color: '#989898',
    textAlign: "center",
    backgroundColor: "#d9d9d9",
    width: '90%',
    height: 40,
    borderRadius: 15,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  pesquisa: {
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  pac: {
    backgroundColor: "#d9d9d9",
    width: "90%",
    height: 100,
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
  },
  tituloAt: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
  },
  idade: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
