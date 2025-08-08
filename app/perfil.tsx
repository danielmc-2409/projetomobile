import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Agenda, Grupo, Boneco, Lapis, Plus} from '@/assets/components/HeroIcon'; 

const procedimentos = [
  { id: 1, nome: "Extração Simples", tempo: 20 },
  { id: 2, nome: "Extração de Siso", tempo: 45 },
  { id: 3, nome: "Limpeza Dentária", tempo: 30 },
  { id: 4, nome: "Canal (Pré-molar)", tempo: 90 },
  { id: 5, nome: "Restauração de Cárie", tempo: 40 },
  { id: 6, nome: "Aplicação de Flúor", tempo: 15 },
  { id: 7, nome: "Clareamento Dentário", tempo: 60 },
  { id: 8, nome: "Consulta Inicial", tempo: 25 },
  { id: 9, nome: "Avaliação Ortodôntica", tempo: 35 },
  { id: 10, nome: "Instalação de Aparelho", tempo: 50 },
  { id: 11, nome: "Troca de Borrachinha", tempo: 10 },
  { id: 12, nome: "Raio-X Panorâmico", tempo: 15 },
  { id: 13, nome: "Periodontia (raspagem)", tempo: 60 },
  { id: 14, nome: "Prótese Dentária", tempo: 75 },
  { id: 15, nome: "Implante Dentário", tempo: 120 }
];

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cadastrar}>
          <Text style={styles.textobotao}>Cadastrar Procedimento</Text>
           <TouchableOpacity >
           <Plus size={30} color="black" />
        </TouchableOpacity>
        </View>
<View  style={styles.titulo}>
  <Text style={styles.proctitulo}>Procedimentos Cadastrados:</Text>
</View>
        {procedimentos.map((item) => (
          <View style={styles.proc} key={item.id}>
            <View style={styles.tituloAt}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.tempo}>{item.tempo} min</Text>
            </View>
            <View>
              <TouchableOpacity>
           <Lapis size={30} color="black" />
        </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },

  content: {
    alignItems: 'center',
    width: "100%",
    paddingVertical: 20,
  },

  cadastrar: {
    backgroundColor: '#FFFFFF',
    width: "85%",
    height: 41,
    marginTop: 40,
    borderRadius: 10,
    flexDirection: 'row',
  justifyContent: "space-between",
    alignItems: 'center',
    marginBottom: 20,
    padding:15
  },

  textobotao: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  proc: {
    width: "85%",
    backgroundColor: '#FFFFFF',
    height: 91,
    borderRadius: 10,
    marginVertical: 9,
    paddingHorizontal: 15,
   flexDirection: 'row',
  justifyContent: "space-between",
  alignItems: 'center'
  },

  tituloAt: {
   
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  tempo: {
    fontSize: 16,
    color: '#666',
  },






  titulo:{
    
    marginBlock: 30
  },

  proctitulo:{
    fontSize: 18,
    fontWeight: 'bold'
  }
});
