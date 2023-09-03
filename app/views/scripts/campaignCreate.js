const { canals } = require("../../models");

function addButton(index=0) {
  let buttons = document.getElementById(`buttons_${index}`);

  buttons.appendChild(document.createTextNode('Button: '));

  let buttonLi = document.createElement('li');
  buttons.appendChild(buttonLi);
  buttonLi.appendChild(document.createTextNode('Button type: '));

  let buttonTypeSelect = document.createElement('select');  
  buttonTypeSelect.name = 'buttons_' + index + '_type';
  buttonTypeSelect.type = 'text';
  buttonLi.appendChild(buttonTypeSelect);
  let type;
  ['quick_answer', 'link'].forEach((typeOption) => {
    type = document.createElement('option');
    type.value = typeOption;
    type.text = typeOption;
    buttonTypeSelect.appendChild(type);
  });

  buttonLi = document.createElement('li');
  buttons.appendChild(buttonLi);
  buttonLi.appendChild(document.createTextNode('Button text: '));

  let buttonTextInput = document.createElement('input');
  buttonTextInput.type = 'text';
  buttonTextInput.name = 'buttons_' + index + '_text';
  buttonTextInput.required = true;
  buttonTextInput.placeholder = 'button text';
  buttonLi.appendChild(buttonTextInput);

  buttonLi = document.createElement('li');
  buttons.appendChild(buttonLi);
  buttonLi.appendChild(document.createTextNode('Button tag: '));

  let buttonTagInput = document.createElement('input');
  buttonTagInput.type = 'text';
  buttonTagInput.name = 'buttons_' + index + '_tag';
  buttonTagInput.required = true;
  buttonTagInput.placeholder = 'button tag';
  buttonLi.appendChild(buttonTagInput);
  
}

function addCampaign(canals) {
  if (!this.index) {
    this.index = 0
  }
  this.index++;

  let campaigns = document.getElementById(`campaigns`);

  
  const newCampaign = document.createElement('li');
  newCampaign.name = `campaign_${this.index}`;
  newCampaign.text = `Campaign ${this.index}`;
  campaigns.appendChild(newCampaign);
  newCampaign.appendChild(document.createTextNode(`Campaign ${this.index+1}`));

  const newCampaignAttributes = document.createElement('ul');
  newCampaign.appendChild(newCampaignAttributes);

  const canalAttribute = document.createElement('li');

  newCampaignAttributes.appendChild(canalAttribute);
  canalAttribute.appendChild(document.createTextNode('Canal: '));

  const canalSelect = document.createElement('select');
  canalSelect.type = 'text';
  canalSelect.name = 'canal_' + this.index;
  canalAttribute.appendChild(canalSelect);

  let canalOption;
  console.log(canals);
  canals.forEach((canal) => {
    canalOption = document.createElement('option');
    canalOption.value = canal;
    canalOption.text = canal;
    canalSelect.appendChild(canalOption);
  });

  const messageAttribute = document.createElement('li');

  newCampaignAttributes.appendChild(messageAttribute);
  messageAttribute.appendChild(document.createTextNode('Message: '));

  const messageInput = document.createElement('input');
  messageInput.type = 'text';
  messageInput.placeholder = 'your message';
  messageInput.name = 'message_' + this.index;
  messageAttribute.appendChild(messageInput);

  const keyboardAttribute = document.createElement('li');

  newCampaignAttributes.appendChild(keyboardAttribute);
  keyboardAttribute.appendChild(document.createTextNode('Keyboard: '));

  const keyboardSelect = document.createElement('select');
  keyboardSelect.type = 'text';
  keyboardSelect.name = 'keyboard_' + this.index;
  keyboardAttribute.appendChild(keyboardSelect);

  let keyboardOption
  ['inline', 'standard'].forEach((keyboard) => {
    keyboardOption = document.createElement('option');
    keyboardOption.value = keyboard;
    keyboardOption.text = keyboard;
    keyboardSelect.appendChild(keyboardOption);
  });

  const buttonListAttribute = document.createElement('li');

  newCampaignAttributes.appendChild(buttonListAttribute);
  buttonListAttribute.appendChild(document.createTextNode('Buttons: '))

  const index = this.index;
  const addButtonButton = document.createElement('button');
  addButtonButton.class = 'btn btn-primary';
  addButtonButton.type = 'button';
  addButtonButton.innerHTML = 'Add button';
  addButtonButton.onclick = () => addButton(index);
  buttonListAttribute.appendChild(addButtonButton);

  const buttonsList = document.createElement('ul');
  buttonsList.id = 'buttons_' + this.index;
  buttonListAttribute.appendChild(buttonsList); 
}