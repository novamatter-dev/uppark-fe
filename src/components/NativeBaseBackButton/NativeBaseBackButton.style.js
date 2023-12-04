import { StyleSheet } from "react-native";
import { PLATINUM } from "../../helpers/style/constants";

const nativeBaseBackButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: PLATINUM,
        borderRadius: 24,
        justifyContent:'center',
        width:60,
        height:60,
    },

    icon: {
        margin:4,
        color:'#3356FF',
    }
})

export default nativeBaseBackButtonStyle;