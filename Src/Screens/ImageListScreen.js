import React from 'react';
import {
    SafeAreaView,
    View, FlatList, Image
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import { GlobalStyles } from '@Styles/GlobalStyles';
import Config from '@Config/default';
import { useRoute } from '@react-navigation/native';

const { Colors } = Config;

const ImageListScreen = () => {
    const route = useRoute();

    const item = route.params && route.params.item;
    const {images} = item;
    
    return(
        <SafeAreaView style={[GlobalStyles().mainContainer, { backgroundColor: Colors.background, height: '100%', width: '100%' }]}>
            {(images.length > 0) && <FlatList
                contentContainerStyle={{ paddingBottom: moderateScale(80), padding: moderateScale(20) }}
                data={images}
                keyExtractor={item => item.id.toString()}
                maxToRenderPerBatch={4}
                numColumns={2}
                onEndThreshold={0.6}
                renderItem={({ item }) => (
                    <View style={{ width: '50%', padding:moderateScale(10)}}>
                        <Image
                            resizeMode='cover'
                            source={{
                                uri: item.uri,
                            }}
                            style={{width:'100%', height:moderateScale(100)}}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                windowSize={6}
            />}
        </SafeAreaView>
    );


};

export default ImageListScreen;