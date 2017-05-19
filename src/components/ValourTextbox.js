import React from 'react';
import { Textbox } from 'es-components';
import { omit, noop } from 'lodash';

function getValidationResult(result, successValidation = false) {
    if (result){
        const isValid = result.valid !== undefined ? result.valid : false;
        if (!isValid){
            return { validationState: 'danger', validationMessage: result.messages[0] };
        }
        else if (isValid && successValidation){
            return { validationState: 'success' };
        }
    }
}

function createTextChangedHandler(handleValidationResultChange, handlePropMethod = noop) {
    return value => {
        handleValidationResultChange(value);
        handlePropMethod(value);
    }
}

function ValourTextbox(props) {
    const { 
        validateOnBlur,        
        validateOnChange,
        handleOnChange,
        handleFocusLost,  
        validationResult,
        successValidation,    
        setValidationTypeForForm,          
        handleValidationResultChange
    } = props;
    const state = getValidationResult(validationResult, successValidation);
    const validationProps = {};
    let passedTextProps = props;

    if (state) {
       validationProps["validationState"] = state.validationState;
       validationProps["additionalHelpContent"] = state.validationMessage;
    } 
    
    if (validateOnChange || (setValidationTypeForForm === 'onChange' && !validateOnBlur)) {
        passedTextProps = omit(passedTextProps, "handleOnChange");
        validationProps["handleOnChange"] = createTextChangedHandler(handleValidationResultChange, handleOnChange);
    }
    if (validateOnBlur || (setValidationTypeForForm === 'onBlur' && !validateOnChange)) {
        passedTextProps = omit(passedTextProps, "handleFocusLost");
        validationProps["handleFocusLost"] = createTextChangedHandler(handleValidationResultChange, handleFocusLost);
    } 
    if (!validateOnBlur && !validateOnChange && !setValidationTypeForForm) {
        validationProps["handleFocusLost"] = createTextChangedHandler(handleValidationResultChange);
    }

    return <Textbox {...validationProps} {...passedTextProps}  />
}
export default ValourTextbox;