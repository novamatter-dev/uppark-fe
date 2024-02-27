import React, {useRef, useState} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import {Box, ScrollView, useToast} from 'native-base';
import BaseInput from '../../components/BaseInput';
//style & assets
import AddCarStyle from './AddCar.style';
import blueCar from '../../assets/icons/blueCar.png';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
import {AQUA, RED} from '../../helpers/style/constants';
//components
import {
  DatePicker,
  Modal,
  NativeBaseBackButton,
  NativeBaseButton,
  Title,
} from '../../components';
//libraries
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-notifications';
//redux
import {useAddCarMutation, useGetCarsMutation} from '../../services/cars';
import {addCarInitialState} from './AddCar.initialState';
import {useSelector, useDispatch} from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import {t} from 'i18next';

const AddCar = props => {
  const {
    inModal = false,
    inHomeModal = false,
    handleAddCar = () => {},
    setShowCarModal = () => {},
    handleSetActiveCar = () => {},
    step = 1,
    setStep = () => {},
  } = props;

  const dispatch = useDispatch();
  const {activeCar} = useSelector(state => state.cars);

  const navigation = useNavigation();
  const [addCar, {isLoading}] = useAddCarMutation();
  const [getCars, {isLoading: isLoadingGetCars}] = useGetCarsMutation();
  const [addCarFormState, setAddCarFormState] = useState(addCarInitialState);
  const [calendarModalIsVisible, setCalendarModalIsVisible] = useState(false);
  const [dateFieldNameForCalendar, setDateFieldForCalendar] = useState('');

  const toastRef = useRef();
  const toast = useToast();

  const [carToAdd, setCarToAdd] = useState({
    licensePlateNumber: '',
  });

  const onChangeText = carPlate => {
    const regex = /^[a-zA-Z0-9]+$/;

    if (regex.test(carPlate)) {
      setCarToAdd({licensePlateNumber: carPlate});
    } else if (carPlate === '') {
      setCarToAdd({licensePlateNumber: ''});
    }
  };

  const handleNavigateBackToCars = () => {
    if (inModal) {
      handleAddCar();
      setStep(1);
    } else if (inHomeModal) {
      // handleSetActiveCar();
      setShowCarModal(false);
    } else {
      navigation.goBack();
    }
  };

  const handleChangeDate = ({dateFieldName, dateFieldValue}) => {
    setAddCarFormState(prevState => {
      const label = addCarFormState[dateFieldName].label;
      const value = moment(dateFieldValue, 'DD.MM.YYYY').utc().format();
      const svg = addCarFormState[dateFieldName].svg;

      return {
        ...prevState,
        [dateFieldName]: {
          label,
          value,
          svg,
        },
      };
    });

    setCalendarModalIsVisible(false);
  };

  const handleCalendarModalOpen = ({dateFieldName}) => {
    setCalendarModalIsVisible(true);
    setDateFieldForCalendar(dateFieldName);
  };

  const handleCloseCalendarModal = () => {
    setCalendarModalIsVisible(false);
  };

  const handleGetCars = async () => {
    try {
      await getCars()
        .unwrap()
        .then(answer => {
          handleNavigateBackToCars();
          handleSetActiveCar();
        })
        .catch(err => {
          console.log('Get cars error: ', err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnAddCarSubmit = async () => {
    if (carToAdd.licensePlateNumber) {
      const timestamps = {
        rcaExpirationDate: addCarFormState.rcaExpirationDate.value,
        itpExpirationDate: addCarFormState.itpExpirationDate.value,
        rovinietaExpirationDate: addCarFormState.rovinietaExpirationDate.value,
        cascoExpirationDate: addCarFormState.cascoExpirationDate.value,
        medicalKitExpirationDate:
          addCarFormState.medicalKitExpirationDate.value,
        fireExtinguisherExpirationDate:
          addCarFormState.fireExtinguisherExpirationDate.value,
      };

      try {
        await addCar({
          licensePlateNumber: carToAdd.licensePlateNumber,
          ...timestamps,
        })
          .unwrap()
          .then(answer => {
            handleGetCars();
            if (inHomeModal) {
              setShowCarModal(false);
            }
            handleSuccessToast();
          });
      } catch (err) {
        if (
          err.data.details.includes('has already car with license plate number')
        ) {
          handleErrorToast();
        }
        console.log('AddCarr error', err);
      }
    }
  };

  const handleErrorToast = () => {
    toast.show({
      placement: 'top',
      duration: 1500,
      render: () => {
        return (
          <View
            style={{
              backgroundColor: RED,
              padding: 16,
              borderRadius: 15,
              shadowColor: RED,
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 18,
                fontFamily: 'AzoSans-Medium',
              }}>
              {t('car_plate_already_exists')}!
            </Text>
          </View>
        );
      },
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
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 18,
                fontFamily: 'AzoSans-Medium',
              }}>
              {t('new_car_added')}!
            </Text>
          </View>
        );
      },
    });
  };

  return (
    <Box style={AddCarStyle.container}>
      <NativeBaseBackButton
        style={AddCarStyle.closeButton}
        handleOnPress={handleNavigateBackToCars}
        iconType={'exit'}
      />

      <Title
        label={t('please_enter_your_car_details')}
        style={AddCarStyle.title}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AddCarStyle.scrollViewContainer}>
        {/* <KeyboardAwareScrollView> */}
        <BaseInput
          style={AddCarStyle.baseInput}
          icon={<SvgXml xml={svgs.car} width={22} height={22} />}
          name={'licensePlateNumber'}
          placeHolder={t('license_place')}
          onChangeText={onChangeText}
          value={carToAdd.licensePlateNumber}
          maxLength={12}
          capitalize={'characters'}
        />
        {Object.keys(addCarFormState).map((item, index) => {
          return (
            <TouchableOpacity
              key={`addCar-touchable-${index}`}
              onPress={() =>
                handleCalendarModalOpen({
                  dateFieldName: item,
                })
              }
              style={AddCarStyle.propBtn}>
              <SvgXml xml={addCarFormState[item].svg} width={22} height={22} />
              <Text style={AddCarStyle.propBtnLabel}>{`${
                // addCarFormState[item].label
                t(addCarFormState[item].label)
              } ${
                addCarFormState[item].value
                  ? `- ${moment(addCarFormState[item].value).format(
                      'DD.MM.YYYY',
                    )}`
                  : ''
              } `}</Text>
            </TouchableOpacity>
          );
        })}

        <Modal isFullScreen={true} modalVisible={calendarModalIsVisible}>
          <View style={AddCarStyle.modalContainer}>
            <View>
              <NativeBaseBackButton
                style={AddCarStyle.closeButton}
                handleOnPress={handleCloseCalendarModal}
                iconType={'exit'}
              />
              <Title
                label={addCarFormState[dateFieldNameForCalendar]?.label}
                style={AddCarStyle.title}
              />
              <DatePicker
                onChangeDate={e => {
                  handleChangeDate({
                    dateFieldName: dateFieldNameForCalendar,
                    dateFieldValue: e,
                  });
                }}
              />
            </View>

            <NativeBaseButton
              label={'CLOSE'}
              handleOnPress={handleCloseCalendarModal}
              isDisabled={false}
              isFloating={true}
            />
          </View>
          <Toast
            ref={toastRef}
            style={{
              zIndex: 3,
              elevation: 3,
            }}
          />
        </Modal>

        {/* </Box> */}
      </ScrollView>
      <View style={AddCarStyle.buttonWrapper}>
        <ButtonComponent
          text={t('confirm').toUpperCase()}
          isDisabled={isLoading || !carToAdd.licensePlateNumber}
          onPress={handleOnAddCarSubmit}
        />
      </View>
    </Box>
  );
};

AddCar.prototype = {
  inModal: PropTypes.bool,
  inHomeModal: PropTypes.bool,
  handleAddCar: PropTypes.func,
  setShowCarModal: PropTypes.func,
  handleSetActiveCar: PropTypes.func,
  setStep: PropTypes.func,
  step: PropTypes.number,
};

export default AddCar;
