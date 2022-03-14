import * as React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Camera from './src/Pages/Camera';
import Listagem from './src/Pages/Listagem';
import Cadastro from './src/Pages/Cadastro';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagem}
        source={require('./src/Imagens/home.png')}
      />
      <Text style={styles.texto}>  MEU NOVO LAR IMÓVEIS </Text>
      <View style={styles.buttons}>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Listagem')}>
        <Icon size={hp('6%')} name="list" color='#00a8ff' />
        <Text style={styles.textButton}>Lista de Imóveis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cadastro')}>
        <Icon size={hp('6%')} name="add-circle-outline" color='#00a8ff' />
        <Text style={styles.textButton}>Cadastrar Novo Imóvel</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Listagem" component={Listagem} options={{
        title: 'Lista de imóveis', headerTintColor: '#00a8ff',
        headerStyle: {

        },
      }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{
        title: 'Cadastrar Imóvel', headerTintColor: '#00a8ff',
        headerStyle: {

        },
      }}initialParams={{ img: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',

  },
  buttons: {
    marginTop:hp('25%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  button: {
    height: hp('15%'),
    width: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagem:{
    marginTop:hp('23%'),
    width: wp('90%'),
    height:hp('20%')
  },
  texto: {
    color:'#00a8ff',
    fontSize:hp('3.5%'),
  },
  textButton: {
    color: '#004',
    fontSize:hp('1.8%'),
  }
})