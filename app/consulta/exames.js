import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Upload } from "lucide-react-native";

export default function Consulta() {
  const [exameFile, setExameFile] = useState(null);
  const [prescricaoFile, setPrescricaoFile] = useState(null);

  // 📄 Função genérica para selecionar documento
  const handleFilePick = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      if (type === "exame") {
        setExameFile(file);
      } else {
        setPrescricaoFile(file);
      }

      console.log("Arquivo selecionado:", file);
    } catch (error) {
      console.error("Erro ao selecionar arquivo:", error);
      Alert.alert("Erro", "Não foi possível anexar o arquivo.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitulo}>Observações e exames</Text>

        {/* Upload de Exames */}
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => handleFilePick("exame")}
        >
          <Text style={styles.textUpload}>Anexar exames</Text>
          <Upload size={40} color="black" />
          {exameFile && (
            <Text style={styles.fileName}>📎 {exameFile.name}</Text>
          )}
        </TouchableOpacity>

        {/* Upload de Prescrições */}
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => handleFilePick("prescricao")}
        >
          <Text style={styles.textUpload}>Anexar prescrições</Text>
          <Upload size={40} color="black" />
          {prescricaoFile && (
            <Text style={styles.fileName}>📎 {prescricaoFile.name}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 20,
    alignItems: "center",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  uploadBox: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textUpload: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  fileName: {
    marginTop: 10,
    color: "#555",
    fontSize: 14,
  },
});
