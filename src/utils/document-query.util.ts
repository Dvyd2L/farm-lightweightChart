export const $ = <T extends HTMLElement>(
  selector: string,
  element: ParentNode = document
): T | null => element.querySelector(selector);

export const $$ = <T extends Element>(
  selector: string,
  element: ParentNode = document
): NodeListOf<T> | null => element.querySelectorAll(selector);

export const isElement = (element: any): element is Element =>
  element instanceof Element;

export const isNodeList = (nodeList: any): nodeList is NodeListOf<any> =>
  nodeList instanceof NodeList;

export const on = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement,
  eventName: K,
  handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
) => element.addEventListener(eventName, handler);

export const pipe = <T, R>(obj: T, handler: (arg: T) => R): R => handler(obj);

if (!('pipe' in Object.prototype)) {
  Object.defineProperty(Object.prototype, 'pipe', {
    value: function <T, R>(this: T, handler: (arg: T) => R): R {
      return handler(this);
    },
    enumerable: false,
    configurable: true,
  });
}

if (!('on' in HTMLElement.prototype)) {
  Object.defineProperty(HTMLElement.prototype, 'on', {
    value: function <K extends keyof HTMLElementEventMap>(
      this: HTMLElement,
      eventName: K,
      handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
    ): void {
      this.addEventListener(eventName, handler);
    },
    enumerable: false,
    configurable: true,
  });
}

const paco = {
  nombre: 'Paco',
};

const pacoFernandez = paco.pipe((x) => ({
  ...x,
  apellido: 'Fernández',
}));

const pacoFernandezBailen = pipe(paco, (x) => ({
  ...x,
  apellido: 'Fernández Bailén',
}));

console.log(paco, pacoFernandez, pacoFernandezBailen);
