import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OptionButton = ({
  content = '',
  buttonStyle = 'rectangle',
  urlParam = '',
}) => {
  return (
    <Link
      to={`/${urlParam}`}
      className={
        buttonStyle === 'rectangle'
          ? 'button-rectangle flex justify-center items-center'
          : 'button-wide flex justify-center items-center'
      }
    >
      <span>{content}</span>
    </Link>
  );
};

OptionButton.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string.isRequired,
  datasetName: PropTypes.string,
  datasetValue: PropTypes.string,
};

export default OptionButton;
