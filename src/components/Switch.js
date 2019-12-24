import React from 'react';
import styled from '@emotion/styled';

const SwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input:checked + span:before {
    transform: translateX(26px);
  }

  input:checked + span {
    background-color: #101010;
  }

  input:focus + span {
    box-shadow: 0 0 1px #101010;
  }
`;

const SliderInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  border-radius: 34px;

  &:before {
    border-radius: 50%;
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  }
`;

function Switch(props) {
  const isOn =
    window.matchMedia &&
    window.matchMedia(
      '(prefers-color-scheme: dark)(prefers-color-scheme: dark)'
    );
  return (
    <SwitchWrapper>
      <SliderInput onChange={props.onChange} type="checkbox" checked={isOn} />
      <Slider />
    </SwitchWrapper>
  );
}

export default Switch;
