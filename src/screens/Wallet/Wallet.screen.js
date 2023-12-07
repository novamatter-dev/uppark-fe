import {Box, ScrollView} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {BankCard} from './Components/BankCard';
import {
  AddCard,
  ButtonComponent,
  Modal,
  NativeBaseBackButton,
  NativeBaseButton,
  Title,
} from '../../components';
import {Image, Platform, View} from 'react-native';
import WalletStyle from './Wallet.style';
import creditCard from '../../assets/icons/creditCard.png';
import Toast from 'react-native-toast-notifications';
import {t} from 'i18next';
import {PLATINUM, WHITE} from '../../helpers/style/constants';
import EditCard from '../../components/EditCard';
import {useSelector} from 'react-redux';
import {useGetCardsMutation} from '../../services/wallets';

const Wallet = ({navigation}) => {
  const [getCards] = useGetCardsMutation();
  const {cards} = useSelector(state => state.users);
  const toastRef = useRef();

  const [addCardModalVisible, setAddCardModalVisible] = useState(false);
  const [cardInfo, setCardInfo] = useState(null);

  const handleGetAllWallets = async () => {
    await getCards();
  };

  useEffect(() => {
    handleGetAllWallets();
  }, []);

  const handleOnClosePress = () => {
    handleGetAllWallets();
    setAddCardModalVisible(false);
  };

  const handleEditCard = () => {
    setAddCardModalVisible(true);
  };

  return (
    <Box
      style={{
        ...WalletStyle.container,
        // marginTop: Platform.OS === "ios" ? 20 : 0,
        // paddingTop: Platform.OS === 'ios' ? '10%' : '10%',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <NativeBaseBackButton
          style={WalletStyle.backButton}
          handleOnPress={() => navigation.goBack(null)}
        />
        <Title label={t('wallet')} style={WalletStyle.title} />
        <BankCard
          cards={cards}
          handleGetAllWallets={handleGetAllWallets}
          handleEdit={handleEditCard}
          setCardInfo={setCardInfo}
        />

        <NativeBaseButton
          style={WalletStyle.addCardButton}
          label={t('add_card')}
          labelStyle={WalletStyle.addCardText}
          icon={<Image source={creditCard} />}
          iconStyle={WalletStyle.iconSpacing}
          handleOnPress={() => {
            // setAddCardModalVisible(true);
            navigation.navigate('CreateCard');
          }}
        />
        <Modal modalVisible={addCardModalVisible} isFullScreen={true}>
          {/* <AddCard onClosePress={handleOnClosePress} /> */}
          <EditCard
            onClosePress={handleOnClosePress}
            cardInfo={cardInfo}
            handleGetAllWallets={handleGetAllWallets}
          />
          <Toast
            ref={toastRef}
            style={{
              zIndex: 3,
              elevation: 3,
            }}
          />
        </Modal>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          // position: "absolute",
          bottom: '3%',
          width: '100%',
        }}></View>
    </Box>
  );
};

export default Wallet;
