/* eslint-disable no-unused-vars */
function addButton(campaignIndex = 0, buttonIndex = -1) {
  if (!this.indexes) {
    this.indexes = {};
    this.indexes[campaignIndex] = buttonIndex;
  } else if ((this.indexes[campaignIndex]) === undefined) {
    this.indexes[campaignIndex] = buttonIndex;
  }
  this.indexes[campaignIndex] += 1;
  const buttons = document.getElementById(`buttons_${campaignIndex}`);

  const button = document.createElement('div');
  button.id = `button_${campaignIndex}_${this.indexes[campaignIndex]}`;
  buttons.appendChild(button);

  let row = document.createElement('div');
  row.className += 'row';
  button.appendChild(row);

  let div = document.createElement('div');
  div.className += 'two columns';
  row.appendChild(div);

  const buttonLabel = document.createElement('label');
  buttonLabel.for = 'button';
  buttonLabel.appendChild(document.createTextNode('Button '));
  div.appendChild(buttonLabel);

  div = document.createElement('div');
  div.className += 'four columns';
  row.appendChild(div);

  const inputDeleteButton = document.createElement('input');
  inputDeleteButton.className += 'button u-full-width';
  inputDeleteButton.type = 'button';
  inputDeleteButton.onclick = () => button.remove();
  inputDeleteButton.value = 'Delete button';
  div.appendChild(inputDeleteButton);

  row = document.createElement('div');
  row.className += 'row';
  button.appendChild(row);

  div = document.createElement('div');
  div.className += 'three columns';
  row.appendChild(div);

  let buttonAttributeLabel = document.createElement('label');
  buttonAttributeLabel.for = 'button type';
  buttonAttributeLabel.appendChild(document.createTextNode('Button type'));
  div.appendChild(buttonAttributeLabel);

  const buttonTypeSelect = document.createElement('select');
  buttonTypeSelect.className += 'u-full-width';
  buttonTypeSelect.name = `campaigns[${campaignIndex}][buttons][${this.indexes[campaignIndex]}][type]`;
  buttonTypeSelect.type = 'text';
  div.appendChild(buttonTypeSelect);
  let type;
  ['quick_answer', 'link'].forEach((typeOption) => {
    type = document.createElement('option');
    type.value = typeOption;
    type.text = typeOption;
    buttonTypeSelect.appendChild(type);
  });

  div = document.createElement('div');
  div.className += 'three columns';
  row.appendChild(div);

  buttonAttributeLabel = document.createElement('label');
  buttonAttributeLabel.for = 'button tag';
  buttonAttributeLabel.appendChild(document.createTextNode('Button tag'));
  div.appendChild(buttonAttributeLabel);

  const buttonTagInput = document.createElement('input');
  buttonTagInput.className += 'u-full-width';
  buttonTagInput.type = 'text';
  buttonTagInput.name = `campaigns[${campaignIndex}][buttons][${this.indexes[campaignIndex]}][tag]`;
  buttonTagInput.required = true;
  buttonTagInput.placeholder = 'hello';
  div.appendChild(buttonTagInput);

  div = document.createElement('div');
  div.className += 'six columns';
  row.appendChild(div);

  buttonAttributeLabel = document.createElement('label');
  buttonAttributeLabel.for = 'button text';
  buttonAttributeLabel.appendChild(document.createTextNode('Button text'));
  div.appendChild(buttonAttributeLabel);

  const buttonTextarea = document.createElement('textarea');
  buttonTextarea.className += 'u-full-width';
  buttonTextarea.type = 'text';
  buttonTextarea.name = `campaigns[${campaignIndex}][buttons][${this.indexes[campaignIndex]}][text]`;
  buttonTextarea.required = true;
  buttonTextarea.placeholder = 'Hello, my dear friend!';
  buttonTextarea.style = 'resize: none';
  div.appendChild(buttonTextarea);
}

function rmElement(elementId) {
  const element = document.getElementById(elementId);
  element.remove();
}

