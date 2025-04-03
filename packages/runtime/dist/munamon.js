import { h } from 'h.js';

console.log(h('form', { class: 'login-form', action:'login'}, [
    h('input', { type: 'text', name:'user'}),
    h('input', { type: 'password', name:'pass'}),
    h('button', { on: { click: 'login'}}, ['Log in'])
]));
