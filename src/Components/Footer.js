import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  height: 70px;
  border-top-left-radius: 300px 100px;
  border-top-right-radius: 300px 100px;
  ${tw`absolute left-0 right-0 bottom-0 bg-green flex justify-center items-center`}
`;

const StyledP = styled.p`
  ${tw`text-sm text-white tracking-custom mt-6`}
`;

const Footer = () => (
  <StyledFooter>
    <StyledP>created by: Mateusz Majchrzak</StyledP>
  </StyledFooter>
);

export default Footer;
