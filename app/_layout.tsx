import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Agenda, Grupo, Boneco} from '@/assets/components/HeroIcon'; 

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
        <Stack.Screen name="index" options={{ title: "ORTOS" }} />
        <Stack.Screen
          name="user"
          options={{
            headerTitle: () => (
              <TextInput
                style={styles.inputPesquisa}
                placeholder="Nome ou Codigo do Paciente"
              />
            ),
          }}
        />

        <Stack.Screen name="perfil" options={{ title: "ORTOS" }} />
      </Stack>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <View>
            <Agenda size={30} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/user")}>
          <View>
            <Grupo size={30} color="black" />
          </View>
        </TouchableOpacity>

        
        <TouchableOpacity onPress={() => router.push("/perfil")}>
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
    fontSize: 14,
  },
  imagem: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  inputPesquisa: {
    width: '80%',  // Ajuste para tornar a largura responsiva
    height: 40,    // Ajuste de altura
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff', // Melhor visibilidade para o input
  },
});
