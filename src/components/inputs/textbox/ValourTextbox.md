
```
const Button = require('es-components').Button;

const rules={
    email: valour.rule.isRequired().isEmail("You must enter a valid email address")
};

<ValourForm 
    rules={rules} 
    formName="textboxForm"
    handleFormSubmission={noop} 
    preventDefaultSubmissionBehavior
>
    <ValourTextbox labelText="Validate OnBlur" name="email" validateOnBlur />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>
```

```
const Button = require('es-components').Button;

const rules={
    email: valour.rule.isRequired().isEmail("You must enter a valid email address")
};

<ValourForm 
    rules={rules} 
    formName="textboxFormThree"
    handleFormSubmission={noop} 
    preventDefaultSubmissionBehavior
>
    <ValourTextbox labelText="Validate OnChange" name="email" validateOnChange />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>
```

Add the `successValidation` prop to get es-components' green 'success' coloring when the input is valid.

```
const Button = require('es-components').Button;

const rules={
    email: valour.rule.isRequired().isEmail("You must enter a valid email address")
};

<ValourForm 
    rules={rules} 
    formName="textboxFormFour"
    handleFormSubmission={noop} 
    preventDefaultSubmissionBehavior
>
    <ValourTextbox labelText="Success Validation" name="email" validateOnChange successValidation />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>
```