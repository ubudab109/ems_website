import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";

const ModalCreateClaimType = ({ name, max_claim, onChangeInput }) => (
  <Fragment>
    <div className="row">
      <div className="col-md-12">
        <div className="row mb-2">
          <div className="col-6">
            <label htmlFor="name" className="text-bold">
              Claim Type Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChangeInput}
              className="form-control input-border-gray"
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="text-bold">Maximum Claim</label>
            <NumericFormat
              value={max_claim}
              required
              onChange={onChangeInput}
              className="form-control input-border-gray"
              name="max_claim"
              placeholder={`Maximum Claim`}
              prefix={"Rp. "}
              thousandSeparator=","
            />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

ModalCreateClaimType.propTypes = {
  name: PropTypes.string,
  max_claim: PropTypes.any,
  onChangeInput: PropTypes.func
};

export default ModalCreateClaimType;
