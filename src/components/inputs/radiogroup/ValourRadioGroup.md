
```
const Button = require('es-components').Button;

const rules={
    radiogroup: valour.rule.equals("meow")
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
    formName="radioGroupForm"
    handleFormSubmission={noop}
    preventDefaultSubmissionBehavior
>
    <ValourRadioGroup legendText="Validate OnBlur" radioOptions={options} name="radiogroup" validateOnBlur />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>

```

```
const Button = require('es-components').Button;

const rules = {
    radiogrouptwo: valour.rule.equals("meow")
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
    formName="radioGroupFormTwo"
    handleFormSubmission={noop}
    preventDefaultSubmissionBehavior
>
    <ValourRadioGroup legendText="Validate OnChange" radioOptions={options} name="radiogrouptwo" validateOnChange />
    <Button handleOnClick={noop}>Submit</Button>
</ValourForm>

```