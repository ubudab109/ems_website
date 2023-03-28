import React from 'react'
import { Tabs, Tab, Col, Nav, Row } from "react-bootstrap";
import General from '../General/Tabbing'
import Attendance from '../Attendance/Attendance'

const CardLeft = () => {
  return (
    <div className="col-xl-3">
    <div className="card mb-3 p-3">
      <div className="text-center">
        <img
          className="rounded-circle mb-4"
          style={{ width: "100px", height: "100px" }}
          src="https://via.placeholder.com/150"
          alt=""
        />
        <p style={{ color:"#00617F" }} size={15}><b>Clone Strome Burmeh Sugiono</b></p>
        <p>Manager</p>
        <p>ID 45645645</p>
      </div>
    </div>
    <div className="card mb-3 p-3">
      <div class="d-grid gap-2">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column text-center">
            <Nav.Item>
              <Nav.Link eventKey="first">General</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Attendance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Time Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Finance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Warning Letter</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <General />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Attendance />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
        {/* <button class="btn btn-link" type="button">
          General
        </button>
        <button class="btn btn-link" type="button">
          Attendance
        </button>
        <button class="btn btn-link" type="button">
          Time Management
        </button>
        <button class="btn btn-link" type="button">
          Finance
        </button>
        <button class="btn btn-link" type="button">
          Warning Letter
        </button> */}
      </div>
    </div>
  </div>
  )
}

export default CardLeft