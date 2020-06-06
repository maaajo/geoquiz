import React from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  height: 120px;
  border-bottom-left-radius: 230px 145px;
  border-bottom-right-radius: 230px 145px;
  ${tw`w-full bg-green shadow-lg`}
`;

const StyledH1 = styled.h1`
  ${tw`text-4xl font-bold text-white font-logo text-center pt-4 antialiased tracking-custom`}
`;

const StyledButton = styled.button`
  ${tw`text-white text-sm hover:underline tracking-custom`}
`;

const StyledLink = styled(Link)`
  ${tw`text-white text-sm hover:underline tracking-custom`}
`;

const Header = ({ handleLanguageChange }) => {
  return (
    <StyledHeader>
      <section className="flex justify-between pt-1">
        <StyledLink to="/" className="pl-3">
          new game
        </StyledLink>
        <div className="pr-3">
          <StyledButton onClick={handleLanguageChange}>pl</StyledButton>
          <span className="text-white"> | </span>
          <StyledButton onClick={handleLanguageChange}>en</StyledButton>
        </div>
      </section>
      <StyledH1>
        <Link to="/">GeoQuiz</Link>
      </StyledH1>
    </StyledHeader>
  );
};

export default Header;
