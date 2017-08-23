import React from 'react';
import PropTypes from 'prop-types';
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

function createChangedHandler(handleValidationResultChange, handlePropMethod = noop) {
    return value => {
        handleValidationResultChange(value);
        handlePropMethod(value);
    }
}

function ValourTextbox(props) {
    const { 
        fieldValue,
        validateOnBlur,        
        validateOnChange,
        handleOnChange,
        handleFocusLost,  
        validationResult,
        successValidation,    
        formValidationType,          
        handleValidationResultChange
    } = props;
    const state = getValidationResult(validationResult, successValidation);
    const validationProps = {};
    let passedProps = props;

    if (state) {
       validationProps["validationState"] = state.validationState;
       validationProps["additionalHelpContent"] = state.validationMessage;
    } 
    
    if (validateOnChange || (formValidationType === 'onChange' && !validateOnBlur)) {
        passedProps = omit(passedProps, "handleOnChange");
        validationProps["handleOnChange"] = createChangedHandler(handleValidationResultChange, handleOnChange);
    }
    if (validateOnBlur || (formValidationType === 'onBlur' && !validateOnChange)) {
        passedProps = omit(passedProps, "handleFocusLost");
        validationProps["handleFocusLost"] = createChangedHandler(handleValidationResultChange, handleFocusLost);
    } 
    if (!validateOnBlur && !validateOnChange && !formValidationType) {
        validationProps["handleFocusLost"] = createChangedHandler(handleValidationResultChange);
    }

    if(fieldValue){
        validationProps["initialValue"] = fieldValue;
    }

    return <Textbox {...validationProps} {...passedProps}  />
}

ValourTextbox.propTypes = {
    /**
     * The name used to match the validation rule to the input 
     * @see See [es-components](https://twexchangesolutions.github.io/es-components/#textbox) for more Textbox properties
     * */
    name: PropTypes.string.isRequired,
    /** Validates the input after focus is lost */
    validateOnBlur: PropTypes.bool,
    /** Validates the input after the value is changed */
    validateOnChange: PropTypes.bool,
    /** Enables the green 'success' coloring when the input is valid */
    successValidation: PropTypes.bool
};

export default ValourTextbox;