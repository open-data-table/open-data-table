/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import './open-data-table-check.js';

export class OpenDataTableSelectorCell extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: var(--open-data-table-row-height);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0 8px;
            }
        `];
    }

    static get properties() {
        return {
            selected: {
                type: Boolean,
                attribute: 'selected'
            },

            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate'
            }
        }
    }

    constructor() {
        super();
        this.selected = false;
        this.indeterminate = false;
    }

    render() {
        return html`
            <div class="container" @open-data-table-row-selected="${this._onSelect}">
                <open-data-table-check ?selected="${this.selected}" ?indeterminate="${this.indeterminate}"></open-data-table-check>
            </div>
        `;
    }

    _onSelect(e) {
        this.selected = e.detail.selected;
    }
}

window.customElements.define('open-data-table-selector-cell', OpenDataTableSelectorCell);
