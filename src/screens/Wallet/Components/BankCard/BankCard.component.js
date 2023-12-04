import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { NativeBaseButton } from "../../../../components";
import BankCardStyle from "./BankCard.style";
import visa from "../../../../assets/icons/visa.png";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import svgs from "../../../../assets/svgs";
import { useToast, Actionsheet } from "native-base";
import { AQUA, RED } from "../../../../helpers/style/constants";
//redux
import { useDeleteCardMutation } from "../../../../services/wallets";
import ActionModal from "../../../../components/ActionModal/ActionModal";
import { t } from "i18next";

const BankCard = (props) => {
  const { cards, handleOnPress, handleGetAllWallets, handleEdit, setCardInfo } =
    props;

  const [deleteCard] = useDeleteCardMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [cardId, setCardId] = useState(null);

  const toast = useToast();

  const handleSelectCard = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  };

  const handleDeleteCard = async (id) => {
    await deleteCard({ cardId: id })
      .then(() => {
        handleGetAllWallets();
        handleSuccessToast();
      })
      .catch((err) => {
        console.log("remove card err", err);
      });
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return (
          <View
            style={{
              backgroundColor: AQUA,
              padding: 16,
              borderRadius: 15,
              shadowColor: AQUA,
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
              shadowColor: AQUA,
            }}
          >
            <Text
              style={{
                color: "#F5F5F5",
                fontSize: 18,
                fontFamily: "AzoSans-Medium",
              }}
            >
              Card was removed from your wallet !
            </Text>
          </View>
        );
      },
    });
  };

  const handleNo = () => {
    setModalVisible(false);
  };
  const handleYes = () => {
    handleDeleteCard(cardId);
    setModalVisible(false);
  };

  const handleEditCard = (card) => {
    handleEdit();
    setCardInfo(card);
  };

  return (
    <View>
      {cards?.map((item) => {
        return (
          <View style={BankCardStyle.container} key={`item--${item?.id}`}>
            <TouchableOpacity
              key={item.cardNumber}
              style={BankCardStyle.card}
              onPress={() => handleEditCard(item)}
            >
              <Image style={BankCardStyle.icon} source={visa} />
              <Text style={BankCardStyle.cardText}>
                {item?.cardNumber && `**** ${item.cardNumber.slice(-4)}`}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <Actionsheet
        isOpen={modalVisible}
        // isOpen={true}
        style={{ height: "45%", position: "absolute", bottom: 0 }}
      >
        <ActionModal
          text={t("delete_card")}
          handleNo={handleNo}
          handleYes={handleYes}
        />
      </Actionsheet>
    </View>
  );
};

export default BankCard;
