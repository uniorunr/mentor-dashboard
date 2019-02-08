import React, { Component, Fragment } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import Select from 'react-select';
import PropTypes from 'prop-types';
import './UserPicker.css';
import { mentorsList } from '../../../utils/parseJSON';

const isMentor = (mentor, list) => {
  const mentors = [];
  list.forEach((element) => {
    mentors.push(element.label);
  });
  return mentors.includes(mentor);
};

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

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      const mentorFromStorage = localStorage.getItem('selectedMentor');
      if (user && isMentor(user.displayName, mentorsList)) {
        this.handleChange({ value: user.displayName, label: user.displayName });
        localStorage.removeItem('selectedMentor');
      } else if (mentorFromStorage) {
        this.setState({
          selectedOption: { value: mentorFromStorage, label: mentorFromStorage },
        });
      }
    });
  }

  handleChange = (selectedOption) => {
    const { handleInput } = this.props;
    this.setState({ selectedOption });
    handleInput(selectedOption.label);
    localStorage.setItem('selectedMentor', selectedOption.label);
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
  handleInput: PropTypes.func.isRequired,
};

export default UserPicker;
