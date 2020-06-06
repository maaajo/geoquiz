import React from 'react';
import PropTypes from 'prop-types';

const OptionButton = ({
  onClick,
  content = '',
  datasetName = '',
  datasetValue = '',
  buttonStyle = 'rectangle'
}) => {
  let datasetVariable;
  if (datasetName) {
    datasetVariable = { [`data-${datasetName}`]: datasetValue };
  }
  const buttonName = content.toLowerCase().replace(/\s/g, '');
  return (
    <button
      className={
        buttonStyle === 'rectangle' ? 'button-rectangle' : 'button-wide'
      }
      type="button"
      name={`game-option-${buttonName}`}
      onClick={onClick}
      {...datasetVariable}
    >
      {content}
    </button>
  );
};

OptionButton.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string.isRequired,
  datasetName: PropTypes.string,
  datasetValue: PropTypes.string
};

export default OptionButton;
