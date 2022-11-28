import React from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { selectStyles } from "../../../../../style-component/ReactSelectFilterTable";
import { 
  BLOOD_TYPE, 
  IDENTITY_TYPE, 
  MARITAL_STATUS, 
  RELIGION 
} from "../../../../../utils/constant";
import { RequiredIcon } from "../../../../components/PiecesComponent";

const First = ({
  data,
  isPermanentIdCard,
  isSameCitizentAddress,
  onChange,
  onChangeSelect,
  onChangePermanentIdCard,
  onChangeCitizentAddress,
}) => {
  return (
    <div className="col-xl-12">
      <div className="row justify-content-between">
        {/* PERSONAL DATA */}
        <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 px-5 p-3">
          <span className="mt-4 text-blue-dark my-4">Personal Data</span> <br />
          <span className="text-muted my-4">
            Fill all employee basic information data
          </span>
          {/* FIRSTNAME LASTNAME */}
          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="firstname" className="text-bold">Name</label>
              <input
                type="text"
                value={data.firstname}
                className="form-control input-border-grey"
                name="firstname"
                id="firstname"
                onChange={onChange}
                placeholder="Firstname"
              />
              <RequiredIcon />
            </div>
            <div className="form-group col-md-6 mt-4">
              <input
                type="text"
                value={data.lastname}
                className="form-control input-border-grey"
                name="lastname"
                id="lastname"
                onChange={onChange}
                placeholder="Last Name"
              />
              
            </div>
          </div>

          {/* EMAIL */}
          <div className="row mt-3">
            <div className="col-12">
              <label htmlFor="email" className="text-bold">Email</label>
              <input 
                type="email"
                value={data.email}
                className="form-control input-border-grey"
                name="email"
                onChange={onChange}
                placeholder="example@example.com"
              />
              <div className="d-flex justify-content-between">
                <span className="text-muted">This Email is Use For User Login</span>
                <RequiredIcon />
              </div>
            </div>
          </div>

          {/* PHONE AND MOBILE PHONE */}
          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="mobile_phone" className="text-bold">Mobile</label>
              <input
                type="text"
                name="mobile_phone"
                className="form-control input-border-grey"
                id="mobile_phone"
                value={data.mobile_phone}
                onChange={onChange}
                placeholder="Mobile phone"
              />
              <RequiredIcon />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone_number" className="text-bold">Phone</label>
              <input
                type="text"
                name="phone_number"
                onChange={onChange}
                value={data.phone_number}
                className="form-control input-border-grey"
                id="phone_number"
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* POB AND DOB */}
          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="pob" className="text-bold">Place of Birth</label>
              <input
                type="text"
                value={data.pob}
                name="pob"
                className="form-control input-border-grey"
                id="pob"
                onChange={onChange}
                placeholder="Ex: Jakarta"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="dob" className="text-bold">Birthdate</label>
              <input
                type="date"
                value={data.dob}
                name="dob"
                className="form-control input-border-grey"
                id="dob"
                onChange={onChange}
              />
            </div>
          </div>

          {/* GENDER AND MARITAL STATUS */}
          <div className="row mt-4">
            <div className="form-group col-md-6">
              <label htmlFor="gender" className="text-bold">Gender</label> <br />
              <div className="form-check form-check-inline">
                <input onChange={onChange} checked={data.gender === 'male'} value="male" className="form-check-input" type="radio" name="gender" id="male" />
                <label className="form-check-label" htmlFor="male">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input onChange={onChange} checked={data.gender === 'female'} value="female" className="form-check-input" type="radio" name="gender" id="female" />
                <label className="form-check-label" htmlFor="female">Female</label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="marital_status" className="text-bold">Marital Status</label>
              <Select
                onChange={onChangeSelect}
                id="marital_status"
                name="marital_status"
                value={data.marital_status}
                options={MARITAL_STATUS}
                styles={selectStyles}
                isClearable={false}
                placeholder={"Select Status..."}
              />
            </div>
          </div>

          {/* Blood Type and Religion */}
          <div className="row mt-4 mb-5">
            <div className="form-group col-md-6">
              <label htmlFor="blood_type" className="text-bold">Blood Type</label> <br />
              <Select
                id="blood_type"
                name="blood_type"
                options={BLOOD_TYPE}
                value={data.blood_type}
                styles={selectStyles}
                isClearable={false}
                onChange={onChangeSelect}
                placeholder={"Select..."}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="religion" className="text-bold">Religion</label>
              <Select
                id="religion"
                name="religion"
                options={RELIGION}
                value={data.religion}
                styles={selectStyles}
                isClearable={false}
                onChange={onChangeSelect}
                placeholder={"Select..."}
              />
            </div>
          </div>

        </div>

        {/* IDENTITY */}
        <div 
          className="col-xl-6 col-lg-12 col-md-12 col-sm-12 px-5 p-3"
        >
          <span className="mt-4 text-blue-dark my-4">Identity & Address</span> <br />
          <span className="text-muted my-4">
            Employee Identity & Address Information
          </span>
          {/* BORDER */}
          <div className="border-div-left"></div>

          {/* IDENTITY TYPE & NUMBER */}
          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="identity_type" className="text-bold">Identity Type</label>
              <Select
                onChange={onChangeSelect}
                value={data.identity_type}
                id="identity_type"
                name="identity_type"
                options={IDENTITY_TYPE}
                styles={selectStyles}
                isClearable={false}
                placeholder={"Select Type..."}
              />
              <RequiredIcon />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="identity_number" className="text-bold">Identity Number</label>
              <input
                type="text"
                value={data.identity_number}
                className="form-control input-border-grey"
                name="identity_number"
                onChange={onChange}
                id="identity_number"
                placeholder="Identity Number"
              />
              <RequiredIcon />
            </div>
          </div>

          {/* IDENTITY EXPIRE DATE & POSTAL CODE */}
          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="identity_type" className="text-bold">Identity Expiry Date</label>

              <input
                type="date"
                name="dob"
                value={isPermanentIdCard ? null : data.identity_expired}
                className="form-control input-border-grey"
                id="dob"
                onChange={onChange}
                disabled={isPermanentIdCard}
              />

              <div className="form-check">
                <input onChange={onChangePermanentIdCard} value={isPermanentIdCard} className="form-check-input" name="is_permanent" type="checkbox" id="is_permanent" />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Permanent
                </label>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="postal_code" className="text-bold">Postal Code</label>
              <input
                type="text"
                onChange={onChange}
                value={data.postal_code}
                className="form-control input-border-grey"
                name="postal_code"
                id="postal_code"
                placeholder="Postal Code"
              />
            </div>
          </div>

          {/* CITIZEN ID ADDRESS */}
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="text-bold" htmlFor="citizent_address">Citizen ID Address</label>
              <textarea
                style={{ height: '90px' }}
                className="form-control input-border-grey" 
                name="citizent_address" 
                id="citizent_address"
                value={data.citizent_address}
                onChange={onChange}
                placeholder="Citizen ID Address"
              >

              </textarea>
            </div>
          </div>

          {/* RESIDENT ADDRESS */}
          <div className="row mt-3">
            <div className="col-md-12">
              <label className="text-bold" htmlFor="resident_address">Resident Address</label>
              <textarea
                style={{ height: '90px' }}
                className="form-control input-border-grey" 
                name="resident_address"
                onChange={onChange}
                id="resident_address"
                value={isSameCitizentAddress ? data.citizent_address : data.resident_address}
                readOnly={isSameCitizentAddress}
                placeholder="Citizen ID Address"
              >
              </textarea>
              <div className="form-check">
                <input onChange={onChangeCitizentAddress} className="form-check-input" value={isSameCitizentAddress} name="is_same_as_citizent" type="checkbox" id="is_same_as_citizent" />
                <label className="form-check-label" htmlFor="is_same_as_citizent">
                  Use as Citizen Id Address
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

First.propTypes = {
  data: PropTypes.object.isRequired,
  isPermanentIdCard: PropTypes.bool.isRequired,
  isSameCitizentAddress: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeSelect: PropTypes.func.isRequired,
  onChangePermanentIdCard: PropTypes.func,
  onChangeCitizentAddress: PropTypes.func,
};

export default First;
