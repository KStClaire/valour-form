import React from 'react';
import PropTypes from 'prop-types';
import { RadioGroup } from 'es-components';
import { noop, omit, forEach } from 'lodash';

function getValidationResult(result) {
    if (result){
        return result;
    }
}

function createChangedHandler(handleValidationResultChange, handlePropMethod = noop) {
    return value => {
        handleValidationResultChange(value);
        handlePropMethod(value);
    }
}

function ValourRadioGroup(props) {
    const { 
        onBlur,
        onChange,
        fieldValue,
        radioOptions,        
        validateOnBlur,        
        validateOnChange,
        validationResult,
        onCheckedValueChanged,
        onCheckedValueFocusLost,
        formValidationType,
        handleValidationResultChange
    } = props;
    const state = getValidationResult(validationResult);
    let passedProps = props;
    const validationProps = {};

    if (state) {
        validationProps["hasError"] = !state.valid;
    }

    if (validateOnChange || (formValidationType === 'onChange' && !validateOnBlur)) {
        passedProps = omit(passedProps, "onCheckedValueChanged");
        validationProps["onCheckedValueChanged"] = createChangedHandler(handleValidationResultChange, onCheckedValueChanged);
    }
    if (validateOnBlur || (formValidationType === 'onBlur' && !validateOnChange)) {
        passedProps = omit(passedProps, "onCheckedValueFocusLost");
        validationProps["onCheckedValueFocusLost"] = createChangedHandler(handleValidationResultChange, onCheckedValueFocusLost);
    } 
    if (!validateOnBlur && !validateOnChange && !formValidationType) {
        validationProps["onCheckedValueChanged"] = createChangedHandler(handleValidationResultChange);
    }

    forEach(radioOptions, option => {
        if(onChange){
            validationProps["onCheckedValueChanged"] = createChangedHandler(handleValidationResultChange, onChange);            
        }
        if(onBlur){
            validationProps["onCheckedValueFocusLost"] = createChangedHandler(handleValidationResultChange, onBlur);          
        }
    });

    if(fieldValue){
        validationProps["checkedValue"] = fieldValue;
    }

    return <RadioGroup {...validationProps} {...passedProps}  />
}

ValourRadioGroup.propTypes = {
    /**
     * The name used to match the validation rule to the input 
     * @see See [es-components](https://twexchangesolutions.github.io/es-components/#radiogroup) for more RadioGroup properties
     * */
    name: PropTypes.string.isRequired,
    /** Validates the input after focus is lost */
    validateOnBlur: PropTypes.bool,
    /** Validates the input after the value is changed */
    validateOnChange: PropTypes.bool,
};

export default ValourRadioGroup;