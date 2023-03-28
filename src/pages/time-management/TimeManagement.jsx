import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Schedule from './tabs/Schedule'
import Overtime from './tabs/Overtime'

const TimeManagement = () => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
  <Tab eventKey="schedule" title="Schedule">
    <Schedule />
  </Tab>
  <Tab eventKey="overtime" title="Overtime">
    <Overtime />
  </Tab>
</Tabs>
  )
}

export default TimeManagement