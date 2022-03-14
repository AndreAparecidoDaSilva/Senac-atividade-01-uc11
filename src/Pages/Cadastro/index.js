import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import Database from '../../Database/Database';
import Imovel from '../../Model/Imovel';
import { Picker } from '@react-native-picker/picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cadastro = ({ route, navigation }) => {

    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [finalidade, setFinalidade] = useState('Venda');

    const cadastrarImovel = (descricao, finalidade, preco, imagem) => {
        const novoImovel = new Imovel(descricao, finalidade, preco, imagem)
        const banco = new Database();
        banco.Inserir(novoImovel);
    }
    return (
        <View style={styles.container}>

            <Text style={styles.label}>Descrição do Imóvel:</Text>
            <TextInput style={styles.input} onChangeText={(valor) => setDescricao(valor)} multiline placeholder="descricao..." />
            <Text style={styles.label}>Preço:</Text>
            <TextInput style={styles.input} onChangeText={(valor) => setPreco(valor)} multiline placeholder="preço..." />
            <Text style={styles.label}>Finalidade:</Text>
            <Picker
                style={styles.input}
                selectedValue={finalidade}
                onValueChange={(valor, itemIndex) =>
                    setFinalidade(valor)
                }>
                <Picker.Item label="Venda" value="Venda" />
                <Picker.Item label="Locação" value="Locação" />
            </Picker>
            <View style={{flexDirection:'row'}}>
            {
                route.params.img == '' ? <Image
                style={styles.imagem}
                source={require('../../Imagens/default.png')}
            /> :<Image
            style={styles.imagem}
            source={{
                uri: route.params.img
            }}
        />
            }
            <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Icon size={hp('6%')} name="photo-camera" color='#00a8ff' />
                <Text style={styles.textoBotaoc}>Tirar Foto</Text>
            </TouchableOpacity>

            </View>
            <TouchableOpacity onPress={() => cadastrarImovel(descricao, finalidade, preco, route.params.img)} style={styles.botaoCad}>
                <Text style={styles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>

        </View>
    );
}



export default Cadastro;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    titulo: {
        fontSize: hp('5%'),
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#00a8ff'
    },
    label: {
        fontSize: hp('2%'),
        textAlign: 'center',
        marginTop: hp('1.5%'),
        color: '#00a8ff',
        fontWeight: 'bold',
    },
    input: {
        fontSize: hp('2.5%'),
        borderWidth: hp('.4%'),
        width: wp('70%'),
        height: hp('7%') ,
        borderColor: '#00a8ff',
        borderRadius: 20,
        margin: hp('0.5%'),
    },
    botaoCad: {
        width: wp('40%'),
        height: hp('6%'),
        backgroundColor: '#00a8ff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: hp('2.9%')
    },

    textoBotao: {
        fontSize: hp('2.5%'),
        color: 'white',
        fontStyle: 'normal',
        textTransform: 'uppercase'
    },
    textoBotaoc: {
        fontSize: hp('2.5%'),
        color: '#00a8ff',
        fontStyle: 'normal',
        textTransform: 'uppercase'
    },
    imagem: {
        height: hp('15%'),
        width: wp('40%'),
        borderColor: '#00a8ff',
        marginHorizontal: hp('2.5%'),
        margin: hp('0.5%'),
    }
})