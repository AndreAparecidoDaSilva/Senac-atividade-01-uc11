import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, FlatList } from 'react-native';
import Database from '../../Database/Database';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
class Listagem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listaImoveis: []
        }
        this.listarImoveis()
    }
    listarImoveis = () => {
        const banco = new Database();
        banco.Listar().then(data => { this.setState({ listaImoveis: data }) })
    }
    render() {
        return (
            <View>
                <FlatList
                    data={this.state.listaImoveis}
                    renderItem={({ item }) => (
                        <View style={styles.imovel}>
                            <Text style={styles.finalidade}>Id: {item.id}</Text>
                            <Text style={styles.titulo}>{item.descricao}</Text>
                            <Text style={styles.finalidade}>{item.finalidade}</Text>
                            {
                                item.imagem == '' ? <Image
                                    style={styles.imagem}
                                    source={require('../../Imagens/default.png')}
                                /> : <Image
                                    style={styles.imagem}
                                    source={{
                                        uri: item.imagem
                                    }}
                                />
                            }
                            <Text style={styles.preco}>R$ {item.preco}</Text>


                        </View>
                    )}
                    key={({ item }) => item.id}
                />
            </View>

        );
    }

}

export default Listagem;

const styles = StyleSheet.create({
    imagem: {
        alignSelf:'center',
        height: hp('20%'),
        width: wp('60%'),
        marginBottom:hp('1%')
    },
    imovel: {
        marginVertical: hp('1%'),
        marginHorizontal:wp('10%'),
        backgroundColor:'#DCDCFF',
        padding:hp('2%'),
        borderRadius:5
    },
    titulo:{
        fontSize:hp('3.5%'),
        alignSelf:'center',
        fontWeight:'bold',
        color:'#000055'
    },
    preco:{
        fontSize:hp('3.5%'),
        color:'#000055',
        fontWeight:'bold'
    },
    finalidade:{
        fontSize:hp('2.5%'),
        marginBottom:hp('1%'),
        color:'#000055'

    }
})