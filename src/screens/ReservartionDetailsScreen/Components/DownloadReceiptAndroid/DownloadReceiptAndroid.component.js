import { Text, TouchableOpacity } from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import style from "../../reservationStyle";
import { authURL } from "../../../../config";
import { useSelector } from "react-redux";
import { t } from "i18next";

const DownloadReceiptAndroid = (props) => {
  const { parkingHistory, response } = props;
  const { parkingReservationProductId } = parkingHistory;
  const { jwt } = useSelector((state) => state.auth);

  const docPath = ReactNativeBlobUtil.fs.dirs.DocumentDir;
  const filePath = `${docPath}/uppark_${parkingReservationProductId}.pdf`;

  const createFileFromBase64 = async () => {
    await ReactNativeBlobUtil.fs
      .writeFile(filePath, `data:application/pdf;base64,${response}`, "utf8")
      .then((res) => {
        /*console.log("File created successfully", res)*/
      })
      .catch((error) => console.log("error", e));
  };

  const handleDownloadAndroid = async () => {
    await ReactNativeBlobUtil.config({
      path: filePath,
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: "Download Successful! Click to view",
        description: "A PDF file.",
        mime: "application/pdf",
      },
    })
      .fetch(
        "GET",
        `${authURL}/ParkingReservation/Get/Invoice/Blob/ParkingReservationId/${parkingReservationProductId}`,
        {
          Authorization: `Bearer ${jwt}`,
        }
      )
      .then(async (res) => {
        if (res && res.info().status === 200) {
          // console.log(res);
        } else {
          // console.log(res);
        }
      })
      .catch((error) => console.log("download error: ", error));
  };

  return (
    <TouchableOpacity onPress={handleDownloadAndroid}>
      <Text style={style.savePdf}>{t("save")}</Text>
    </TouchableOpacity>
  );
};

export default DownloadReceiptAndroid;
