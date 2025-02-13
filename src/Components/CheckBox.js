import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import styled from 'styled-components';

const Checkbox = forwardRef((props,ref) => {
    const [isChecked, setIsChecked] = useState(props.props.value);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    useImperativeHandle(ref, () => ({
        getData(){
            return (isChecked);
        }
    }))

    return (
        <StyledWrapper>
            <label className="checkbox-btn">
                <label htmlFor="checkbox" />
                <input
                    id="checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className="checkmark" />
            </label>
        </StyledWrapper>
    );
});

const StyledWrapper = styled.div`
  /* Customize the label (the checkbox-btn) */
  .checkbox-btn {
    display: block;
    position: relative;
    padding-left: 1.5vw;
    margin-bottom: 1.7vh;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .checkbox-btn input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkbox-btn label {
    cursor: pointer;
    font-size: 14px;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 2.5px solid #ffffff;
    transition: .2s linear;
  }
  .checkbox-btn input:checked ~ .checkmark {
    background-color: transparent;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    visibility: hidden;
    opacity: 0;
    left: 50%;
    top: 40%;
    width: 10px;
    height: 14px;
    border: 2px solid #0ea021;
    filter: drop-shadow(0px 0px 10px #0ea021);
    border-width: 0 2.5px 2.5px 0;
    transition: .2s linear;
    transform: translate(-50%, -50%) rotate(-90deg) scale(0.2);
  }

  /* Show the checkmark when checked */
  .checkbox-btn input:checked ~ .checkmark:after {
    visibility: visible;
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
    animation: pulse 1s ease-in;
  }

  .checkbox-btn input:checked ~ .checkmark {
    transform: rotate(45deg);
    border: none;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) rotate(0deg) scale(1.6);
    }
  }`;

export default Checkbox;
