import React from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalTransition,
  Button,
  Inline,
  Textfield,
  Box,
} from '@forge/react';

const ConfigFormStep = ({
  isOpen,
  onClose,
  onBack,
  onCreate,
  selectedCard,
  fieldName,
  setFieldName,
  fieldDesc,
  setFieldDesc,
}) => {
  return (
    <ModalTransition>
      {isOpen && (
        <Modal onClose={onClose} width="x-large">
          <ModalHeader>
            <ModalTitle>Configure "{selectedCard?.title}" Field</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <Box
              padding="space.300"
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <Textfield
                label="Name*"
                placeholder="Enter a field name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
              />
              <Textfield
                label="Description"
                placeholder="Enter a field description"
                value={fieldDesc}
                onChange={(e) => setFieldDesc(e.target.value)}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Inline gap="space.100">
              <Button appearance="subtle" onClick={onClose}>
                Cancel
              </Button>
              <Button appearance="subtle" onClick={onBack}>
                Back
              </Button>
              <Button
                appearance="primary"
                onClick={onCreate}
                isDisabled={!fieldName}
              >
                Create
              </Button>
            </Inline>
          </ModalFooter>
        </Modal>
      )}
    </ModalTransition>
  );
};

export default ConfigFormStep;
