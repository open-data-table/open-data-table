/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/ 
import { html, css, LitElement } from 'lit-element';

export class OpenDataTableGroupHeaderCell extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                font-weight: 500;
                user-select: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                align-items: stretch;
                width: 100%;
                height: 100%;
            }

            .label {
                flex: 1;
                text-align: left;
                margin: 0 20px;
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String,
                attribute: 'label'
            }
        }
    }

    constructor() {
        super();
        this.label = '';
    }

    render() {
        return html`
            <div class="container">
                <div class="label">${this.label}</div>
            </div>
        `;
    }
}

window.customElements.define('open-data-table-group-header-cell', OpenDataTableGroupHeaderCell);
