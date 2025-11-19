import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Agenda, Grupo, Boneco, Lixo} from '@/assets/components/HeroIcon'; 

export default function RootLayout() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#d4af37',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="nav/agenda" options={{ title: "Agenda" }} />
        <Stack.Screen name="nav/pacientes" options={{ title: "Pacientes" }} />
        <Stack.Screen name="nav/procedimentos" options={{ title: "Procedimentos" }} />
        <Stack.Screen name="paciente/detalhesPaciente" options={{ title: "Perfil do Paciente" }} />
        <Stack.Screen name="paciente/historicoConsultas" options={{ title: "Histórico de Consulta" }} />
        <Stack.Screen name="paciente/agendarConsulta" options={{ title: "Agendar Consulta" }} />
        <Stack.Screen name="consulta/odontograma" options={{ title: "Odontograma" }} />
        <Stack.Screen name="consulta/exames" options={{ title: "Anexar Exames/Prescrição" }} />
                
      </Stack>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/nav/agenda")}>
          <View>
            <Agenda size={30} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/nav/pacientes")}>
          <View>
            <Grupo size={30} color="black" />
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => router.push("/nav/procedimentos")}>
          <View>
            <Boneco size={30} color="black" />
          </View>
        </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4af37',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#d4af37',
  },
  footerText: {
    color: '#000000',
    fontSize: 14
  },
  imagem: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  inputPesquisa: {
    width: '80%',  
    height: 40,    
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff', 
  },
});
