import React from "react";
import { Button, Col, Modal } from "react-bootstrap";
import {
  moveDownBodyComponent,
  moveUpBodyComponent,
} from "../../SanitySetup/sanityQueries";
import { FaArrowDown, FaArrowUp, FaPen, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import RemoveComponentHelper from "./RemoveComponentHelper";

function LayoutControlButtonsComponent(props) {
  const {
    fetchSection,
    section,
    component,
    editSelectedComponent,
    setEditSelectedComponent,
    setSelectedComponentId,
    hideEdit,
    componentType,
  } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const moveComponentUp = async (currentSectionId, selectedComponent) => {
    try {
      await moveUpBodyComponent(currentSectionId, selectedComponent._id);
      fetchSection();
    } catch (error) {
      window.alert(
        "Something went wrong trying to move up the selected component"
      );
    }
  };

  const moveComponentDown = async (currentSectionId, selectedComponent) => {
    try {
      await moveDownBodyComponent(currentSectionId, selectedComponent._id);
      fetchSection();
    } catch (error) {
      window.alert(
        "Something went wrong trying to move down the selected component"
      );
    }
  };

  const handleEditComponent = () => {
    if (!editSelectedComponent) {
      setEditSelectedComponent(true);
      setSelectedComponentId(component._id);
    } else {
      setEditSelectedComponent(false);
    }
  };

  const handleDeleteComponent = async () => {
    try {
      await RemoveComponentHelper(
        section._id,
        component._id,
        componentType
      );
      fetchSection();

    } catch (error) {
      console.warn(error)
      window.alert(`Something went wrong: \n \n ${error}`)
    }
  };

  return (
    <Col xs="auto" id="actionBannerEditLayoutContainer" className="justify-content-center d-flex">


      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Component</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove the current Component!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => handleDeleteComponent()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Col
        id="actionbannerEditbutton"
        xs="auto"
        className="align-items-center justify-content-center d-flex"
      >
        <Col xs="auto" id="actionbannerEditbuttonUp"
        >
          <Button
            style={{ margin: "1px" }}
            variant="warning"
            onClick={() => moveComponentUp(section._id, component)}
            test-id={`${component._type}UpBtn`}
          >
            <FaArrowUp />
          </Button>
        </Col>
        <Col xs="auto" id="actionbannerEditbuttonDown"
        >
          <Button
            style={{ margin: "1px" }}
            variant="warning"
            onClick={() => moveComponentDown(section._id, component)}
            test-id={`${component._type}DownBtn`}

          >
            {" "}
            <FaArrowDown />
          </Button>
        </Col>
        {!hideEdit ? (
          <Col xs="auto" id="actionbannerEditbuttonEdit"
          >
            <Button
              id="edit-component-btn"
              test-id={`${component._type}EditBtn`}
              style={{ margin: "1px" }}
              variant="warning"
              onClick={() => {
                handleEditComponent();
              }}
            >
              <FaPen />
            </Button>
          </Col>
        ) : null}
        <Col xs="auto" id="actionbannerEditbuttonDelete"
        >
          <Button
            style={{ margin: "1px" }}
            variant="warning"
            onClick={() => handleShow()}
            test-id={`${component._type}DeleteBtn`}

          >
            <FaTrashAlt />
          </Button>
        </Col>
      </Col>
    </Col>);
}

export default LayoutControlButtonsComponent;
