import { View, Text, StyleSheet, Button, Image, TouchableOpacity, TextInput} from "react-native";
import { Stack, useRouter } from "expo-router";

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
          <Stack.Screen name="user" options={{  headerTitle: () => (<TextInput style={styles.inputPesquisa}  placeholder="Nome ou Codigo do Paciente"/>
    ),
  }}
/>

      
      </Stack>
      

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/")}> 
          <View> <Image source={require('../assets/images/dente.png')} style={styles.imagem} /> </View> </TouchableOpacity>
         <TouchableOpacity  onPress={() => router.push("/user")}> 
          <View> 
            <Image source={require('../assets/images/user.png')} style={styles.imagem} /> </View>
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
    justifyContent:'space-around',
    padding:10,
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
  inputPesquisa:{
    width:'280px',
    height: 30,
    textAlign:'center',
    borderWidth:1,
    padding: 10,
    borderRadius: '20px'
  }
});