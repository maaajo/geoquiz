import React from 'react';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  ${tw`flex justify-center items-center`}
`;

const OptionButton = ({
  content = '',
  buttonStyle = 'rectangle',
  urlParam = '',
}) => {
  return (
    <StyledLink
      to={`/${urlParam}`}
      className={
        buttonStyle === 'rectangle' ? 'button-rectangle' : 'button-wide'
      }
    >
      <span>{content}</span>
    </StyledLink>
  );
};

OptionButton.propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.string.isRequired,
  datasetName: PropTypes.string,
  datasetValue: PropTypes.string,
};

export default OptionButton;
