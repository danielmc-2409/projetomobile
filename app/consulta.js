import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Upload } from "lucide-react-native";

export default function Consulta() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitulo}>Observações e exames</Text>

        <TouchableOpacity style={styles.uploadBox}>
          <Text style={styles.textUpload}>Anexar exames</Text>
          <Upload size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBox}>
          <Text style={styles.textUpload}>Anexar prescrições</Text>
          <Upload size={40} color="black" />
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
});
