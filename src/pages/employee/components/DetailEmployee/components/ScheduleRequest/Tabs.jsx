import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Overtime from './Tabs/Overtime'
import PaidLeave from './Tabs/PaidLeave'
import Permit from './Tabs/Permit'


const Tabbing = () => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
  <Tab eventKey="overtime" title="Overtime">
    <Overtime />
  </Tab>
  <Tab eventKey="paidLeave" title="Paid Leave">
    <PaidLeave />
  </Tab>
  <Tab eventKey="permit" title="Permit">
    <Permit />
  </Tab>
</Tabs>

  )
}

export default Tabbing