import { React, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

export default function NewTag({ addTag, isTagExists }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const nameRef = useRef();

  function onAddTag() {
    const tag = {
      name: nameRef.current.value,
    };
    if(!isTagExists(tag)){
      addTag(tag);
      alert(`Tag ${tag.name} is successfully added!`);
      handleClose();
    } else {
      alert(`Tag ${tag.name} has already existed!`);
    }
  }

  return (
    <>
      <button className='btn btn-sm btn-outline-secondary' id="addTag-modal-btn" type='click' onClick={handleShow}>Add Tag</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className='form-label' htmlFor='tagName'>Name:</label>
            <input className='form-control' type='text' id='tagName' ref={nameRef} required></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" id="addTag-comfirm" onClick={onAddTag}>
            Comfirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

NewTag.propTypes = {
  addTag: PropTypes.func,
  isTagExists: PropTypes.func,
};