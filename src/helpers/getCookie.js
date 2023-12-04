import AsyncStorage from "@react-native-async-storage/async-storage";

const getCookie = async ({ key }) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export default getCookie;
