import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Payslip from './Tabbing/payslip'
import Reimbursement from './Tabbing/reimbursement'

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