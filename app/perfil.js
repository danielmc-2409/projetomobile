import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { Lapis, Plus } from "@/assets/components/HeroIcon";


export default function Index() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [modalCadastrar, setModalCadastrar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [nome, setNome] = useState("");
  const [duracaoEstimada, setDuracaoEstimada] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    buscarProcedimentos();
  }, []);

  const buscarProcedimentos = async () => {
    try {
      const response = await fetch("https://kbj9vsq6-3000.brs.devtunnels.ms/api/procedimento/retornar");
      const data = await response.json();
      setProcedimentos(data);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os procedimentos.");
    }
  };

  const limparForm = () => {
    setNome("");
    setDuracaoEstimada("");
    setPreco("");
    setItemSelecionado(null);
  };

  const abrirCadastrar = () => {
    limparForm();
    setModalCadastrar(true);
  };

  const salvarCadastrar = async () => {
    if (!nome || !duracaoEstimada || !preco) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch("https://kbj9vsq6-3000.brs.devtunnels.ms/api/procedimento/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          duracaoEstimada: parseInt(duracaoEstimada),
          preco: parseFloat(preco),
        }),
      });

      if (response.ok) {
        await buscarProcedimentos();
        setModalCadastrar(false);
        limparForm();
      } else {
        Alert.alert("Erro", "Erro ao cadastrar procedimento.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão.");
    }
  };

  const abrirEditar = (item) => {
    setItemSelecionado(item);
    setNome(item.nome);
    setDuracaoEstimada(String(item.duracaoEstimada));
    setPreco(String(item.preco));
    setModalEditar(true);
  };

  const salvarEditar = async () => {
    if (!nome || !duracaoEstimada || !preco) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const response = await fetch("https://kbj9vsq6-3000.brs.devtunnels.ms/api/procedimento/editar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: itemSelecionado.id_procedimento,
          nome,
          duracaoEstimada: parseInt(duracaoEstimada),
          preco: parseFloat(preco),
        }),
      });

      if (response.ok) {
        await buscarProcedimentos();
        setModalEditar(false);
        limparForm();
      } else {
        Alert.alert("Erro", "Erro ao editar procedimento.");
      }
    } catch (error) {
      Alert.alert("Erro", "Erro de conexão.");
    }
  };

  const excluir = () => {
    Alert.alert("Confirmar", "Deseja excluir este procedimento?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch("https://kbj9vsq6-3000.brs.devtunnels.ms/api/procedimento/excluir", {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: itemSelecionado.id_procedimento,
              }),
            });

            if (response.ok) {
              await buscarProcedimentos();
              setModalEditar(false);
              limparForm();
            } else {
              Alert.alert("Erro", "Erro ao excluir procedimento.");
            }
          } catch (error) {
            Alert.alert("Erro", "Erro de conexão.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cadastrar}>
          <Text style={styles.textobotao}>Cadastrar Procedimento</Text>
          <TouchableOpacity onPress={abrirCadastrar}>
            <Plus size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.titulo}>
          <Text style={styles.proctitulo}>Procedimentos Cadastrados:</Text>
        </View>

       {procedimentos.length === 0 ? (
  <Text>Nenhum procedimento cadastrado.</Text>
) : (
  procedimentos.map((item) => (
    <View style={styles.proc} key={item.id_procedimento}>
      <View>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.duracaoEstimada}>{item.duracaoEstimada} min</Text>
        <Text style={styles.preco}>R$ {item.preco}</Text>
      </View>
      <TouchableOpacity onPress={() => abrirEditar(item)}>
        <Lapis size={30} color="black" />
      </TouchableOpacity>
    </View>
  ))
)}
      </View>

      {/* MODAL CADASTRAR */}
      <Modal visible={modalCadastrar} transparent={true} animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Cadastrar Procedimento</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do procedimento"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Duracao Estimada (min)"
              value={duracaoEstimada}
              onChangeText={setDuracaoEstimada}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Preço (R$)"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "gray" }]}
                onPress={() => setModalCadastrar(false)}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={salvarCadastrar}>
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal visible={modalEditar} transparent={true} animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>
              Editar: {itemSelecionado?.nome}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do procedimento"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="Duracao Estimada (min)"
              value={duracaoEstimada}
              onChangeText={setDuracaoEstimada}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Preço (R$)"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
            />

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "red" }]}
                onPress={excluir}
              >
                <Text style={styles.btnText}>Excluir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "gray" }]}
                onPress={() => setModalEditar(false)}
              >
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={salvarEditar}>
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#D9D9D9" },
  content: { alignItems: "center", width: "100%", paddingVertical: 20 },
  cadastrar: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    height: 41,
    marginTop: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    padding: 15,
  },
  textobotao: { fontSize: 16, fontWeight: "bold" },
  proc: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    height: 91,
    borderRadius: 10,
    marginVertical: 9,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nome: { fontSize: 18, fontWeight: "bold" },
  duracaoEstimada: { fontSize: 16, color: "#666" },
  preco: { fontSize: 16, color: "#333" },
  titulo: { marginVertical: 30 },
  proctitulo: { fontSize: 18, fontWeight: "bold" },

  // Modal
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  btn: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
});
