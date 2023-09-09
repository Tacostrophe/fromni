const { canals } = require("../../models");

function addButton(index=0) {
  let buttons = document.getElementById(`buttons_${index}`);

  let buttonLabel = document.createElement('label');
  buttonLabel.for = 'button';
  buttons.appendChild(buttonLabel);

  let span = document.createElement('span');
  span.appendChild(document.createTextNode('Button '));
  buttonLabel.appendChild(span);

  const deleteButtonButton = document.createElement('button');
  deleteButtonButton.className += 'btn';
  deleteButtonButton.type = 'button';
  deleteButtonButton.innerHTML = 'Delete button';
  deleteButtonButton.onclick = () => buttonLabel.remove();
  buttonLabel.appendChild(deleteButtonButton);

  let buttonAttributeLabel = document.createElement('label');
  buttonAttributeLabel.for = 'button type';
  buttonLabel.appendChild(buttonAttributeLabel);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Type '));
  buttonAttributeLabel.appendChild(span);

  let buttonTypeSelect = document.createElement('select');
  buttonTypeSelect.className += 'select-field';
  buttonTypeSelect.name = 'buttons_' + index + '_type';
  buttonTypeSelect.type = 'text';
  buttonAttributeLabel.appendChild(buttonTypeSelect);
  let type;
  ['quick_answer', 'link'].forEach((typeOption) => {
    type = document.createElement('option');
    type.value = typeOption;
    type.text = typeOption;
    buttonTypeSelect.appendChild(type);
  });

  buttonAttributeLabel = document.createElement('label');
  buttonAttributeLabel.for = 'button text';
  buttonLabel.appendChild(buttonAttributeLabel);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Text '));
  buttonAttributeLabel.appendChild(span);

  let spanRequired = document.createElement('span');
  spanRequired.className += 'required';
  spanRequired.appendChild(document.createTextNode('*'));
  span.appendChild(spanRequired);

  let buttonTextarea = document.createElement('textarea');
  buttonTextarea.type = 'text';
  buttonTextarea.name = 'buttons_' + index + '_text';
  buttonTextarea.required = true;
  buttonTextarea.className += 'textarea-field';
  buttonAttributeLabel.appendChild(buttonTextarea);

  buttonAttributeLabel = document.createElement('label');
  buttonAttributeLabel.for = 'button tag';
  buttonLabel.appendChild(buttonAttributeLabel);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Tag '));
  buttonAttributeLabel.appendChild(span);

  spanRequired = document.createElement('span');
  spanRequired.className += 'required';
  spanRequired.appendChild(document.createTextNode('*'));
  span.appendChild(spanRequired);

  let buttonTagInput = document.createElement('input');
  buttonTagInput.type = 'text';
  buttonTagInput.name = 'buttons_' + index + '_tag';
  buttonTagInput.required = true;
  buttonTagInput.className += 'input-field';
  buttonAttributeLabel.appendChild(buttonTagInput);
  
}

function rmElement(elementId) {
  const element = document.getElementById(elementId);
  element.remove();
}

function addCampaign(canals, i) {
  if (!this.index) {
    this.index = i
  }
  this.index++;

  let campaigns = document.getElementById(`campaigns`);

  const newCampaign = document.createElement('label');
  newCampaign.id = 'campaign_' + this.index;
  campaigns.appendChild(newCampaign);

  let span = document.createElement('span');
  span.className += 'prm';
  span.appendChild(document.createTextNode(`Campaign ${this.index + 1}`))
  newCampaign.appendChild(span);

  const deleteCampaignButton = document.createElement('button');
  deleteCampaignButton.className += 'btn';
  deleteCampaignButton.type = 'button';
  deleteCampaignButton.innerHTML = 'Delete campaign';
  deleteCampaignButton.onclick = () => newCampaign.remove();
  newCampaign.appendChild(deleteCampaignButton);

  let label = document.createElement('label');
  label.for = 'canal';
  newCampaign.appendChild(label);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Canal '));
  label.appendChild(span);

  const canalSelect = document.createElement('select');
  canalSelect.type = 'text';
  canalSelect.name = 'canal_' + this.index;
  canalSelect.className += 'select-field';
  label.appendChild(canalSelect);

  let canalOption;
  canals.forEach((canal) => {
    canalOption = document.createElement('option');
    canalOption.value = canal;
    canalOption.text = canal;
    canalSelect.appendChild(canalOption);
  });

  label = document.createElement('label');
  label.for = 'message';
  newCampaign.appendChild(label);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Message '));
  label.appendChild(span);

  const messageTextarea = document.createElement('textarea');
  messageTextarea.type = 'text';
  messageTextarea.name = 'message_' + this.index;
  messageTextarea.className = 'textarea-field';
  label.appendChild(messageTextarea);

  label = document.createElement('label');
  label.for = 'keyboard';
  newCampaign.appendChild(label);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Keyboard '));
  label.appendChild(span);

  const keyboardSelect = document.createElement('select');
  keyboardSelect.type = 'text';
  keyboardSelect.name = 'keyboard_' + this.index;
  keyboardSelect.className = 'select-field';
  label.appendChild(keyboardSelect);

  let keyboardOption
  ['inline', 'standard'].forEach((keyboard) => {
    keyboardOption = document.createElement('option');
    keyboardOption.value = keyboard;
    keyboardOption.text = keyboard;
    keyboardSelect.appendChild(keyboardOption);
  });

  label = document.createElement('label');
  label.for = 'buttons';
  newCampaign.appendChild(label);

  span = document.createElement('span');
  span.appendChild(document.createTextNode('Buttons '));
  label.appendChild(span);

  const index = this.index;

  const addButtonButton = document.createElement('button');
  addButtonButton.className += 'btn';
  addButtonButton.type = 'button';
  addButtonButton.innerHTML = 'Add button';
  addButtonButton.onclick = () => addButton(index);
  label.appendChild(addButtonButton);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = 'buttons_' + this.index;
  buttonsDiv.className = 'buttons';
  label.appendChild(buttonsDiv); 
}