declare global {
  interface Object {
    pipe<T, R>(this: T, handler: (arg: T) => R): R;
  }

  // Extender HTMLElement para incluir el método on
  interface HTMLElement {
    on<K extends keyof HTMLElementEventMap>(
      this: HTMLElement,
      eventName: K,
      handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any
    ): void;
  }
}