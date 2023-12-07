import React from 'react';
import {Image, Text, View} from 'react-native';
import MaintenanceMode from '../../assets/images/MaintenanceMode.png';
import MaintenanceWarning from '../../assets/images/MaintenanceWarning.png';
import MaintenanceStyle from './Maintenance.style';
import {useTranslation} from 'react-i18next';

const Maintenance = () => {
  const {t} = useTranslation();
  return (
    <View style={MaintenanceStyle.container}>
      <Image source={MaintenanceMode} style={MaintenanceStyle.image} />
      <View style={MaintenanceStyle.modalContainer}>
        <Image
          source={MaintenanceWarning}
          style={MaintenanceStyle.smallImage}
        />
        <Text style={MaintenanceStyle.content}>{t('maintenance_text')}</Text>
      </View>
    </View>
  );
};

export default Maintenance;
