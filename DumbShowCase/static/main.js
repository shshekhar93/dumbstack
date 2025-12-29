customElements.define('showcase-item',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('showcase-template');
      const templateContent = template.content;

      this.attachShadow({ mode: 'open' }).appendChild(
        document.importNode(templateContent, true)
      );
    }
  }
);

async function populateShowcase() {
  const response = await fetch('showcase.json');
  const showcaseData = await response.json();

  if(showcaseData.title) {
    document.getElementById('page-title').innerText = showcaseData.title;
  }
  
  if(Array.isArray(showcaseData.items)) {
    const container = document.getElementById('showcase-container');
    for(const itemData of showcaseData.items) {
      const itemElement = document.createElement('showcase-item');
      if(itemData.heading) {
        itemElement.appendChild(createElement('h2', 'showcase-heading', itemData.heading));
      }
      if(itemData.description) {
        itemElement.appendChild(createElement('p', 'showcase-description', itemData.description));
      }
      if(itemData.image) {
        itemElement.appendChild(createElement('img', 'showcase-image', null, {
          src: itemData.image,
          alt: 'Loading image...'
        }));
      }
      if(itemData.link) {
        const linkElem = createElement('a', 'showcase-button', 'Go to site', {href: itemData.link, target: '_blank'});
        itemElement.appendChild(linkElem);
      }
      container.appendChild(itemElement);
    }
  }
}

function createElement(tag, slot, content, additionalAttrs={}) {
  const elem = document.createElement(tag);
  if(slot) {
    elem.setAttribute('slot', slot);
    elem.classList.add(slot);
  }
  if(content) {
    elem.innerText = content;
  }
  for(const [attr, value] of Object.entries(additionalAttrs)) {
    elem.setAttribute(attr, value);
  }
  return elem;
}

populateShowcase();