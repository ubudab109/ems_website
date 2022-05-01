import React from 'react';
import PropTypes from 'prop-types';

const SearchFilterInput = ({
  clickFilter, onChangeInput, input, canFilter
}) => {
  return (
    <div className="input-group">
      <div className="input-group-append">
        <button className="btn" type="button" style={{
          border: '2px solid #00617F',
          borderRight: '0',
          borderTopLeftRadius: '5px',
          borderBottomLeftRadius: '5px',
          cursor: 'default',
        }}>
          <img src={`${process.env.PUBLIC_URL}/assets/img/search_blue_dark.png`} alt="" />
        </button>
      </div>
      <input 
      type="text" 
      value={input} 
      className="form-control input-search" 
      placeholder="Search" 
      style={{
        borderRight: canFilter ? '0' : '1',
        borderLeft: '0'
      }}
        onChange={onChangeInput} />
      {
        canFilter && (
          <div className="input-group-append">
            <button onClick={clickFilter} className="btn" type="button" style={{ border: '2px solid #00617F', borderLeft: '0', borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>
              <img src={`${process.env.PUBLIC_URL}/assets/img/Filter.png`} alt="" />
            </button>
          </div>
        )
      }
    </div>
  );
};

SearchFilterInput.propTypes = {
  clickFilter: PropTypes.func,
  onChangeInput: PropTypes.func,
  input: PropTypes.any,
  canFilter: PropTypes.bool,
}

SearchFilterInput.defaultProps = {
  canFilter: false
}

export default SearchFilterInput;
