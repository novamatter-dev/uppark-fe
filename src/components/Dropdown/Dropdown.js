import React, { useRef, useState } from "react";
import styles from "./Dropdown.style";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Alert,
} from "react-native";

import { ChevronDownIcon } from "native-base";
import Toast from "react-native-toast-notifications";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";

const Dropdown = (props) => {
  const { data, setDial, dial } = props;
  const [showList, setShowList] = useState(false);

  const toastRef = useRef();

  const handleList = () => {
    setShowList(!showList);
  };

  const handleChange = (code) => {
    setDial(code);
    handleList();
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={handleList}>
          <View style={styles.prefixWrapper}>
            <ChevronDownIcon style={styles.dropdownArrow} />
            <Text style={styles.prefixText}>{dial}</Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showList}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setShowList(!showList);
          }}
        >
          <View style={styles.mappedList}>
            <View style={styles.closeBtnWrapper}>
              <TouchableOpacity onPress={handleList} style={styles.closeBtn}>
                <SvgXml xml={svgs.closeDisabled} width={20} height={20} />
              </TouchableOpacity>
              <Text style={styles.title}>Select Country</Text>
              <View style={{ width: 1, height: 1 }} />
            </View>
            <ScrollView style={styles.elementsWrapper}>
              {data?.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => handleChange(item.dial_code)}
                    style={styles.element}
                  >
                    <Text style={styles.elementLabel}>
                      {item.name} ({item.dial_code})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <Toast
            ref={toastRef}
            style={{
              zIndex: 3,
              elevation: 3,
            }}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default Dropdown;
