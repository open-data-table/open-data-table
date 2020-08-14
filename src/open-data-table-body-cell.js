/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import './visualizers/open-data-table-visualizers.js';

export class OpenDataTableBodyCell extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                font-weight: 400;
                padding: 0 20px;
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
                justify-content: center;
                height: 100%;
            }

            .visualizer {
                height: 100%;
                width: 100%;
            }
        `];
    }

    static get properties() {
        return {
            value: {
                type: Object,
                attribute: 'value'
            },

            column: {
                type: Object
            },

            row: {
                type: Object
            }
        }
    }

    constructor() {
        super();
        this.value = null;
        this.column = null;
        this.row = null;
    }

    render() {
        return html`
            <div class="container">
                ${this._renderContent()}
            </div>
        `;
    }

    _renderContent() {
        if (this.column.renderer) {
            return this.column.renderer(this.value, this.column);
        }

        if (this.column.visualizer) {
            switch (this.column.visualizer.name) {
                /*
                case 'rating': {
                    return html`<open-data-table-rating-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-rating-visualizer>`;
                }

                

                case 'bar-chart': {
                    return html`<open-data-table-bar-chart-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-bar-chart-visualizer>`;
                }

                case 'line-chart': {
                    return html`<open-data-table-line-chart-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-line-chart-visualizer>`;
                }

                case 'enum': {
                    return html`<open-data-table-enum-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-enum-visualizer>`;
                }
                */

                case 'boolean': {
                    return html`<open-data-table-boolean-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-boolean-visualizer>`;
                }

                case 'percentage': {
                    return html`<open-data-table-percentage-visualizer class="visualizer" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-percentage-visualizer>`;
                }

                default: {
                    return html`<open-data-table-default-visualizer class="visualizer" .column="${this.column}" .row="${this.row}" .value="${this.value}" .params="${this.column.visualizer.params}"></open-data-table-default-visualizer>`;
                }
            }
        }

        return html`<open-data-table-default-visualizer class="visualizer" .column="${this.column}" .row="${this.row}" .value="${this.value}"></open-data-table-default-visualizer>`;
    }
}

window.customElements.define('open-data-table-body-cell', OpenDataTableBodyCell);