# &lt;multi-input&gt;

<br>

| View on GitHub: [github.com/samdutton/multi-input](https://github.com/samdutton/multi-input) |
| --- |
  
<br>

Custom element for selecting multiple items using an `input` and `datalist` to suggest options.

Delete items with Backspace or by tapping/clicking an item's × icon.
 
<br>

## Usage

1. Add [multi-input.js](https://glitch.com/edit/#!/multi-input?path=multi-input.js) to your project and link to it: 

    ```html
    <script src="multi-input.js"></script>
    ```

2. Wrap an `input` with a `datalist` in `<multi-input>` tags (see [index.html](https://glitch.com/edit/#!/multi-input?path=index.html:14:0) for an example): 

    ```html
    <multi-input>
      <input list="speakers">
      <datalist id="speakers">
        <option value="Banquo"></option>
        <option value="Celia"></option>
        ...
      </datalist>
    </multi-input>
    ```
 
3. Get selected values as an array with the `getValues()` method (see [script.js](https://glitch.com/edit/#!/multi-input?path=script.js:4:0)):

    ```js
    const getButton = document.getElementById('get');
    const multiInput = document.querySelector('multi-input'); 
    getButton.onclick = () => {
      console.log(multiInput.getValues());
    }
    ```
<br>

## Can I style the components?

Sure. 

There are several custom properties:

```
--multi-input-border
--multi-input-item-bg-color
--multi-input-item-border
--multi-input-item-font-size
--multi-input-input-font-size
```

Style components like this: 

``` css
multi-input {
  --multi-input-border: 2px solid red;
}
```

<br>

    
## Known issues

### Problems with shadow DOM CSS pseudo classes

Two selectors have been added outside the shadow DOM using a `multi-input` selector:

*  `::slotted(input)::-webkit-calendar-picker-indicator` doesn't work in any browser.
*  `::slotted(div.item)::after` doesn't work in Safari.

<br>

## My platform doesn't support custom elements :^|

Custom elements are [widely supported by modern browsers](https://caniuse.com/#search=custom%20elements).

However, `<multi-input>` simply wraps an `input` element that has a `datalist`, so behaviour will degrade gracefully to a 'normal' `datalist` experience in older browsers without custom element support.

<br>
    
## My platform doesn't support datalist :^|&nbsp;:^|

The `datalist` element is [supported by all modern browsers](https://caniuse.com/#feat=datalist).

If your target browser doesn't support `datalist`, behaviour will fall back to the plain old `input` experience.
  
<br>


## Obligatory screencast

<!-- <video src="https://cdn.glitch.com/dda744c5-58a9-4809-897c-68396377983a%2Fmulti-input.mp4?v=1560264823071" autoplay loop>
</video> -->

![Screencast showing Shakespeare character names being selected via a multi-input custom element](https://cdn.glitch.com/dda744c5-58a9-4809-897c-68396377983a%2Fmulti-input.gif?v=1560266060751)

<br>