/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { OpenDataTableVisualizerController } from './open-data-table-visualizer-controller.js';

export class OpenDataTablePercentageVisualizer extends OpenDataTableVisualizerController(LitElement) {
    static get styles() {
        return [css`
            :host {
                --percentage-visualizer-selected-color: #5c6bc0;
                --percentage-visualizer-unselected-color:  #FFFFFF;
                display: block;
                overflow: hidden;
                width: 100%;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                position: relative;
                padding: 0;
                margin: 6px 0;
                width: 100%;
                height: 20px;
                box-sizing: border-box;
                background: var(--percentage-visualizer-unselected-color, #FFFFFF);
                border: 1px solid var(--percentage-visualizer-selected-color, #5c6bc0);
            }

            .bar {
                position: relative;
                height: 100%;
                background: var(--percentage-visualizer-selected-color, #5c6bc0);
            }

            .label {
                position: absolute;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-size: 11px;
                font-weight: 500;
            }
        `];
    }

    render() {
        let style = this.getBaseStyle();
        style = style.replace('bar-color', '--percentage-visualizer-selected-color');
        style = style.replace('bar-background', '--percentage-visualizer-unselected-color');


        const val = `${Math.min(Math.max(this.value, 0), 100)}%`
        const barStyle = `width: ${val};`;
        
        const labelStyle = `
            background: linear-gradient(90deg, var(--percentage-visualizer-unselected-color, #FFFFFF) 0%, var(--percentage-visualizer-unselected-color, #FFFFFF) ${val}, var(--percentage-visualizer-selected-color, #5c6bc0) ${val}, var(--percentage-visualizer-selected-color, #5c6bc0) 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        `;

        return html`
            <div class="container" style="${style}">
                <div class="bar" style="${barStyle}"></div>
                <div class="label" style="${labelStyle}">${val}</div>
            </div>
        `;
    }

    /*
    render() {
        //const minWidth = this.getParamValue('minWidth', 'auto');
        //const style = `min-width: ${minWidth};`;
        let style = this.getBaseStyle();
        style = style.replace('bar-color', '--obap-percentage-sparkline-selected-color');

        return html`
            <div class="container">
                <obap-percentage-sparkline .value="${this.value}" style="${style}"></obap-percentage-sparkline>
            </div>
        `;
    }
    */
}

window.customElements.define('open-data-table-percentage-visualizer', OpenDataTablePercentageVisualizer);
