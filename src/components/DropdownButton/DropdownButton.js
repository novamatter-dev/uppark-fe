import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { WHITE } from "../../helpers/style/constants";
import { t } from "i18next";

const DropdownButton = (props) => {
  const {
    expanded = false,
    setExpanded = () => {},
    setProfileType = () => {},
    profileType = "Personal",
  } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          ...styles.button,
          borderBottomLeftRadius: expanded ? 0 : 24,
          borderBottomRightRadius: expanded ? 0 : 24,
        }}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.buttonText}>{profileType}</Text>
      </TouchableOpacity>
      {expanded && (
        <TouchableOpacity
          style={{
            ...styles.button,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            position: "absolute",
            top: 50,
          }}
          onPress={() => {
            setExpanded(!expanded);
            setProfileType(
              profileType === "Personal" ? t("business") : t("personal")
            );
          }}
        >
          <Text style={styles.buttonText}>
            {profileType === "Personal" ? t("business") : t("personal")}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    zIndex: 100,
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 20,
    width: "100%",
    height: 60,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    padding: 20,
    fontFamily: "AzoSans-Bold",
    zIndex: 10,
  },
  item: {
    padding: 20,
  },
  itemText: {
    color: "black",
    fontSize: 16,
    zIndex: 100,
  },
  listContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 125,
    zIndex: 100,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
});

DropdownButton.prototype = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  setProfileType: PropTypes.func,
  profileType: PropTypes.string,
};

export default DropdownButton;
