import React from 'react';
import PropTypes from 'prop-types';

const SearchFilterInput = ({ 
  clickFilter, onChangeInput, input,
}) => {
  return (
    <div className="input-group">
      <div className="input-group-append">
        <button className="btn" type="button" style={{
          border: '2px solid #19C8FF',
          borderRight: '0',
          borderTopLeftRadius: '5px',
          borderBottomLeftRadius: '5px',
          cursor: 'default',
        }}>
          <img src={`${process.env.PUBLIC_URL}/assets/img/search_blue.png`} alt="" />
        </button>
      </div>
      <input type="text" value={input} className="form-control input-search" placeholder="Search" style={{ borderRight: '0', borderLeft: '0' }} onChange={onChangeInput} />
      <div className="input-group-append">
        <button onClick={clickFilter} className="btn" type="button" style={{ border: '2px solid #19C8FF', borderLeft: '0', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
          <img src={`${process.env.PUBLIC_URL}/assets/img/Filter.png`} alt="" />
        </button>
      </div>
    </div>
  );
};

SearchFilterInput.propTypes = {
  clickFilter: PropTypes.func,
  onChangeInput: PropTypes.func,
  input: PropTypes.any,
}

export default SearchFilterInput;
