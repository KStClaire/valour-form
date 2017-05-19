
ValourForm
===
#### The form validation component for use with [Valour](https://github.com/stevematney/valour) and [ES-Components](https://github.com/TWExchangeSolutions/es-components)
___


### Props
Name                             | Type   | Default  | Description
---------------------------------|:------:|:--------:|-------------
formName                         | string | Required | The name of the form 
rules                            | object | Required | All of the valour rules the form will use to validate 
children                         | node   | Required | The child elements in the form
handleFormSubmission             | func   | Function | The function to execute during a valid submit
preventDefaultSubmissionBehavior | bool   | false    | Call preventDefault() on submit 
setValidationTypeForForm	     | enum   |          | You can set the validation type for all fields in the form <br> One of: _onChange, onBlur_


### Usage:
___
###### import { ValourForm } from 'valour-form';
```javascript
//Create an object with your desired Valour rules
const rules = {
    Email: valour.rule.isRequired().isEmail()
}

<ValourForm rules={rules} formName="exampleForm" handleFormSubmission={this.doThisOnValidSubmit} >
    //The input name needs to match the rule key in order to validate it
    <ValourTextbox labelText="Email:" name="Email" />
    <Button>Submit</Button>
</ValourForm>
```
**Note:** It's not required to have a rule for every input. Inputs without rules will just not validate.

### Setting Validation Types:
You can set the validation type of all [Valoured inputs](./src/components) at once by using the `setValidationTypeForForm` property at the form level and choosing either `onBlur` or `onChange`.  
By not using the `setValidationTypeForForm` property, validation will only occur on submit by default unless you put the `validateOnBlur` and/or `validateOnChange` properties on the individual inputs.
```javascript
<ValourForm rules={rules} 
    formName="exampleForm" 
    handleFormSubmission={this.doThisOnValidSubmit} 
    setValidationTypeForForm="onChange"
>
    <ValourTextbox labelText="Textbox" name="Text" />
    <ValourTextbox labelText="Textbox Two" name="TextboxTwo" />
```
If you use the `setValidationTypeForForm` form-level property and add a `validateOnBlur` or `validateOnChange` property to an input, it will cancel out the form-level validation for that input.
```javascript
    //This textbox will validate onblur instead of onchange like the other inputs
    <ValourTextbox validateOnBlur labelText="Another Box" name="LastBox" />
    <Button>Submit</Button>
</ValourForm>
```

___

Components Used With ValourForm:
===

## ValourTextbox

### Props
Name                             | Type   | Default  | Description
---------------------------------|:------:|:--------:|-------------
name                             | string | Required | Used to match the validation rule to the input
labelText                        | string | Required | The label text for the input
validateOnBlur                   | bool   | false    | Validates after the text box loses focus
validateOnChange                 | bool   | false    | Validates after the text box value changes
successValidation                | bool   | false    | Uses the green success coloring when input is valid

**Note:** Form will always validate all inputs on submit.

### Usage:
___
###### import { ValourTextbox } from 'valour-form';
```javascript
<ValourTextbox labelText="Textbox" name="Text"/>

//highlights the text box and label text with the green success coloring when it's rule requirements are met
<ValourTextbox successValidation labelText="Success Coloring Box" name="GreenBox"/>
```

ValourTextbox can still use the `handleOnChange`, `handleFocusLost`, and any other props on [es-components](https://github.com/TWExchangeSolutions/es-components)'s Textbox.
```javascript
<ValourTextbox validateOnChange handleFocusLost={this.handleBlur} labelText="Textbox" name="Text"/>

<ValourTextbox validateOnBlur handleOnChange={this.handleChange} labelText="Textbox Two" name="TextTwo"/>
```

If, for some reason, you want to validate on blur and on change both, you will have to add the `validateOnBlur` and `validateOnChange` properties to the individual input.
```javascript
//This input with validate both on change and blur, but the validation on blur won't be very noticable!
<ValourTextbox validateOnBlur validateOnChange labelText="Another Box" name="LastBox" />
```
