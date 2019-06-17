

class MultiInput extends HTMLElement {
  
  constructor() {
  super();
    
  // slotted(input)::-webkit-calendar-picker-indicator doesn't work in any browser.
  // ::slotted() selector for ::after doesn't work in Safari.
  this.innerHTML += 
    `<style>
      multi-input input::-webkit-calendar-picker-indicator {
      display: none;
    }
      multi-input div.item::after {
        color: black;
        content: '×'; 
        cursor: pointer;
        font-size: 18px;
        pointer-events: auto;
        position: absolute;
        right: 5px;
        top: -1px;
      }

    </style>`;
  this._shadowRoot = this.attachShadow({mode: 'open'});
  this._shadowRoot.innerHTML =
    `<style>
      :host {
        border: var(--multi-input-border, 1px solid #ddd); 
        display: block;
        padding: 5px;
      }
      ::slotted(div.item) {
        background-color: var(--multi-input-item-bg-color, #dedede);
        border: var(--multi-input-item-border, 1px solid #ccc);
        border-radius: 2px;
        color: #222;
        display: inline-block;
        font-size: var(--multi-input-item-font-size, 14px);
        margin: 5px;
        padding: 2px 25px 2px 5px;
        pointer-events: none;
        position: relative;
        top: -1px;
      }
      /* NB pointer-events: none above */
      ::slotted(div.item:hover) {
        background-color: #eee;
        color: black;  
      }
      /* This doesn't work in Safari — added above */
      /* 
      ::slotted(div.item)::after {
        color: black;
        content: '×'; 
        cursor: pointer;
        font-size: 18px;
        pointer-events: auto;
        position: absolute;
        right: 5px;
        top: -1px;
      } */
      ::slotted(input) {
        border: none;
        font-size: var(--multi-input-input-font-size, 16px);
        max-width: calc(100% - 20px);
        min-width: calc(50% - 20px);
        outline: none;
        padding: 10px 10px 10px 5px; 
      }
      /* Code below doesn't work: see above */
      /* slotted(input)::-webkit-calendar-picker-indicator {
            display: none;
      } */
    </style>
    <slot></slot>`;
    
    
  
    this._datalist = this.querySelector('datalist'); 
    this._allowedValues = [];
    for (const option of this._datalist.options) {
      this._allowedValues.push(option.value);
    }
    
    this._input = this.querySelector('input');
    this._input.onblur = this._handleBlur;
    this._input.oninput = this._handleInput.bind(this);
    this._input.onkeydown = this._handleKeydown;
  }

  _addItem(value) {
    const item = document.createElement('div');
    item.classList.add('item');
    item.textContent = value;
    this.insertBefore(item, this._input);
    item.onclick = this._deleteItem;  
  }

  _deleteItem() {
    this.parentNode.removeChild(this); 
  }

  // To avoid stray text in input that's not in a div.item.
  _handleBlur() {
    this.value = '';
  }

  // this is bound as the custom element (i.e. this multi-input element)
  _handleInput(event) {
    const value = event.target.value;
    // Avoid non-datalist items being selected when input loses focus
    if (this._allowedValues.includes(value) && 
        !this.getValues().includes(value)) {
      this._addItem(value);
      event.target.value = '';
    }
  }

  // Delete previous item on Backspace.
  _handleKeydown(event) {
    const previousItem = event.target.previousSibling;  
    if (event.key === "Backspace" && previousItem) {
      event.target.parentNode.removeChild(previousItem);
    }
  } 

  getValues() {
    let values = [];
    const items = this.querySelectorAll('.item'); 
    for (const item of items) {
      values.push(item.textContent);
    }
    return values; 
  }
}

window.customElements.define('multi-input', MultiInput);
