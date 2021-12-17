import React, {useState} from 'react';
import {
    SafeAreaView,
    ScrollView
} from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';
import RNFS from 'react-native-fs';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';

import { GlobalStyles } from '@Styles/GlobalStyles';
import Config from '@Config/default';

const { Colors } = Config;

const HomeScreen = () => {

    const [fabOpen, setFabOpen] = useState({open:false});

    const onFabChange = ({open}) => {
        setFabOpen({open});
    };

    const {open} = fabOpen;


    const takePicture = () => {
        const options = {
            quality: 1,
            maxWidth: 100,
            maxHeight: 100,
            includeBase64: true,
            mediaType: 'photo',
            saveToPhotos: true,
        };

        const APP_FOLDER_NAME = 'Categorize';
        const pictureFolder = `${RNFS.PicturesDirectoryPath}/${APP_FOLDER_NAME}`;

        console.log('pictureFolder: ', pictureFolder);

        launchCamera(options, (response) => {
            console.log('res : ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const { assets = [] } = response;
                const { uri } = assets[0];
                const fileName = new Date().getTime();
                // RNFS.copyFile(uri, `${pictureFolder}/${fileName}`)
                //     .then((res) => {
                //         console.log('RES COPY: ', res);
                //         RNFS.scanFile(`${pictureFolder}/${fileName}`);
                //     }
                //     )
                //     .catch((err) => { console.log('err', err); });
            }
        });

    };

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // console.log('response', JSON.stringify(response));
            }
        });
    };

    const renderAddOptions = () => {
        return(
            <Provider>
                <Portal>
                    <FAB.Group
                        actions={[
                            {
                                icon: 'image',
                                label: 'Gallery',
                                onPress: () => openGallery(),
                            },
                            {
                                icon: 'camera',
                                label: 'Camera',
                                onPress: () => takePicture(),
                            },
                        ]}
                        icon={open ? 'close' : 'plus'}
                        onPress={() => {
                            if (open) {
                                // do something if the speed dial is open
                            }
                        }}
                        onStateChange={onFabChange}
                        open={open}
                    />
                </Portal>
            </Provider>
        );
    };

    return (
        <SafeAreaView style={[GlobalStyles().mainContainer, { backgroundColor: Colors.background, height:'100%', width:'100%' }]}>
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: moderateScale(10), paddingBottom: moderateScale(100), backgroundColor: Colors.background }}
                showsVerticalScrollIndicator={false}
            >

            </ScrollView>
            {renderAddOptions()}
        </SafeAreaView>

    );
};

export default HomeScreen;
