import React, {useState} from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function TransferModal(props) {
  const { setShowTransferModal, showTransferModal } = props;

  const handleClose = () => setShowTransferModal(false);

  return (
    <div>
      <Modal show={showTransferModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Tokens</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
