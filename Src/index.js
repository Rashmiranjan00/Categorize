import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const Src = () => {

  const takePicture  = () => {
    const options = {
        quality: 1,
        maxWidth: 100,
        maxHeight: 100,
        includeBase64: true,
        mediaType: 'photo'
    };

    const APP_FOLDER_NAME = 'Categorize';
    const pictureFolder = `${RNFS.PicturesDirectoryPath}/${APP_FOLDER_NAME}`;

    console.log('pictureFolder: ', pictureFolder);
    
    launchCamera(options, (response) => {
        console.log('res : ',response);
        const {assets = []} = response;
        const { uri } = assets[0];
        const fileName = new Date().getTime();
        
        RNFS.copyFile(uri, `${pictureFolder}/${fileName}`)
            .then((res) => {
                console.log('RES COPY: ', res);
                RNFS.scanFile(`${albumPath}/${fileName}`)
            }
            )
            .catch((err) => {console.log('err',err)});
    });
    
  };

  return (
    <SafeAreaView style={{flex:1}}>
          <View
              style={{}}>
              <TouchableOpacity onPress={() => { takePicture(); }}>
                  <Text>Open Camera</Text>
              </TouchableOpacity>
          </View>
    </SafeAreaView>
  );
};
