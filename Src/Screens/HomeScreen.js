import React, {useState} from 'react';
import {
    SafeAreaView, Dimensions, View,
    TouchableOpacity, Text, FlatList
} from 'react-native';
import { FAB, Portal, Provider, TextInput} from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { moderateScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';

import * as imageDetailsActions from '@Actions/imageDetailsActions';
import * as categoryActions from '@Actions/categoryActions';

import { GlobalStyles } from '@Styles/GlobalStyles';
import Config from '@Config/default';
import { useNavigation } from '@react-navigation/native';

const { Colors } = Config;

const HomeScreen = ({...props}) => {

    const navigation = useNavigation();

    const { setImageDetails, imageDetails, setCategoryDetails, categories } = props;

    const [fabOpen, setFabOpen] = useState({open:false});
    const [modal, setModal] = useState(false);
    const [imgResponse, setImgResponse] = useState({});
    const [name, setName] = useState('');

    const [ddOpen, setDdOpen] = useState(false);
    const [ddValue, setDdValue] = useState(null);
    const [ddItems, setDdItems] = useState([...categories]);

    const [showTextView, setShowTextView] = useState(false);

    const onFabChange = ({open}) => {
        setFabOpen({open});
    };

    const {open} = fabOpen;

    const resetModal = () => {
        setShowTextView(false);
        setName('');
        setDdValue(null);
    };

    const takePicture = () => {
        const options = {
            quality: 1,
            maxWidth: 100,
            maxHeight: 100,
            includeBase64: true,
            mediaType: 'photo',
            saveToPhotos: true,
        };

        launchCamera(options, (response) => {
            setImgResponse(response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                setModal(true);
            }
        });

    };

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response) => {
            setImgResponse(response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {

                setModal(true);
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

    const setDetailsForImages = () => {
        console.log('res : ', imgResponse);

        const { assets = [] } = imgResponse;
        const { uri } = assets[0];

        const imgObj = {};
        imgObj.id = new Date().getTime();
        imgObj.uri = uri;

        setImageDetails([{ ...imgObj }, ...imageDetails]);

    };

    const createCategory = () => {

        const { assets = [] } = imgResponse;
        const { uri } = assets[0];

        const imgObj = {};
        imgObj.id = new Date().getTime();
        imgObj.uri = uri;

        const catObj = {};
        catObj.id = new Date().getTime();
        catObj.name = name;
        catObj.images = [imgObj];
        setCategoryDetails([{...catObj}, ...categories]);
        setModal(false);
        resetModal();

    };

    const addImageToCategory = () => {
        const { assets = [] } = imgResponse;
        const { uri } = assets[0];

        const imgObj = {};
        imgObj.id = new Date().getTime();
        imgObj.uri = uri;
        categories.map((x) => x.id === ddValue ? x.images = [{ ...imgObj }, ...x.images] : x);
        // setCategoryDetails(ddItems);
        setModal(false);
        resetModal();
        
    };

    const renderCategoryModal = () => {
        return (
            <View 
                style={{
                    backgroundColor: Colors.background,
                    borderRadius: moderateScale(6),
                    padding: moderateScale(20),
                    paddingHorizontal: moderateScale(15),
                    width: '90%',}}>
                <View>
                    <DropDownPicker
                        items={ddItems}
                        open={ddOpen}
                        placeholder='Select your Category'
                        schema={{
                            label: 'name',
                            value: 'id'
                        }}
                        setItems={setDdItems}
                        setOpen={setDdOpen}
                        setValue={setDdValue}
                        value={ddValue}
                    />
                    <View style={{flexDirection:'row', alignItems:'center', marginTop:moderateScale(10)}}>
                        <Icon
                            color={'#f00'}
                            name={'pluscircleo'}
                            onPress={() => setShowTextView(!showTextView)}
                            size={moderateScale(25)}
                        />
                        <Text style={{color:'#000', marginLeft:moderateScale(5)}}>Create Category</Text>
                    </View>
                    {(showTextView) && <TextInput
                        label="Category"
                        mode='outlined'
                        onChangeText={text => setName(text)}
                        placeholder='Enter Category Name'
                        style={{marginTop:moderateScale(10)}}
                        value={name}
                    />}
                    <TouchableOpacity
                        onPress={() => showTextView ? createCategory() : addImageToCategory()} 
                        style={{
                            paddingHorizontal: moderateScale(25),
                            paddingVertical: moderateScale(8),
                            backgroundColor: Colors.accent,
                            borderRadius: moderateScale(6),
                            justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'row',
                            marginVertical:moderateScale(10)
                        }}>
                        <Text>Add Image to Category</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    };

    return (
        <SafeAreaView style={[GlobalStyles().mainContainer, { backgroundColor: Colors.background, height:'100%', width:'100%' }]}>
            {(categories.length > 0) && <FlatList
                contentContainerStyle={{ paddingBottom: moderateScale(80), padding: moderateScale(20) }}
                data={categories}
                keyExtractor={item => item.id.toString()}
                maxToRenderPerBatch={4}
                onEndThreshold={0.6}
                renderItem={({ item }) => (
                    <View style={{width:'100%', height:moderateScale(60), 
                        margin:moderateScale(5), padding:moderateScale(10), 
                        backgroundColor:Colors.accent, justifyContent:'center', borderRadius:moderateScale(20), elevation:4}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Images',{item:item})}>
                            <Text style={{fontSize:moderateScale(20)}}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                windowSize={6}
            />}
            {renderAddOptions()}
            <Modal
                backdropColor={'#000'}
                deviceHeight={Math.max(Dimensions.get('window').height, Dimensions.get('screen').height)}
                deviceWidth={Math.max(Dimensions.get('window').width, Dimensions.get('screen').width)}
                dismissable={true}
                hasBackdrop={true}
                isVisible={modal}
                onBackButtonPress={() => setModal(false)}
                onBackdropPress={() => setModal(false)}
                style={{ justifyContent: 'center', alignItems: 'center', margin: 0, padding: 0 }}
                useNativeDriver={true}
            >
                {renderCategoryModal()}
            </Modal>
        </SafeAreaView>

    );
};

HomeScreen.propTypes = {
    categories: PropTypes.array.isRequired,
    imageDetails: PropTypes.array.isRequired,
    setCategoryDetails: PropTypes.func.isRequired,
    setImageDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        imageDetails: state.imageData.imageDetails,
        categories: state.categoryData.categoryDetails,
    };
};

const mapDispatchToProps = (dispatch) => ({
    setImageDetails:(imgDetails) => 
        dispatch(imageDetailsActions.setImageDetails(imgDetails)),
    setCategoryDetails:(catDetails) => 
        dispatch(categoryActions.setCategoryDetails(catDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen);
