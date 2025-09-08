import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

export default function Consulta() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [showProcedures, setShowProcedures] = useState(false);

  const procedimentos = ["Limpeza", "Consulta", "Tratamento de Canal", "Extração"];
  const horarios = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00"];

  const handleConcluir = () => {
    if(selectedProcedure && selectedDate && selectedTime){
      alert(`Procedimento: ${selectedProcedure}\nConsulta marcada em ${selectedDate} às ${selectedTime}`);
    } else {
      alert("Selecione um procedimento, data e horário");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitulo}>Agenda</Text>

        {/* Botão para escolher procedimento */}
        <TouchableOpacity
          style={styles.procedureButton}
          onPress={() => setShowProcedures(!showProcedures)}
        >
          <Text style={styles.procedureText}>
            {selectedProcedure ? selectedProcedure : "Escolher Procedimento"}
          </Text>
        </TouchableOpacity>

        {/* Lista de procedimentos */}
        {showProcedures && (
          <View style={styles.procedureList}>
            {procedimentos.map((proc) => (
              <TouchableOpacity
                key={proc}
                style={styles.procedureItem}
                onPress={() => {
                  setSelectedProcedure(proc);
                  setShowProcedures(false);
                }}
              >
                <Text>{proc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Calendário */}
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setSelectedTime(null);
          }}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: "#c5a234" },
          }}
          theme={{
            todayTextColor: "#c5a234",
            arrowColor: "#c5a234",
          }}
        />

        {/* Lista de horários */}
        {selectedDate && (
          <FlatList
            data={horarios}
            keyExtractor={(item) => item}
            numColumns={4}
            style={{ marginTop: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  selectedTime === item && styles.timeButtonSelected,
                ]}
                onPress={() => setSelectedTime(item)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === item && { color: "#fff" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleConcluir}>
          <Text style={styles.buttonText}>Concluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, backgroundColor: "#e0e0e0", padding: 20, alignItems: "center" },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  
  procedureButton: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#c5a234",
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: "#fff",
  },
  procedureText: { fontWeight: "bold", color: "#333" },

  procedureList: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#c5a234",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  procedureItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  button: { marginTop: 20, backgroundColor: "#fff", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" },
  buttonText: { fontWeight: "bold", color: "#333" },
  
  timeButton: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#c5a234", margin: 5 },
  timeButtonSelected: { backgroundColor: "#c5a234" },
  timeText: { fontWeight: "bold", color: "#333" },
});
