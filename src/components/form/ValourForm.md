`ValourForm` is what handles matching it's child components to their `valour` rules and checking each child's validity.

Each `ValourForm` will require a unique `formName`
```
const Button = require('es-components').Button;

const rules = {
    ValourTextbox: valour.rule.isRequired(),
    ValourRadiogroup: valour.rule.isRequired(),
    ValourDropdown: valour.rule.isRequired()
};

const options = [{
  optionText: 'Meow!',
  optionValue: 'meow'
}, {
  optionText: 'Woof!',
  optionValue: 'woof'
}, {
  optionText: '*snake noises*',
  optionValue: 'snake-noises'
}];

<ValourForm 
    rules={rules} 
    formName="valourFormExample" 
    handleFormSubmission={noop} 
    preventDefaultSubmissionBehavior
>
    <ValourTextbox labelText="ValourTextbox" name="ValourTextbox" />
    <ValourRadioGroup radioOptions={options} name="ValourRadiogroup" />
    <ValourDropdown labelText="ValourDropdown" options={options} name="ValourDropdown" />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>
```
Inputs will require a `name` that matches it's associated `rule` key, but rules are not required for all inputs. Those without rules just will not validate.

Because it is a form, `ValourForm` is able to validate its inputs against each other. This is beneficial for, say, a password/confirm password form.
```
const Button = require('es-components').Button;

const rules = {
    Password: valour.rule.isRequired().isLength(5),
    ConfirmPassword: valour.rule.isRequired().equalsOther('Password')
};

<ValourForm 
    rules={rules} 
    formName="valourFormExampleTwo" 
    handleFormSubmission={noop} 
    formValidationType="onBlur"
    preventDefaultSubmissionBehavior
>
    <ValourTextbox labelText="Password" name="Password" successValidation />
    <ValourTextbox labelText="Confirm Password" name="ConfirmPassword" successValidation />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>
```

### Setting Validation Types:
You can set the validation type of all `valoured inputs` at once by using the `formValidationType` property at the form level and choosing either `onBlur` or `onChange`.  
By not using the `formValidationType` property, validation will only occur on submit by default unless the `validateOnBlur` and/or `validateOnChange` properties are put on the individual inputs.

```
const Button = require('es-components').Button;

const rules = {
    boxOne: valour.rule.isEmail(),
    boxTwo: valour.rule.isEmail(),
    blurBox: valour.rule.isEmail()
};

<ValourForm 
    rules={rules} 
    formName="valourFormExampleThree" 
    handleFormSubmission={noop} 
    formValidationType="onChange"
    preventDefaultSubmissionBehavior
>
    <ValourTextbox labelText="Textbox One" name="boxOne" />
    <ValourTextbox labelText="Textbox Two" name="boxTwo" />
    <ValourTextbox validateOnBlur labelText="ValidateOnBlur Box" name="blurBox" />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>
```
If you use the `formValidationType` form-level property and add a `validateOnBlur` or `validateOnChange` property to an input, it will cancel out the form-level validation for that input.

**Note:** `ValourForm` will always validate all inputs on submit.