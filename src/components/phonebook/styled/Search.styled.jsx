import styled from '@emotion/styled';

export const INPUT = styled.input`
  // position: relative;
  display: flex;
  margin: 10px;
  border-radius: 4px;
  padding: 5px;
  border: none;
  outline: none;
  height: 25px;
  box-shadow: 0px 0px 3px;
  transition: all 0.4s ease 0s;

  :hover,
  :focus {
    box-shadow: 0px 0px 6px red;
  }
`;
