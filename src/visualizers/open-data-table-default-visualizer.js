/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { OpenDataTableVisualizerController } from './open-data-table-visualizer-controller.js';

export class OpenDataTableDefaultVisualizer extends OpenDataTableVisualizerController(LitElement) {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .container[align="center"] {
                justify-content: center;
            }

            .container[align="right"] {
                justify-content: flex-end;
            }

            .label {
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .label[type="number"] {
                text-align: right;
            }

            .label[type="boolean"] {
                text-align: center;
            }

            .label[type="action"] {
                text-align: center;
                color: var(--open-data-table-action-color);
                text-transform: uppercase;
                font-weight: 500;
                cursor: pointer;
            }
        `];
    }

    static get properties() {
        return {
            row: {
                type: Object
            },

            column: {
                type: Object
            }
        }
    }

    constructor() {
        super();

        this.row = null;
        this.column = null;
    }

    render() {
        switch (this.column.type) {
            case 'action': {
                return html`<div class="label" type="${this.column.type}" @click="${this._onActionClick}">${this.column.actionLabel}</div>`;
            }

            case 'boolean': {
                return html`<div class="label" type="${this.column.type}">${this._format(this.value)}</div>`;
            }

            default: {
                return html`<div class="label" type="${this.column.type}">${this._format(this.value)}</div>`;
            }
        }
    }

    _format(value) {
        return this.column.formatter ? this.column.formatter(value) : value;
    }

    _onActionClick(e) {
        this.fireMessage('open-data-table-action', { column: this.column, row: this.row });
    }
}

window.customElements.define('open-data-table-default-visualizer', OpenDataTableDefaultVisualizer);
