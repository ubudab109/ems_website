import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Payroll from './Tabs/Payroll'
import Reimbursement from './Tabs/Reimbursement'


const Tabbing = () => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
  <Tab eventKey="payroll" title="Payroll">
    <Payroll />
  </Tab>
  <Tab eventKey="reimbursement" title="Reimbursement">
    <Reimbursement />
  </Tab>
</Tabs>

  )
}

export default Tabbing