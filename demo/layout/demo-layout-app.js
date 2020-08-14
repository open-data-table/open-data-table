/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import '../../src/open-data-table-layout.js';

export class DemoLayoutApp extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            .container {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            open-data-table-layout {
                outline: 1px solid #E0E0E0;
                font-size: 13px;
                width: 1000px;
                height: 600px;
                box-sizing: border-box;

                /*--open-data-table-layout-background-color: var(--open-block-color, #ECECEC);*/

                --open-data-table-layout-grouper-color: white;
                --open-data-table-layout-grouper-background-color: #5c6bc0;

                --open-data-table-layout-header-fixed-left-color: inherit;
                --open-data-table-layout-header-fixed-left-background-color: #E0E0E0;

                --open-data-table-layout-header-scroll-color: inherit;
                --open-data-table-layout-header-scroll-background-color: #E0E0E0;

                --open-data-table-layout-header-fixed-right-color: inherit;
                --open-data-table-layout-header-fixed-right-background-color: #E0E0E0;

                --open-data-table-layout-body-fixed-left-color: inherit;
                --open-data-table-layout-body-fixed-left-background-color: #E0E0E0;

                --open-data-table-layout-body-scroll-color: inherit;
                --open-data-table-layout-body-scroll-background-color: inherit;

                --open-data-table-layout-body-fixed-right-color: inherit;
                --open-data-table-layout-body-fixed-right-background-color: #E0E0E0;

                --open-data-table-layout-footer-fixed-left-color: inherit;
                --open-data-table-layout-footer-fixed-left-background-color: #E0E0E0;

                --open-data-table-layout-footer-scroll-color: inherit;
                --open-data-table-layout-footer-scroll-background-color: #E0E0E0;

                --open-data-table-layout-footer-fixed-right-color: inherit;
                --open-data-table-layout-footer-fixed-right-background-color: #E0E0E0;

                --open-data-table-layout-pager-color: white;
                --open-data-table-layout-pager-background-color: #5c6bc0;

                --open-data-table-layout-header-action-left-background-color: lightyellow;
                --open-data-table-layout-body-action-left-background-color: lightyellow;
                --open-data-table-layout-footer-action-left-background-color: lightyellow;
                --open-data-table-layout-header-action-right-background-color: lightyellow;
                --open-data-table-layout-body-action-right-background-color: lightyellow;
                --open-data-table-layout-footer-action-right-background-color: lightyellow;

                
            }

            open-data-table-layout > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 8px 16px;
                box-sizing: border-box;
            }

            .part {
                box-sizing: border-box;
                white-space: nowrap;
            }

            .header-scroll, .header-fixed-left, .header-fixed-right, .header-action-left, .header-action-right,
            .footer-scroll, .footer-fixed-left, .footer-fixed-right, .footer-action-left, .footer-action-right {
                border-bottom: 1px solid silver;
            }

            .footer-scroll, .footer-fixed-left, .footer-fixed-right, .footer-action-left, .footer-action-right {
                border-top: 1px solid silver;
            }

            .header-fixed-left, .body-fixed-left, .footer-fixed-left, .header-action-left, .footer-action-left, 
            .body-action-left, .header-fixed-right, .footer-fixed-right, .body-fixed-right {
                border-right: 1px solid silver;
            }

            .header-fixed-right, .body-fixed-right, .footer-fixed-right {
                border-left: 1px solid silver;
            }

            .large-h {
                width: 2000px;
            }

            .large-v {
                height: 3000px;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <open-data-table-layout>
                    <div class="grouper part" slot="grouper">grouper</div>

                    <div class="header-action-left part" slot="header-action-left">header-action-left</div>  
                    <div class="body-action-left part large-v" slot="body-action-left">body-action-left</div> 
                    <div class="footer-action-left part" slot="footer-action-left">footer-action-left</div>

                    <div class="header-fixed-left part" slot="header-fixed-left">header-fixed-left</div>  
                    <div class="body-fixed-left part large-v" slot="body-fixed-left">body-fixed-left</div> 
                    <div class="footer-fixed-left part" slot="footer-fixed-left">footer-fixed-left</div>

                    <div class="header-scroll part large-h" slot="header-scroll">header-scroll</div>  
                    <div class="body-scroll part large-h large-v" slot="body-scroll">body-scroll</div> 
                    <div class="footer-scroll part large-h" slot="footer-scroll">footer-scroll</div>

                    <div class="header-fixed-right part" slot="header-fixed-right">header-fixed-right</div>
                    <div class="body-fixed-right part large-v" slot="body-fixed-right">body-fixed-right</div>
                    <div class="footer-fixed-right part" slot="footer-fixed-right">footer-fixed-right</div>

                    <div class="header-action-right part" slot="header-action-right">header-action-right</div>
                    <div class="body-action-right part large-v" slot="body-action-right">body-action-right</div>
                    <div class="footer-action-right part" slot="footer-action-right">footer-action-right</div>
                        
                    <div class="pager part" slot="pager">pager</div>
                </open-data-table-layout>
            </div>
        `;
    }
}

window.customElements.define('demo-layout-app', DemoLayoutApp);

