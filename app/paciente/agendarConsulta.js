import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Consulta() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // id_paciente

  const [procedimentos, setProcedimentos] = useState([]);
  const [loadingProcedimentos, setLoadingProcedimentos] = useState(true);

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  const [showProcedures, setShowProcedures] = useState(false);

  const horarios = [
    "07:00","07:30","08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30",
  ];

  const buscarHorariosOcupados = async (dataSelecionada) => {
    setLoadingHorarios(true);

    try {
      const response = await fetch(
        "https://xv14dwsm-3000.brs.devtunnels.ms/api/consultas/horariosOcupados",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: dataSelecionada }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.log("Erro ao carregar horários ocupados:", result);
        return;
      }

      const ocupados = result.ocupados;

      // 🔥 Filtrar somente os horários livres
      const livres = horarios.filter((h) => !ocupados.includes(h));

      setHorariosDisponiveis(livres);

    } catch (error) {
      console.log("Erro ao buscar horários:", error);
    } finally {
      setLoadingHorarios(false);
    }
  };

  const carregarProcedimentos = async () => {
    try {
      const response = await fetch(
        "https://xv14dwsm-3000.brs.devtunnels.ms/api/procedimento/retornar"
      );
      const data = await response.json();
      setProcedimentos(data);
    } catch (error) {
      console.log("Erro ao carregar procedimentos:", error);
    } finally {
      setLoadingProcedimentos(false);
    }
  };

  useEffect(() => {
    carregarProcedimentos();
  }, []);

  const handleConcluir = async () => {
    if (!selectedProcedure || !selectedDate || !selectedTime) {
      Alert.alert("Aviso", "Selecione um procedimento, data e horário.");
      return;
    }

    try {
      const response = await fetch(
        "https://xv14dwsm-3000.brs.devtunnels.ms/api/consultas/agendar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_paciente: id,
            data: selectedDate,
            hora: selectedTime + ":00",
            procedimento: selectedProcedure.id_procedimento,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", result.error || "Falha ao agendar consulta.");
        return;
      }

      Alert.alert("Sucesso", "Consulta agendada com sucesso!", [
        {
          text: "OK",
          onPress: () =>
            router.push(`/paciente/historicoConsultas?id=${id}`),
        },
      ]);
    } catch (error) {
      console.log("Erro ao agendar:", error);
      Alert.alert("Erro", "Não foi possível agendar.");
    }
  };

  if (loadingProcedimentos) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#c5a234" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.subtitulo}>Agendar Consulta</Text>

        <TouchableOpacity
          style={styles.procedureButton}
          onPress={() => setShowProcedures(!showProcedures)}
        >
          <Text style={styles.procedureText}>
            {selectedProcedure ? selectedProcedure.nome : "Escolher Procedimento"}
          </Text>
        </TouchableOpacity>

        {showProcedures && (
          <View style={styles.procedureList}>
            {procedimentos.map((proc) => (
              <TouchableOpacity
                key={proc.id_procedimento}
                style={styles.procedureItem}
                onPress={() => {
                  setSelectedProcedure(proc);
                  setShowProcedures(false);
                }}
              >
                <Text>{proc.nome}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Calendar
          minDate={new Date().toISOString().split("T")[0]}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
            setSelectedTime(null);
            buscarHorariosOcupados(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "#c5a234",
            },
          }}
          theme={{
            todayTextColor: "#c5a234",
            arrowColor: "#c5a234",
          }}
        />

        {/* HORÁRIOS DISPONÍVEIS */}
        {selectedDate && (
          <>
            {loadingHorarios ? (
              <ActivityIndicator size="large" color="#c5a234" style={{ marginTop: 20 }} />
            ) : (
              <FlatList
                data={horariosDisponiveis}
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
          </>
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

  content: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 20,
    alignItems: "center",
  },

  subtitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },

  procedureButton: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#c5a234",
    borderRadius: 8,
    marginBottom: 10,
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

  timeButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c5a234",
    margin: 5,
  },
  timeButtonSelected: { backgroundColor: "#c5a234" },
  timeText: { fontWeight: "bold", color: "#333" },

  button: {
    marginTop: 30,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#c5a234",
  },
  buttonText: { fontWeight: "bold", color: "#333" },
});