function addCampaign(canals, i) {
  if (!this.index) {
    this.index = i;
  }
  this.index += 1;
  const { index } = this;

  const campaigns = document.getElementById('campaigns');

  const newCampaign = document.createElement('div');
  newCampaign.id = `campaign_${index}`;
  campaigns.appendChild(newCampaign);

  let row = document.createElement('div');
  row.className += 'row';
  newCampaign.appendChild(row);

  let div = document.createElement('div');
  div.className += 'two columns';
  row.appendChild(div);

  const campaignLabel = document.createElement('label');
  campaignLabel.for = 'campaign';
  campaignLabel.appendChild(document.createTextNode(`Campaign ${index + 1}`));
  div.appendChild(campaignLabel);

  div = document.createElement('div');
  div.className += 'four columns';
  row.appendChild(div);

  const inputDeleteCampaign = document.createElement('input');
  inputDeleteCampaign.className += 'button u-full-width';
  inputDeleteCampaign.type = 'button';
  inputDeleteCampaign.onclick = () => newCampaign.remove();
  inputDeleteCampaign.value = 'Delete campaign';
  div.appendChild(inputDeleteCampaign);

  row = document.createElement('div');
  row.className += 'row';
  newCampaign.appendChild(row);

  div = document.createElement('div');
  div.className += 'six columns';
  row.appendChild(div);

  let campaignAttributeLabel = document.createElement('label');
  campaignAttributeLabel.for = 'canal';
  campaignAttributeLabel.appendChild(document.createTextNode('Canal '));
  div.appendChild(campaignAttributeLabel);

  let campaignSelect = document.createElement('select');
  campaignSelect.className += 'u-full-width';
  campaignSelect.type = 'text';
  campaignSelect.name = `campaigns[${index}][canal]`;
  div.appendChild(campaignSelect);

  let selectOption;
  canals.forEach((canal) => {
    selectOption = document.createElement('option');
    selectOption.value = canal;
    selectOption.text = canal;
    campaignSelect.appendChild(selectOption);
  });

  div = document.createElement('div');
  div.className += 'six columns';
  row.appendChild(div);

  campaignAttributeLabel = document.createElement('label');
  campaignAttributeLabel.for = 'keyboard';
  campaignAttributeLabel.appendChild(document.createTextNode('Keyboard '));
  div.appendChild(campaignAttributeLabel);

  campaignSelect = document.createElement('select');
  campaignSelect.className += 'u-full-width';
  campaignSelect.type = 'text';
  campaignSelect.name = `campaigns[${index}][keyboard]`;
  div.appendChild(campaignSelect);

  ['inline', 'standard'].forEach((keyboard) => {
    selectOption = document.createElement('option');
    selectOption.value = keyboard;
    selectOption.text = keyboard;
    campaignSelect.appendChild(selectOption);
  });

  row = document.createElement('div');
  row.className += 'row';
  newCampaign.appendChild(row);

  campaignAttributeLabel = document.createElement('label');
  campaignAttributeLabel.for = 'message';
  campaignAttributeLabel.appendChild(document.createTextNode('Message '));
  row.appendChild(campaignAttributeLabel);

  const campaignTextArea = document.createElement('textarea');
  campaignTextArea.className += 'u-full-width';
  campaignTextArea.type = 'text';
  campaignTextArea.name = `campaigns[${index}][message]`;
  campaignTextArea.placeholder = 'Hello everyone';
  campaignTextArea.style = 'resize: vertical';
  row.appendChild(campaignTextArea);

  row = document.createElement('div');
  row.className += 'row';
  newCampaign.appendChild(row);

  div = document.createElement('div');
  div.className += 'two columns';
  row.appendChild(div);

  campaignAttributeLabel = document.createElement('label');
  campaignAttributeLabel.for = 'buttons';
  campaignAttributeLabel.appendChild(document.createTextNode('Buttons '));
  div.appendChild(campaignAttributeLabel);

  div = document.createElement('div');
  div.className += 'four columns';
  row.appendChild(div);

  const inputAddButton = document.createElement('input');
  inputAddButton.className += 'button u-full-width';
  inputAddButton.type = 'button';
  inputAddButton.onclick = () => addButton(index);
  inputAddButton.value = 'Add button';
  div.appendChild(inputAddButton);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = `buttons_${index}`;
  newCampaign.appendChild(buttonsDiv);
}
