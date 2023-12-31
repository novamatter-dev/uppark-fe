import React, {useState, useEffect} from 'react';
import {Box, ScrollView} from 'native-base';
import {Image, View, Linking} from 'react-native';
//style & assets
import PaymentOptionsStyle from './PaymentOptions.style';
import forward from '../../../../assets/icons/forward.png';
import svgs from '../../../../assets/svgs';
import {SvgXml} from 'react-native-svg';
//components
import {
  NativeBaseBackButton,
  NativeBaseButton,
  Title,
  AddCard,
  Modal,
} from '../../../../components';
import PropTypes from 'prop-types';

//redux
import {useSelector} from 'react-redux';
import {
  useSetBusinessDefaultPaymentMutation,
  useSetPersonalDefaultPaymentMutation,
  useGetCardsMutation,
} from '../../../../services/wallets';
import {t} from 'i18next';
import {useNavigation} from '@react-navigation/native';
import {useGetPersonalProfileMutation} from '../../../../services/users';

const PaymentOptions = props => {
  const {
    data,
    onCardPress,
    onExitPress,
    onSmsPress,
    isFromPaymentDetails,
    profileType,
    getProfileDefaultCard,
    handleAddNewCard,
  } = props;
  const navigation = useNavigation();

  const {cards} = useSelector(state => state.users);

  const [addCardModalVisible, setAddCardModalVisible] = useState(false);

  const [setBusinessDefaultPayment] = useSetBusinessDefaultPaymentMutation();
  const [setPersonalDefaultPayment] = useSetPersonalDefaultPaymentMutation();
  const [getPersonalProfile] = useGetPersonalProfileMutation();
  const [getCards] = useGetCardsMutation();

  const handleGetCards = async () => {
    await getCards();
  };

  const handleOnClosePress = () => {
    setAddCardModalVisible(false);
  };

  const createBusinessCard = async (cardId, cardNumber) => {
    await setBusinessDefaultPayment({cardId: cardId})
      .then(answer => {
        handleOnCardPress(cardNumber);
        // handleGetPersonalDetails();
        getProfileDefaultCard();
        onExitPress();
      })
      .catch(err => {
        console.log('err >>> ', err);
      });
  };

  const handleGetPersonalDetails = async () => {
    await getPersonalProfile()
      .then(answer => {
        console.log('getPersonalProfile >>> ', answer.data);
        onExitPress();
      })
      .catch(err => {
        console.log('ERR getPersonalProfile >>> ', err);
      });
  };

  const createPersonalCard = async (cardId, cardNumber) => {
    await setPersonalDefaultPayment({cardId: cardId})
      .then(answer => {
        // setModalVisible(false);
        // console.log('answer.data set personal >>>', answer.data);
        getProfileDefaultCard();
        // handleGetPersonalDetails();
        onExitPress();
        // handleOnCardPress(cardNumber);
      })
      .catch(err => {
        console.log('err >>> ', err);
      });
  };

  const handlePress = (cardId, cardNumber) => {
    if (profileType === 'Business') {
      console.log('intru pe Business');
      createBusinessCard(cardId, cardNumber);
    } else {
      createPersonalCard(cardId, cardNumber);
    }
  };

  const handleOnCardPress = cardNumber => {
    if (isFromPaymentDetails) {
      onCardPress(cardNumber);
    } else {
      onCardPress(cardId);
    }
  };

  useEffect(() => {
    handleGetCards();
  }, []);

  return (
    <>
      <Box style={PaymentOptionsStyle.container}>
        <NativeBaseBackButton
          handleOnPress={onExitPress}
          style={PaymentOptionsStyle.exitButton}
          iconType={'exit'}
        />
        <Title label={t('payment_options')} style={PaymentOptionsStyle.title} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {cards?.map(item => {
            return (
              <NativeBaseButton
                key={item.id}
                handleOnPress={() => {
                  handlePress(item.id, item.cardNumber);
                }}
                labelStyle={PaymentOptionsStyle.nativeBaseLabelStyle}
                style={PaymentOptionsStyle.nativeButtonStyle}
                label={`**** ${item.cardNumber.slice(-4)}`}
                icon={
                  // <Image style={PaymentOptionsStyle.icon} source={item.icon} />
                  <SvgXml xml={svgs.copy} width={22} height={24} />
                }
              />
            );
          })}

          {profileType && (
            <View>
              <NativeBaseButton
                handleOnPress={handleAddNewCard}
                style={PaymentOptionsStyle.nativeButtonStyle}
                label={t('new_card')}
                labelStyle={PaymentOptionsStyle.nativeBaseLabelStyle}
                icon={<Image source={forward} />}
              />
            </View>
          )}
        </ScrollView>

        <Modal modalVisible={addCardModalVisible} isFullScreen={true}>
          <AddCard
            onClosePress={handleOnClosePress}
            profileType={profileType}
          />
        </Modal>
      </Box>
    </>
  );
};

PaymentOptions.propTypes = {
  data: PropTypes.array,
  onCardPress: PropTypes.func,
  onExitPress: PropTypes.func,
  onSmsPress: PropTypes.func,
};

export default PaymentOptions;
