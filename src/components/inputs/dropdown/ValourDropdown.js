import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'es-components';
import { noop, omit } from 'lodash';

function getValidationResult(result, successValidation = false) {
    if (result){
        const isValid = result.valid !== undefined ? result.valid : false;
        if (!isValid){
            return { validationState: 'danger' };
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

function ValourDropdown(props) {
    const { 
        fieldValue,
        validateOnBlur,        
        validateOnChange,
        validationResult,
        successValidation,
        onOptionChanged,
        onDropdownFocusLost,
        formValidationType,
        handleValidationResultChange
    } = props;
    const state = getValidationResult(validationResult, successValidation);
    let passedProps = props;
    const validationProps = {};

    if (state) {
        validationProps["validationState"] = state.validationState;
    }

    if (validateOnChange || (formValidationType === 'onChange' && !validateOnBlur)) {
        passedProps = omit(passedProps, "onOptionChanged");
        validationProps["onOptionChanged"] = createChangedHandler(handleValidationResultChange, onOptionChanged);
    }
    if (validateOnBlur || (formValidationType === 'onBlur' && !validateOnChange)) {
        passedProps = omit(passedProps, "onDropdownFocusLost");
        validationProps["onDropdownFocusLost"] = createChangedHandler(handleValidationResultChange, onDropdownFocusLost);
    } 
    if (!validateOnBlur && !validateOnChange && !formValidationType) {
        validationProps["onOptionChanged"] = createChangedHandler(handleValidationResultChange);
    }

    if(fieldValue){
        validationProps["selectedValue"] = fieldValue;
    }

    return <Dropdown {...validationProps} {...passedProps}  />
}

ValourDropdown.propTypes = {
    /**
     * The name used to match the validation rule to the input 
     * @see See [es-components](https://twexchangesolutions.github.io/es-components/#dropdown) for more Dropdown properties
     * */
    name: PropTypes.string.isRequired,
    /** Validates the input after focus is lost */
    validateOnBlur: PropTypes.bool,
    /** Validates the input after the value is changed */
    validateOnChange: PropTypes.bool,
    /** Enables the green 'success' coloring when the input is valid */
    successValidation: PropTypes.bool
};

export default ValourDropdown;