import React from 'react';
import PropTypes from 'prop-types';
import valour from 'valour';
import { Fieldset } from 'es-components';
import { noop, includes, find } from 'lodash';

const timer = 150;

class ValourForm extends React.Component{
    static propTypes = {
        formName: PropTypes.string.isRequired,        
        rules: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
        handleFormSubmission: PropTypes.func,
        preventDefaultSubmissionBehavior: PropTypes.bool,
        setValidationTypeForForm: PropTypes.oneOf(['onBlur', 'onChange'])
    }
    static defaultProps = {
        handleFormSubmission: noop,
        preventDefaultSubmissionBehavior: false
    }

    constructor(props) {
        super(props);
        this.mapChildren = this.mapChildren.bind(this); 
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.createValidationHandler = this.createValidationHandler.bind(this);

        valour.register(props.formName, props.rules);

        let form = valour.getForm(props.formName);
        var requiredFields = Object.keys(form).map(validationUnitKey => {
            return {
                fieldName: validationUnitKey,
                isRequired: form[validationUnitKey].hasIsRequired()
            }
        });

        this.state = {
            formValues: {},
            requiredFields,            
            validationsRun: [],
            validationMessages: {},
            formSubmissionAttempted: false
        }
    }

    componentWillUnmount() {
        clearTimeout(this.submissionTimer);
    }

    mapChildren() {
        const { children, formName, setValidationTypeForForm } = this.props;            
        const { validationsRun, requiredFields, formSubmissionAttempted, validationMessages } = this.state;

         return React.Children.map(children, child => {
            const { name, validateOnChange, validateOnBlur } = child.props;
            let validationResult, isRequiredField, validateOnSubmit;
            let foundRequiredField = find(requiredFields, field => field.fieldName === name);
            if (foundRequiredField) { isRequiredField = foundRequiredField.isRequired; }
            if (!validateOnChange && !validateOnBlur) { validateOnSubmit = true; }

            if (!validateOnSubmit || formSubmissionAttempted || setValidationTypeForForm) {
                if (includes(validationsRun, name) || (isRequiredField && formSubmissionAttempted)) {
                    validationResult = valour.getResult(formName)[name];
                }
                if (validateOnSubmit) {
                    if (validationMessages[name] && formSubmissionAttempted) {
                        validationResult = { valid: validationMessages[name].valid, 
                            messages: validationMessages[name].messages };  
                    }
                } 
            }

            return React.cloneElement(child, {
                validationResult,
                setValidationTypeForForm,
                handleValidationResultChange: this.createValidationHandler(name, formName)
            });
        }) 
    }

    createValidationHandler(name, formName) {
        return value => {
            const { formValues, validationsRun } = this.state;
            formValues[name] = value;

            valour.runValidation(formName, formValues);
            setTimeout(() => {
                const isFormValid = valour.isValid(formName);
                const newValidationsRun = includes(validationsRun, name) ? validationsRun : [...validationsRun, name];

                this.setState({ isFormValid, formValues, validationsRun: newValidationsRun });
            }, timer);
        }
    }

    handleOnSubmit(e) {
        const { formName, preventDefaultSubmissionBehavior, handleFormSubmission } = this.props;
        const { formValues } = this.state;
        const isFormValid = valour.isValid(formName);
        
        if (preventDefaultSubmissionBehavior || !isFormValid) { e.preventDefault(); }

        valour.forceValidation(formName, formValues);   
        this.submissionTimer = setTimeout(() => {
            if (isFormValid){
                handleFormSubmission(formValues);
            }
            else {
                let validationMessages = valour.getResult(formName);
                this.setState({ formSubmissionAttempted: true, validationMessages });
            }
        }, timer);
    }

    render() {
       return (
           <form onSubmit={ this.handleOnSubmit }>
                <Fieldset>  
                    { this.mapChildren() }
                </Fieldset>
            </form>
       );
    }
}
export default ValourForm;