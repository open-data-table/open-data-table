/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { OpenDataTableVisualizerController } from './open-data-table-visualizer-controller.js';

export class OpenDataTableEnumVisualizer extends OpenDataTableVisualizerController(LitElement) {
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
                justify-content: flex-start;
                height: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .label {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                padding: 0 4px;
                text-align: left;
                box-sizing: border-box;
            }

            .container[align="center"], .label[align="center"] {
                justify-content: center;
            }

            .container[align="right"], .label[align="right"] {
                justify-content: flex-end;
            }
        `];
    }

    static get properties() {
        return {
            displayValue: {
                type: String
            }
        }
    }

    constructor() {
        super();
        this.displayValue = '';
    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            if ((propName === 'value') || (propName === 'params')) {
                if ((this.value !== undefined) && (this.value !== null) && (this.params) && (this.params.lookups)) {
                    const v = Number(this.value);

                    if ((v >= 0) && (v < this.params.lookups.length)) {
                        this.displayValue = this.params.lookups[v];
                    }
                }
            }
        });
    }

    render() {
        const valueAlign = this.getParamValue('valueAlign', 'left');
        const style = this.getStyles(this.value);

        return html`
            <div class="container" align="${valueAlign}">
                <div class="label" align="${valueAlign}" style="${style}">${this.displayValue}</div>
            </div>
        `;
    }
}

window.customElements.define('open-data-table-enum-visualizer', OpenDataTableEnumVisualizer);
