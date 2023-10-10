class F8 {
   static component(newEl, { data = () => ({}), template }) {
      customElements.define(
         newEl,
         class extends HTMLElement {
            constructor() {
               super();
            }

            connectedCallback() {
               data = data();
               const templateEl = document.createElement("template");
               templateEl.innerHTML = template;
               const templateNodes = templateEl.content.cloneNode(true);

               // Replace {{ content }}
               Array.from(templateNodes.children).forEach((el) => {
                  const [altContent] = el.innerText.match(/{{.+?}}/g) || [];
                  const key = altContent?.match(/{{(.+?)}}/)[1].trim();
                  if (altContent && data.hasOwnProperty(key)) {
                     data[key] = document.createTextNode(data[key]);
                     if (altContent === el.innerText) {
                        el.innerText = "";
                        el.append(data[key]);
                     } else {
                        const nodesChildEl = el.innerText.split(altContent);
                        el.innerText = "";
                        nodesChildEl.forEach((node, index) => {
                           el.append(node);
                           if (index < nodesChildEl.length - 1) {
                              el.append(data[key]);
                           }
                        }); // End nodesChildEl.forEach((node, index)
                     }
                  } // End if (altContent && dataOj.hasOwnProperty(key))
               }); // Replace {{ content }} // End Array.from(templateNodes.children)

               // Define getter & setter
               Object.keys(data).forEach((key) => {
                  Object.defineProperty(window, key, {
                     get: () => data[key].data,
                     set: (value) => {
                        data[key].data = value;
                     },
                  });
               });

               // Add event
               Array.from(templateNodes.children).forEach((el) => {
                  Object.keys(el.attributes).forEach((atr) => {
                     const nameAtr = el.attributes[atr].nodeName;
                     const event =
                        nameAtr.includes("v-on:") &&
                        nameAtr.replace("v-on:", "");
                     event &&
                        el.addEventListener(event, function (event) {
                           const e = event;
                           const ev = event;
                           eval(el.attributes[atr].nodeValue);
                        });
                  });
               }); // Add event // End Array.from(templateNodes.children)

               this.append(templateNodes); // this: newEl
            } // End connectedCallback()
         } // End class extends HTMLElement
      ); // End customElements.define
   } // static component(newEl, { data, template })
}
