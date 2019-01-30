import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './UserPicker.css';

const customStyles = {
  container: provided => ({
    ...provided,
    width: '20%',
    'min-width': 155,
  }),
};

class UserPicker extends Component {
  state = {
    selectedOption: null,
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    const { placeholder, options } = this.props;
    const { selectedOption } = this.state;
    return (
      <Fragment>
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          placeholder={placeholder}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          styles={customStyles}
        />
      </Fragment>
    );
  }
}

UserPicker.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
};

export default UserPicker;
