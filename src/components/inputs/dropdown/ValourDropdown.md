
```
const Button = require('es-components').Button;

const rules={
    dropdown: valour.rule.equals("meow")
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
    formName="dropdownForm"
    handleFormSubmission={noop}
    preventDefaultSubmissionBehavior
>
    <ValourDropdown labelText="Validate OnBlur" options={options} name="dropdown" validateOnBlur />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>

```

```
const Button = require('es-components').Button;

const rules={
    dropdown: valour.rule.equals("meow")
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
    formName="dropdownFormTwo"
    handleFormSubmission={noop}
    preventDefaultSubmissionBehavior
>
    <ValourDropdown labelText="Validate OnChange" options={options} name="dropdown" validateOnChange />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>

```

Add the `successValidation` prop to get es-components' green 'success' coloring when the input is valid.
```
const Button = require('es-components').Button;

const rules={
    dropdown: valour.rule.equals("meow")
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
    formName="dropdownFormThree"
    handleFormSubmission={noop}
    preventDefaultSubmissionBehavior
>
    <ValourDropdown labelText="Success Validation" options={options} name="dropdown" validateOnChange successValidation />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>

```