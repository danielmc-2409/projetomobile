import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Pencil } from "lucide-react-native";

export default function ObservacoesAlergias() {
  const [campos, setCampos] = useState({
    tc: "",
    ts: "",
    paMax: "",
    paMin: "",
  });

  const [campoEditando, setCampoEditando] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [valorTemporario, setValorTemporario] = useState("");

  const abrirEdicao = (campo) => {
    setCampoEditando(campo);
    setValorTemporario(campos[campo]);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setCampoEditando(null);
    setValorTemporario("");
  };

  const salvarCampo = () => {
    setCampos((prev) => ({ ...prev, [campoEditando]: valorTemporario }));
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Observações / Alergias</Text>

        {[
          { key: "tc", label: "TC" },
          { key: "ts", label: "TS" },
          { key: "paMax", label: "PA MAX" },
          { key: "paMin", label: "PA MIN" },
        ].map((item) => (
          <View style={styles.campo} key={item.key}>
            <Text style={styles.campoTexto}>
              {item.label} {campos[item.key] ? `: ${campos[item.key]}` : ""}
            </Text>
            <TouchableOpacity onPress={() => abrirEdicao(item.key)}>
              <Pencil size={20} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {modalVisible && (
        <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={fecharModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Editar {campoEditando?.toUpperCase()}
              </Text>
              <TextInput
                style={styles.input}
                value={valorTemporario}
                onChangeText={setValorTemporario}
                keyboardType="numeric"
                placeholder="Digite o valor"
              />
              <TouchableOpacity style={styles.botaoSalvar} onPress={salvarCampo}>
                <Text style={styles.botaoTexto}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={fecharModal} style={styles.botaoCancelar}>
                <Text style={styles.botaoTextoCancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 20,
    alignItems: "center",
    paddingTop: 40,
  },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  campo: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  campoTexto: { fontSize: 16, fontWeight: "500" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 40,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: "#d4af37",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  botaoCancelar: { paddingVertical: 8 },
  botaoTextoCancelar: { color: "#333" },
});
