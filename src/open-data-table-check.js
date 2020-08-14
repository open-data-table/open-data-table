/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';

export class OpenDataTableCheck extends LitElement {
    static get styles() {
        return [css`
            :host {
                --open-data-table-check-selected-color: #5c6bc0;
                --open-data-table-check-indeterminate-color: #5c6bc0;
                --open-data-table-check-unselected-color: rgba(0, 0, 0, 0.54);
                --open-data-table-check-disabled-color: rgba(0, 0, 0, 0.38);
                --open-data-table-check-ripple-color: rgba(0, 0, 0, 0.38);
                display: inline-block;
                outline: 0;
            }

            :host([hidden]) {
                display: none !important;
            }

            :host([disabled]) {
                pointer-events: none;
                color: var(--open-data-table-check-disabled-color) !important;
            }
        
            :host([selected]) .check-container, :host([indeterminate]) .check-container {
                background: var(--open-data-table-check-selected-color);
                border: 2px solid var(--open-data-table-check-selected-color);
            }

            :host([disabled]) .check-container {
                border: 2px solid var(--open-data-table-check-disabled-color);
            }

            :host([disabled][selected]) .check-container, :host([disabled][indeterminate]) .check-container {
                border: 2px solid transparent;
                background: var(--open-data-table-check-disabled-color);
            }

            .container {
                display: flex;
                flex-direction: row;
                align-items: center;
                cursor: pointer;
            }
            
            .check-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                user-select: none;
                height: 12px;
                width: 12px;
                border-radius: 2px;
                background: white;
                border: 2px solid var(--open-data-table-check-unselected-color);
            }

            .label {
                margin-left: 8px;
            }

            .check {
                user-select: none;
                fill: white;
                stroke: white;
                height: 12px;
                width: 12px;
            }
        `];
    }

    static get properties() {
        return {
            selected: {
                type: Boolean,
                attribute: 'selected',
                reflect: true
            },

            indeterminate: {
                type: Boolean,
                attribute: 'indeterminate',
                reflect: true
            }
        };
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        const oldValue = this.selected;

        if (oldValue !== value) {
            this._selected = value;
            this.requestUpdate('selected', oldValue);
            this.fireMessage('open-data-table-row-selected', {
                selected: this._selected
            });
        }
    }

    constructor() {
        super();
        this._selected = false;
        this.indeterminate = false;
    }

    render() {
        return html`
            <div class="container" @click="${this._clickHandler}">
                <div class="check-container">
                ${this._getCheck()}
                </div>
            </div>
        `;
    }

    fireMessage(name, detail, cancelable) {
        const event = new CustomEvent(name, {
            bubbles: true,
            composed: true,
            cancelable: cancelable,
            detail: detail
        });

        return this.dispatchEvent(event);
    }

    _getCheck() {
        if (this.indeterminate) {
            return html`<svg class="check" viewBox="0 0 24 24"><g><path d="M19 13H5v-2h14v2z"/></g></svg>`;
        }
        else if (this.selected) {
            return html`<svg class="check" viewBox="0 0 24 24"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></g></svg>`;
        } else {
            return null;
        }
    }

    _clickHandler(e) {
        this.selected = !this.selected;

        if (this.selected) {
            this.indeterminate = false;
        }

        this.hasFocus = false;
        e.preventDefault();
        e.stopPropagation();
    }
}

window.customElements.define('open-data-table-check', OpenDataTableCheck);
