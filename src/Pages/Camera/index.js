import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { RNCamera } from 'react-native-camera';
import CameraRoll from "@react-native-community/cameraroll";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imagem: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>


        {
          this.state.imagem == '' ? <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}

            // Irá pedir permissão para acessar a câmera, caso não haja
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera',
              message: 'Nós precisamos da sua permissão para usar a câmera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
            // Irá pedir permissão para acessar o áudio, caso não haja
            androidRecordAudioPermissionOptions={{
              title: 'Permissão para usar gravação de áudio',
              message: 'Precisamos da sua permissão para usar seu áudio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancelar',
            }}
          /> : <View><Image
            style={styles.imagem}
            source={{
              uri: this.state.imagem
            }}
          /></View>
        }

        {
          this.state.imagem == '' ?
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }} >
              <Icon style={styles.capture} onPress={this.takePicture.bind(this)} size={hp('6%')} name="camera" color='#00a8ff' />
            </View>
            :
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }} >
              <Icon style={styles.capture} onPress={()=>{this.anulaImg()}} size={hp('6%')} name="close" color='#00a8ff' />
              <Icon style={styles.capture} onPress={() => this.props.navigation.navigate('Cadastro', {img: this.state.imagem})} size={hp('6%')} name="check" color='#00a8ff' />
              </View>
              
        }
      </View>
    );
  }
  anulaImg = () => {
    this.setState({imagem:''})
  }
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.setState({ imagem: data.uri })
    };
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    margin: 15
  },
  imagem: {
    alignSelf: 'center',
    height: hp('75%'),
    width: wp('100%'),
    marginBottom: hp('1%')
  },
});

export default Camera;