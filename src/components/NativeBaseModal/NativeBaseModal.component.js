import { Modal, Button } from "native-base";
import React from "react";

const NativeBaseComponent = (props) => {
  const { showModal, setShowModal } = props;
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      _backdrop={{
        _dark: {
          bg: "coolGray.800",
        },
        bg: "warmGray.50",
      }}
    >
      <Modal.Content maxWidth="350" maxH="212">
        <Modal.CloseButton />
        <Modal.Header>Return Policy</Modal.Header>
        <Modal.Body>
          Create a 'Return Request' under “My Orders” section of App/Website.
          Follow the screens that come up after tapping on the 'Return’ button.
          Please make a note of the Return ID that we generate at the end of the
          process. Keep the item ready for pick up or ship it to us basis on the
          return mode.
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default NativeBaseComponent;
