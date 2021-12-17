
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import Config from '@Config/default';

const {Colors} = Config;

const Loader = ({ ...props }) => {

    const { LoadingMsg = '' } = props;
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
            <ActivityIndicator
                color={Colors.accent}
                size="small"
            />
            <Text style={{ marginTop: 5, color: Colors.materialHeaderText, fontSize: moderateScale(12) }}>
                {LoadingMsg}
            </Text>
        </View>
    );
};

Loader.propTypes = {
    LoadingMsg: PropTypes.string.isRequired,
};

export default Loader;
