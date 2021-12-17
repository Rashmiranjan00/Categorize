
import EStyleSheet from 'react-native-extended-stylesheet';
import { moderateScale } from 'react-native-size-matters';

export const GlobalStyles = (dark, materialBackground, borderBottomColor) => EStyleSheet.create({
    generalImageSize: { width: moderateScale(20), height: moderateScale(20) },
    mainContainer: { flex: 1 },
    Header: {
        height: moderateScale(50),
        paddingTop: moderateScale(15),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: materialBackground,
        borderBottomColor: borderBottomColor, borderBottomWidth: 1.8,
    },
    modalHeader: {
        flexDirection: 'row',
        height: moderateScale(50)
    },
    headerBackArrow: { height: '100%', width: moderateScale(40), alignItems: 'center', justifyContent: 'center' },
    headerText: {
        marginLeft: moderateScale(10), fontSize: moderateScale(16),
    },
    inputBox: {
        paddingTop: 0, paddingBottom: 0,
        paddingLeft: moderateScale(5),
        borderRadius: moderateScale(4),
        marginTop: moderateScale(5),
        backgroundColor: '#2d3951',
        height: moderateScale(40),
        color: '#ebebeb',
        alignItems: 'center', fontSize: moderateScale(13)
    },
    materialHeadView: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: moderateScale(10),
    },
    materialCard: {
        height: moderateScale(180), width: moderateScale(150), borderRadius: moderateScale(4), marginRight: moderateScale(11),
        backgroundColor: materialBackground,
        shadowColor: dark ? '#000' : '#bdbdbd', shadowOpacity: .6,
        shadowRadius: moderateScale(2), elevation: moderateScale(2),
        shadowOffset: {
            height: moderateScale(1),
            width: moderateScale(1)
        },
    },
}
);