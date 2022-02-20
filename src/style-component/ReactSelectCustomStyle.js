export const customStyles = {
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
    backgroundColor: '#F1FCFF',
    borderRadius: '5px',
    border: 'none',
    width: '100%',
    minHeight: '25px',
  }),
  dropdownIndicator: () => ({
    color: '#00617F',
    with: '1%'
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  placeholder: (base) => ({
    ...base,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#200E32',
  })
};
