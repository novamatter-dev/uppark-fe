import React from "react";
import { View } from "react-native";
//components
import NativeBaseBackButton from "../NativeBaseBackButton";
//libraries
import PropTypes from "prop-types";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native";

const LiveChat = (props) => {
  const { handleClose = () => {} } = props;

  return (
    <SafeAreaView style={{ backgroundColor: "#1b1b20" }}>
      <View style={{ display: "flex", width: "100%", height: "100%" }}>
        <View
          style={{ position: "absolute", top: "1%", right: "5%", zIndex: 100 }}
        >
          <NativeBaseBackButton
            handleOnPress={handleClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 15,
            }}
          />
        </View>
        <WebView
          startInLoadingState={true}
          androidLayerType={"software"}
          style={{
            // marginTop: "8%",
            flex: 1,
          }}
          source={{
            uri: "https://secure.livechatinc.com/licence/12026889/v2/open_chat.cgi",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

LiveChat.propTypes = {
  handleClose: PropTypes.func,
  text: PropTypes.string,
};

export default LiveChat;
