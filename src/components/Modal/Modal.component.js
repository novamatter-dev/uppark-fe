import React, {useRef} from 'react';
import {Modal as ModalNative} from 'react-native';
import {Box} from 'native-base';
import modalStyle from './Modal.style';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const Modal = props => {
  const {
    children,
    modalVisible = false,
    setModalVisible = () => {},
    isFullScreen = false,
    isForNotification = false,
  } = props;

  return (
    <>
      <ModalNative
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <Box
          style={
            isFullScreen
              ? {...modalStyle.centeredView, ...modalStyle.fullScreenView}
              : isForNotification
              ? modalStyle.notification
              : modalStyle.centeredView
          }>
          {isForNotification && <>{children}</>}
          {!isForNotification && (
            <Box
              style={
                isFullScreen
                  ? {
                      ...modalStyle.modalView,
                      ...modalStyle.fullScreenModalView,
                    }
                  : modalStyle.modalView
              }>
              {children}
            </Box>
          )}
        </Box>
      </ModalNative>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  modalVisible: PropTypes.bool,
  setModalVisible: PropTypes.func,
  isFullScreen: PropTypes.bool,
};
export default Modal;
