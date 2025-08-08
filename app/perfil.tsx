import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";

const usuario = [
  { id: 1, nome: "Henrique", idade: 17 },
  { id: 2, nome: "Daniel", idade: 17 },
  { id: 3, nome: "Hyoran", idade: 18 },
  { id: 4, nome: "Hugo", idade: 40 },
  { id: 5, nome: "Lucas", idade: 25 },  // Adicionando mais para teste
  { id: 6, nome: "Fernanda", idade: 22 },
  { id: 7, nome: "Julia", idade: 30 },
  { id: 8, nome: "Carlos", idade: 50 },
];

export default function Index() {
  return (
    <ScrollView>
      <View> 
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
});
