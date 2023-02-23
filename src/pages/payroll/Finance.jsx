import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Payslip from './tabbing/Payslip'
import Reimbursement from './tabbing/Reimbursement'

const Finance = () => {
  return (
    <Tabs defaultActiveKey="payslip" id="uncontrolled-tab-example">
  <Tab eventKey="payslip" title="Payslip">
    <Payslip />
  </Tab>
  <Tab eventKey="reimbursement" title="Reimbursement">
    <Reimbursement />
  </Tab>
</Tabs>
  )
}

export default Finance