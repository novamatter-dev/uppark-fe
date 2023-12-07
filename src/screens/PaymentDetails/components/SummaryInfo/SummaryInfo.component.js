import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
//style & assets
import SummaryInfoStyle from './SummaryInfo.style';
import svgs from '../../../../assets/svgs';
//libraries
import {SvgXml} from 'react-native-svg';
//redux
import {useSelector} from 'react-redux';
import {parkingsState} from '../../../../redux/features/parkings/parkingsSlice';
import {t} from 'i18next';

const SummaryInfo = props => {
  const {
    startTime = '',
    endTime = '',
    startDate = '',
    endDate = ' ',
    plateNr = ' ',
    address = ' ',
    handleAddCar = () => {},
    isExtend = () => {},
  } = props;

  const {activeCar} = useSelector(state => state.cars);
  const parkingsData = useSelector(parkingsState);

  return (
    <View style={SummaryInfoStyle.container}>
      <View style={SummaryInfoStyle.timeContainer}>
        <View style={SummaryInfoStyle.startTimeContainer}>
          <View style={SummaryInfoStyle.item}>
            <Text style={SummaryInfoStyle.greyText}>{t('start_time')}</Text>
            <Text style={SummaryInfoStyle.bigBoldText}>{startTime}</Text>
            <Text style={SummaryInfoStyle.smallBoldText}>{startDate}</Text>
          </View>
          <View style={SummaryInfoStyle.iconAlignment}>
            <SvgXml xml={svgs.arrowRightDisabled} />
          </View>
        </View>

        <View style={SummaryInfoStyle.item}>
          <Text style={SummaryInfoStyle.greyText}>{t('end_time')}</Text>
          <Text style={SummaryInfoStyle.bigBoldText}>{endTime}</Text>
          <Text style={SummaryInfoStyle.smallBoldText}>{endDate}</Text>
        </View>
      </View>

      <View style={SummaryInfoStyle.infoBox}>
        <View style={SummaryInfoStyle.infoItem}>
          <Text style={SummaryInfoStyle.greyText}>{t('vehicle')}</Text>
          <TouchableOpacity onPress={handleAddCar}>
            <Text
              style={{
                // ...SummaryInfoStyle.mediumBoldText,
                ...SummaryInfoStyle.licensePlateText,
              }}>
              {activeCar?.licensePlateNumber || t('select_car')}
              {/* {isExtend()
                ? parkingsData.reservationDetails.car
                : activeCar?.licensePlateNumber || "Select a car"} */}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={SummaryInfoStyle.infoItem}>
          <Text style={SummaryInfoStyle.greyText}>{t('address')}</Text>
          <Text style={SummaryInfoStyle.mediumBoldText}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

SummaryInfo.propTypes = {
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  plateNr: PropTypes.string,
  address: PropTypes.string,
  isExtend: PropTypes.func,
};

export default SummaryInfo;
