/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { OpenDataTableVisualizerController } from './open-data-table-visualizer-controller.js';

export class OpenDataTableBooleanVisualizer extends OpenDataTableVisualizerController(LitElement) {
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
        `];
    }

    render() {
        const valueAlign = this.getParamValue('valueAlign', 'left');
        const trueValue = this.getParamValue('trueValue', 'true');
        const falseValue = this.getParamValue('falseValue', 'false');
        const icons = Boolean(this.getParamValue('icons', false));
        const iconSize = this.getParamValue('iconSize', '14px');
        const val = this.value ? trueValue : falseValue;
        const color = this.value ? (this.getParamValue('trueColor', 'rgba(0, 0, 0, 0.87)')) : (this.getParamValue('falseColor', 'rgba(0, 0, 0, 0.87)'))
        
        return html`
            <div class="container" align="${valueAlign}">
                ${icons ? this._renderIcon(this.value, iconSize, color) : html`
                    <div>${val}</div>
                `}
            </div>
        `;
    }

    _renderIcon(value, iconSize, color) {
        return (value) ?
            html`<svg class="icon" style="fill: ${color}; width: ${iconSize}; height: ${iconSize};" viewBox="0 0 24 24"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></g></svg>` :
            html`<svg class="icon" style="fill: ${color}; width: ${iconSize}; height: ${iconSize};" viewBox="0 0 24 24"><g id="cross"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g></svg>`;
    }
}

window.customElements.define('open-data-table-boolean-visualizer', OpenDataTableBooleanVisualizer);
