import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Employment from './Tabs/Employment'
import Identity from './Tabs/Identity'
import PersonalData from './Tabs/PersonalData'


const Tabbing = () => {
  return (
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
  <Tab eventKey="employment" title="Employment">
    <Employment />
  </Tab>
  <Tab eventKey="identity" title="Identity">
    <Identity />
  </Tab>
  <Tab eventKey="personalData" title="Personal Data">
    <PersonalData />
  </Tab>
</Tabs>

  )
}

export default Tabbing