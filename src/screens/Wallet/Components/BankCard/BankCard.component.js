import {Actionsheet, useToast} from 'native-base';
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import visa from '../../../../assets/icons/visa.png';
import {AQUA} from '../../../../helpers/style/constants';
import BankCardStyle from './BankCard.style';
//redux
import {t} from 'i18next';
import ActionModal from '../../../../components/ActionModal/ActionModal';
import {useDeleteCardMutation} from '../../../../services/wallets';
import {useTranslation} from 'react-i18next';

const BankCard = props => {
  const {cards, handleOnPress, handleGetAllWallets, handleEdit, setCardInfo} =
    props;

  const {t} = useTranslation();

  const [deleteCard] = useDeleteCardMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [cardId, setCardId] = useState(null);

  const toast = useToast();

  const handleSelectCard = () => {
    if (handleOnPress) {
      handleOnPress();
    }
  };

  const handleDeleteCard = async id => {
    await deleteCard({cardId: id})
      .then(() => {
        handleGetAllWallets();
        handleSuccessToast();
      })
      .catch(err => {
        console.log('remove card err', err);
      });
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 1500,
      render: () => {
        return (
          <View
            style={{
              backgroundColor: AQUA,
              padding: 16,
              borderRadius: 15,
              shadowColor: AQUA,
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
              shadowColor: AQUA,
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 18,
                fontFamily: 'AzoSans-Medium',
              }}>
              {t('card_was_removed')}
            </Text>
          </View>
        );
      },
    });
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleNo = () => {
    setModalVisible(false);
  };
  const handleYes = () => {
    handleDeleteCard(cardId);
    setModalVisible(false);
  };

  const handleEditCard = card => {
    handleEdit();
    setCardInfo(card);
  };

  return (
    // <Box>
    <View>
      {cards?.map(item => {
        return (
          <View style={BankCardStyle.container} key={`item--${item?.id}`}>
            {/* <NativeBaseButton
              handleOnPress={handleSelectCard}
              key={item.cardNumber}
              style={BankCardStyle.card}
              label={item.cardNumber.replace(/^.{12}/g, "**** **** **** ")}
              labelStyle={BankCardStyle.cardText}
              icon={<Image style={BankCardStyle.icon} source={visa} />}
              iconStyle={BankCardStyle.iconSpacing}
            /> */}
            <TouchableOpacity
              key={item.cardNumber}
              style={BankCardStyle.card}
              onPress={() => handleEditCard(item)}>
              <Image style={BankCardStyle.icon} source={visa} />
              <Text style={BankCardStyle.cardText}>
                {`**** ${item.cardNumber.slice(-4)}`}
              </Text>
              {/* <TouchableOpacity
                onPress={() => {
                  setCardId(item.id);
                  handleModal();
                }}
                style={BankCardStyle.deleteBtn}
              >
                <SvgXml
                  xml={svgs.deleteIcon}
                  width={22}
                  height={22}
                  fill={RED}
                />
              </TouchableOpacity> */}
            </TouchableOpacity>
          </View>
        );
      })}
      <Actionsheet
        isOpen={modalVisible}
        // isOpen={true}
        style={{height: '45%', position: 'absolute', bottom: 0}}>
        <ActionModal
          text={t('delete_card')}
          handleNo={handleNo}
          handleYes={handleYes}
        />
      </Actionsheet>
    </View>
    // </Box>
  );
};

export default BankCard;
