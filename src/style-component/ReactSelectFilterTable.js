export const filterStyles = {
  option: (provided) => ({
    ...provided,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#200E32',
  }),
  control: (base) => ({
    ...base,
    backgroundColor: 'none',
    borderRadius: '5px',
    border: '2px solid #00617F',
    width: '100%',
    minHeight: '25px',
  }),
  dropdownIndicator: () => ({
    color: '#00617F',
    with: '1%'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
};

export const selectStyles = {
  option: (provided) => ({
    ...provided,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    color: '#200E32',
  }),
  control: (base) => ({
    ...base,
    backgroundColor: 'none',
    borderRadius: '5px',
    border: '1px solid #AAAAAA',
    width: '100%',
    minHeight: '25px',
  }),
  dropdownIndicator: () => ({
    color: '#AAAAAA',
    with: '1%'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  })
};