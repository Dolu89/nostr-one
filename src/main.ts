import { defineCustomElement } from 'vue';
import nostrOneCE from './components/nostr-one.ce.vue';

// Nostr one
const nostrOne = defineCustomElement(nostrOneCE);
customElements.define('nostr-one', nostrOne);

export { nostrOne };