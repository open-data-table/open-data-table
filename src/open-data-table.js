/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { OpenDataTableController } from './open-data-table-controller.js';
import './open-data-table-layout.js';

import './open-data-table-header-cell.js';
import './open-data-table-body-cell.js';
import './open-data-table-selector-cell.js';
import './open-data-table-action-cell.js';


/*
*/
export class OpenDataTable extends OpenDataTableController(LitElement) {
    static get styles() {
        return [css`
            :host {
                --open-data-table-background-color: #FFFFFF;
                --open-data-table-hover-background-color: #F1F1F1;
                --open-data-table-fixed-background-color: #F1F1F1;
                --open-data-table-action-color: #5c6bc0;
                --open-data-table-disabled-action-color: rgba(0, 0, 0, 0.38);
                --open-data-table-true-color: rgba(0, 0, 0, 0.87);
                --open-data-table-false-color: rgba(0, 0, 0, 0.87);
                --open-data-table-row-height: 32px;
                display: block;
                font-size: 13px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            open-data-table-layout {
                --open-data-table-layout-header-action-left-border-width: 0 1px 1px 0;
                --open-data-table-layout-header-fixed-left-border-width: 0 1px 1px 0;
                --open-data-table-layout-header-scroll-border-width: 0 0 1px 0;
                --open-data-table-layout-header-fixed-right-border-width: 0 1px 1px 1px;
                --open-data-table-layout-header-action-right-border-width: 0 0 1px 0;

                --open-data-table-layout-body-action-left-border-width: 0 1px 0 0;
                --open-data-table-layout-body-fixed-left-border-width: 0 1px 0 0;
                --open-data-table-layout-body-scroll-border-width: 0 0 0 0;
                --open-data-table-layout-body-fixed-right-border-width: 0 1px 0 1px;
                --open-data-table-layout-body-action-right-border-width: 0 0 0 0;

                /*--open-data-table-layout-footer-action-left-border-width: 0 1px 0 0;*/
                /*--open-data-table-layout-footer-fixed-left-border-width: 0 0 1px 0;*/
                /*--open-data-table-layout-footer-scroll-border-width: 0 0 1px 0;*/
                /*--open-data-table-layout-footer-fixed-right-border-width: 0 1px 0 1px;*/
                /*--open-data-table-layout-footer-action-right-border-width: 0 1px 0 1px;*/
                
                --open-data-table-layout-background-color: var(--open-data-table-fixed-background-color);

                --open-data-table-layout-header-action-left-color: inherit;
                --open-data-table-layout-header-fixed-left-color: inherit;
                --open-data-table-layout-header-action-left-background-color: var(--open-data-table-fixed-background-color);

                --open-data-table-layout-body-action-left-color: inherit;
                --open-data-table-layout-body-fixed-left-color: inherit;
                --open-data-table-layout-body-action-left-background-color: var(--open-data-table-fixed-background-color);

                --open-data-table-layout-header-scroll-color: inherit;
                --open-data-table-layout-header-scroll-background-color: var(--open-data-table-fixed-background-color);

                --open-data-table-layout-body-scroll-color: inherit;
                --open-data-table-layout-body-scroll-background-color: var(--open-data-table-background-color);
                --open-data-table-layout-body-scroll-background-color: transparent;
                
                height: 100%;
            }

            open-data-table-body-cell {
                height: var(--open-data-table-row-height);
            }

            table {
                border-spacing: 0; 
                color: rgba(0, 0, 0, 0.87);
            }

            tr {
                height: var(--open-data-table-row-height);
                min-height: var(--open-data-table-row-height);
                max-height: var(--open-data-table-row-height);
                line-height: var(--open-data-table-row-height);
            }

            tr[collapsed] {
                height: 0;
                line-height: 0 !important;
                visibility: hidden;
            }

            th, td {
                padding: 0;
                box-sizing: border-box;
            }

            .header-row {
                background: var(--open-data-table-fixed-background-color);
            }

            .body-scroll-row {
                background: var(--open-data-table-background-color);
            }

            .body-scroll-row:hover {
                background: var(--open-data-table-hover-background-color);
            }

            td {
                border-bottom: 1px solid rgba(0, 0, 0, 0.20);
            }

            .table-action-right {
                border-right: 1px solid var(--open-data-table-layout-border-color);
            }

            .action-spacer {
                width: 32px;
                height: calc(var(--open-data-table-row-height) + 1px);
            }

            tr:last-of-type > td {
                border-bottom: none;
            }
        `];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    render() {
        return html`
            <open-data-table-layout class="typography-body" @open-data-table-row-selected="${this._rowCheck}" @open-data-table-layout-size-changed="${() => requestAnimationFrame(() => this._resizeHeaderCells())}">
                ${this._renderLeftActions()}

                ${this.fixedColumnsLeft.length > 0 ? html`
                    <div class="header-fixed-left" slot="header-fixed-left">
                        ${this._renderDataHeader(true, 'header-fixed-left-row', this.fixedColumnsLeft)}
                    </div>

                    <div class="body-fixed-left" slot="body-fixed-left">
                        ${this._renderDataHeader(false, 'header-fixed-left-row', this.fixedColumnsLeft)}
                        ${this._renderDataBody('body-fixed-left-row', this.fixedColumnsLeft)}
                    </div>
                ` : null}

                <div class="header-scroll" slot="header-scroll">
                    <table>
                        ${this._renderDataHeader(true, 'header-scroll-row', this.scrollColumns)}
                    </table>
                </div>

                <div class="body-scroll" slot="body-scroll">
                    <table>
                        ${this._renderDataHeader(false, 'header-scroll-row', this.scrollColumns)}
                        ${this._renderDataBody('body-scroll-row', this.scrollColumns)}
                    </table>
                </div>

                ${this.fixedColumnsRight.length > 0 ? html`
                    <div class="header-fixed-right" slot="header-fixed-right">
                        ${this._renderDataHeader(true, 'header-fixed-right-row', this.fixedColumnsRight)}
                    </div>

                    <div class="body-fixed-right" slot="body-fixed-right">
                        ${this._renderDataHeader(false, 'header-fixed-right-row', this.fixedColumnsRight)}
                        ${this._renderDataBody('body-fixed-right-row', this.fixedColumnsRight)}
                    </div>
                ` : null}

                ${this._renderRightActions()}
            </open-data-table-layout>
        `;
    }

    _renderRightActions() {
        const hasColumnActions = (this.columnActions && this.columnActions.length > 0);
        const hasRowActions = (this.rowActions && this.rowActions.length > 0);

        if (hasColumnActions || hasRowActions) {
            return html`
                <div slot="header-action-right">
                    <table class="table-action-right">
                        ${this._renderActionRightHeader(hasColumnActions)}
                    </table>
                </div>  

                <div slot="body-action-right">
                    <table class="table-action-right">
                        ${this._renderActionRightBody(hasRowActions)}
                    </table>
                </div>
            `;
        }
        return null;
    }

    _renderActionRightHeader(show) {
        return html`
            <thead>
                <tr>
                    ${show ? html`
                        <th>
                            <open-data-table-action-cell .actions="${this.columnActions}"></open-data-table-action-cell>
                        </th>
                    ` : html`<div class="action-spacer"></div>`}
                </tr>
            </thead>
        `;
    }

    _renderActionRightBody(show) {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr>
                        ${show ? html`
                            <td><open-data-table-action-cell .row="${row}" .actions="${this.rowActions}"></open-data-table-action-cell></td>
                        ` : html`<div class="action-spacer"></div>`}
                    </tr>
                `)}
            </tbody>
        `;
    }

    _renderLeftActions() {
        if ((this.selectionMode === 'single') || (this.selectionMode === 'multiple')) {
            return html`
                <div slot="header-action-left">
                    ${this.selectionMode === 'multiple' ? html`
                        <table>
                            ${this._renderActionLeftHeader()}
                        </table>
                    ` : null
                }
                </div>  

                <div slot="body-action-left">
                    <table>
                        ${this._renderActionLeftBody()}
                    </table>
                </div>
            `;
        }

        return null;
    }

    _renderActionLeftHeader() {
        return html`
            <thead>
                <tr>
                    <th>
                        <open-data-table-selector-cell ?indeterminate="${(this.selectedRows.length > 0) && (this.selectedRows.length < this.rows.length)}" ?selected="${this.selectedRows.length === this.rows.length}"></open-data-table-selector-cell>
                    </th>
                </tr>
            </thead>
        `;
    }

    _renderActionLeftBody() {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr>
                        <td><open-data-table-selector-cell row-index="${rowIndex}" ?selected="${this.effectiveSelectedRows.indexOf(row) > -1}"></open-data-table-selector-cell></td>
                    </tr>
                `)}
            </tbody>
        `;
    }

    _renderDataHeader(visible, rowClass, columns) {
        return html`
            <thead>
                <tr class="${rowClass}" ?collapsed="${!visible}">
                    ${columns.map((column) => html`
                        <th>
                            <open-data-table-header-cell .column="${column}" ?sorted="${column._internalIndex === this.sortIndex}" ?visible="${visible}"
                                                         ?sort-descending="${this.sortDescending}" column-index="${column._internalIndex}"
                                                         @click="${(visible && column.sortable) ? this._onColumnClick : null}">
                            </open-data-table-header-cell>
                        </th>
                    `)}
                </tr>
            </thead>
        `;
    }

    _renderDataBody(rowClass, columns) {
        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row) => html`
                    <tr class="${rowClass}">${columns.map((column) => this._renderBodyCell(column, row))}</tr>
                `)}
            </tbody>
        `;
    }

    _renderBodyCell(column, row) {
        return html`
            <td>
                <open-data-table-body-cell .column="${column}" .row="${row}" .value="${row[column.field]}" false-icon="${column.falseIcon}" true-icon="${column.trueIcon}"></open-data-table-body-cell>
            </td>
        `;
    }

    _resizeHeaderCells() {
        this._syncHeaderCells('header-fixed-left-row');
        this._syncHeaderCells('header-scroll-row');
        this._syncHeaderCells('header-fixed-right-row');
    }

    _syncHeaderCells(className) {
        const visibleRow = this.renderRoot.querySelector(`tr.${className}:not([collapsed])`);
        const invisibleRow = this.renderRoot.querySelector(`tr.${className}[collapsed]`);

        if (visibleRow && invisibleRow) {
            const visibleCells = visibleRow.querySelectorAll('th');
            const invisibleCells = invisibleRow.querySelectorAll('th');

            for (let i = 0; i < invisibleCells.length; i++) {
                visibleCells[i].style.width = invisibleCells[i].clientWidth + 'px';
                visibleCells[i].style.minWidth = invisibleCells[i].clientWidth + 'px';
            }
        }
    }

    _onColumnClick(e) {
        this.sortColumn(e.target.columnIndex);
    }

    _rowCheck(e) {
        e.preventDefault();

        const target = e.target;
        const selected = e.detail.selected;

        if (target.hasAttribute('row-index')) {
            const rowIndex = Number(target.getAttribute('row-index'));
            (selected) ? this.selectRow(rowIndex) : this.deselectRow(rowIndex);
        } else {
            if (!target.indeterminate) {
                (selected) ? this.selectAllRows() : this.deselectAllRows();
            } else if (target.selected && target.indeterminate) {
                this.selectAllRows();
            }
        }

        this.requestUpdate();
    }
}

window.customElements.define('open-data-table', OpenDataTable);