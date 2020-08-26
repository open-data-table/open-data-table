/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat.js';
import { styleMap } from 'lit-html/directives/style-map';
import { OpenDataTableController } from './open-data-table-controller.js';
import './open-data-table-layout.js';

import './open-data-table-header-cell.js';
import './open-data-table-body-cell.js';
import './open-data-table-selector-cell.js';
import './open-data-table-expander-cell.js';
import './open-data-table-action-cell.js';
import './open-data-table-group-header-cell.js';

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
                display: flex;
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
                --open-data-table-layout-header-fixed-right-border-width: 0 0 1px 1px;
                --open-data-table-layout-header-action-right-border-width: 0 0 1px 0;

                --open-data-table-layout-body-action-left-border-width: 0 1px 0 0;
                --open-data-table-layout-body-fixed-left-border-width: 0 1px 0 0;
                --open-data-table-layout-body-scroll-border-width: 0 0 0 0;
                --open-data-table-layout-body-fixed-right-border-width: 0 0 0 1px;
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
            }

            open-data-table-body-cell {
                height: var(--open-data-table-row-height);
            }

            table {
                border-spacing: 0; 
                color: rgba(0, 0, 0, 0.87);
            }

            .table-fixed {
                table-layout: fixed;
                width: 100%;
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
                position: relative;
                padding: 0;
                box-sizing: border-box;
                overflow: hidden;
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

            td:not(:first-child) > open-data-table-expander-cell {
                border-left: 1px solid var(--open-data-table-layout-border-color);
            }

            .group-column {
                height: calc(var(--open-data-table-row-height) + 1px);
            }

            .group-column[right-border] {
                border-right: 1px solid var(--open-data-table-layout-border-color);
            }

            .group-column[bottom-border] {
                border-bottom: 1px solid var(--open-data-table-layout-border-color);
            }

            div[align-bottom-spacer] {
                display: flex;
                flex-direction: column-reverse;
                justify-content: flex-end;
                align-items: flex-start;
                height: 100%;
            }

            div[align-bottom-spacer]:after {
               content: '';
               flex: 1;
               border-bottom: 1px solid var(--open-data-table-layout-border-color);
               width: 100%;
            }

            th[last-in-group]:not(:last-child), td[last-in-group]:not(:last-child) {
                border-right: 1px solid var(--open-data-table-layout-border-color);
            }

            .resizer {
                position: absolute;
                top: 0;
                right: 0;
                width: 3px;
                cursor: col-resize;
                user-select: none;
                background: var(--open-data-table-layout-border-color);
                height: 100%;
                z-index: 2;
                opacity: 0;
            }

            .resizer:hover, .resizer[dragging] {
                opacity: 1;
            }
        `];
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    render() {
        return html`
            <open-data-table-layout id="layout" class="typography-body" @open-data-table-column-resize="${this._columnResize}" @open-data-table-row-toggle="${this._rowToggle}" @open-data-table-row-selected="${this._rowCheck}" @open-data-table-layout-size-changed="${() => requestAnimationFrame(() => this._resizeHeaderCells())}">
                ${this._renderLeftActions()}

                ${this.displayColumns.fixedLeft.length > 0 ? html`
                    <div class="header-fixed-left" slot="header-fixed-left">
                        ${this._renderDataHeader(true, 'header-fixed-left-row', this.displayColumns.fixedLeft)}
                    </div>

                    <div class="body-fixed-left" slot="body-fixed-left">
                        ${this._renderDataHeader(false, 'header-fixed-left-row', this.displayColumns.fixedLeft)}
                        ${this._renderDataBody('body-fixed-left-row', this.displayColumns.fixedLeft, true)}
                    </div>
                ` : null}

                ${this.displayColumns.scroll.length > 0 ? html`
                    <div class="header-scroll" slot="header-scroll">
                        <table>
                            ${this._renderDataHeader(true, 'header-scroll-row', this.displayColumns.scroll)}
                        </table>
                    </div>

                    <div class="body-scroll" slot="body-scroll">
                        <table>
                            ${this._renderDataHeader(false, 'header-scroll-row', this.displayColumns.scroll)}
                            ${this._renderDataBody('body-scroll-row', this.displayColumns.scroll, false)}
                        </table>
                    </div>
                ` : null}

                ${this.displayColumns.fixedRight.length > 0 ? html`
                    <div class="header-fixed-right" slot="header-fixed-right">
                        ${this._renderDataHeader(true, 'header-fixed-right-row', this.displayColumns.fixedRight)}
                    </div>

                    <div class="body-fixed-right" slot="body-fixed-right">
                        ${this._renderDataHeader(false, 'header-fixed-right-row', this.displayColumns.fixedRight)}
                        ${this._renderDataBody('body-fixed-right-row', this.displayColumns.fixedRight, true)}
                    </div>
                ` : null}

                ${this._renderRightActions()}
            </open-data-table-layout>
        `;
    }

    _rowToggle(e) {
        this.toggleRow(e.detail.row);
        requestAnimationFrame(() => this._resizeDetailRow(e.detail.row));
    }

    _columnResize(e) {
        console.log(e.detail);
        e.detail.column.width = e.detail.width;
        this.requestUpdate('columns', []);
        requestAnimationFrame(() => this._resizeHeaderCells());
    }

    _resizeDetailRow(row) {
        const rowIndex = this.sortedRows.indexOf(row);
        const detailCells = [...this.renderRoot.querySelectorAll(`.detail-cell[row-index="${rowIndex}"`)];

        if (detailCells.length > 0) {
            const contentCell = detailCells.filter((cell) => cell.hasAttribute('has-content'))[0];
            const nonContentCells = detailCells.filter((cell) => !cell.hasAttribute('has-content'));

            nonContentCells.forEach((cell) => {
                cell.style.height = (contentCell.clientHeight + 1) + 'px';
            });
        }

        this.renderRoot.getElementById('layout').updateLayout();
    }

    _renderDetailRow(row, rowIndex, count, showContent) {
        if (this.hasDetailTemplate && this.rowExpanded(row)) {
            if (showContent) {
                return html`<tr class="detail-row"><td row-index="${rowIndex}" class="detail-cell" ?has-content="${showContent}" colspan="${count}">${this.detailTemplate(row)}</td></tr>`;
            } else {
                return html`<tr class="detail-row"><td row-index="${rowIndex}" class="detail-cell" ?has-content="${showContent}" colspan="${count}"></td></tr>`;
            }

        }
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
                    ${this._renderDetailRow(row, rowIndex, 2, false)}
                `)}
            </tbody>
        `;
    }

    _renderLeftActions() {
        if ((this.selectionMode === 'single') || (this.selectionMode === 'multiple') || (this.hasDetailTemplate)) {
            return html`
                <div ?align-bottom-spacer="${(this.headerDepth > 1) && (this.selectionMode === 'multiple')}" slot="header-action-left">
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
                        ${(this.selectionMode === 'single' || this.selectionMode === 'multiple') ? html`
                                <td><open-data-table-selector-cell row-index="${rowIndex}" ?selected="${this.effectiveSelectedRows.indexOf(row) > -1}"></open-data-table-selector-cell></td>
                            ` : null
            }

                        ${this.hasDetailTemplate ? html`
                            <td><open-data-table-expander-cell .row="${row}" ?expanded="${this.rowExpanded(row)}"></open-data-table-expander-cell></td>
                            ` : null
            }
                        
                    </tr>
                    ${this._renderDetailRow(row, rowIndex, 2, false)}
                `)}
            </tbody>
        `;
    }

    _renderDataHeader(visible, rowClass, columns) {
        const resizable = this.columnSizing === 'resizable';
        const canHaveSize = this.columnSizing === 'fixed' || this.columnSizing === 'resizable';

        return html`
            <thead>
                ${(visible && (columns.length > 1)) ? this._renderGroupHeaders(columns) : null}
                <tr class="${rowClass}" ?collapsed="${!visible}">
                    ${columns[this.headerDepth - 1].map((column, index) => {
                        const styles = styleMap({
                            width: (canHaveSize && column.width) ? column.width : null
                        });

                        return html`
                            <th ?last-in-group="${column._lastInGroup}" .columnIndex="${column._internalIndex}">
                                ${resizable ? html`
                                    <div class="resizer" @mousedown="${this._handleColumnResizeStart}" @touchstart="${this._handleColumnResizeStart}"></div>
                                ` : null}
                                <open-data-table-header-cell .column="${column}" ?sorted="${column._internalIndex === this.sortIndex}" ?visible="${visible}"
                                                            ?sort-descending="${this.sortDescending}" column-index="${column._internalIndex}"
                                                            @click="${(visible && column.sortable) ? this._onColumnClick : null}"
                                                            style=${styles} ?no-hover="${this._columnDragging}">
                                </open-data-table-header-cell>
                            </th>
                        `
                    })}
                </tr>
            </thead>
        `;
    }

    _renderGroupHeaders(columns) {
        const groupsColumns = columns.slice(0, columns.length - 1);

        return groupsColumns.map((columns, index) => {
            const lastGroup = index === groupsColumns.length - 1;
            const columnCount = columns.length - 1;

            return html`<tr>
                ${columns.map((column, index) => {
                    const rightBorder = (index !== columnCount) && ((columns[index + 1].label) || (column.label));
                    
                    return html`
                        <th class="group-column" ?bottom-border="${column.label || lastGroup}" ?right-border="${rightBorder}" colspan="${column.childCount}">
                            <open-data-table-group-header-cell label="${column.label}"></open-data-table-group-header-cell>
                        </th>
                    `;
                })}
            </tr>`;
        });
    }

    _renderDataBody(rowClass, columns, fixed) {
        const columnCount = columns[this.headerDepth - 1].length;

        return html`
            <tbody>
                ${repeat(this.sortedRows, (row) => row[this.idField], (row, rowIndex) => html`
                    <tr .row="${row}" class="${rowClass}">${columns[this.headerDepth - 1].map((column, index) => this._renderBodyCell(column, row))}</tr>
                    ${this._renderDetailRow(row, rowIndex, columnCount, !fixed)}
                `)}
            </tbody>
        `;
    }

    _renderBodyCell(column, row) {
        const canHaveSize = this.columnSizing === 'fixed' || this.columnSizing === 'resizable';

        const styles = styleMap({
            width: (canHaveSize && column.width) ? column.width : null
        });

        return html`
            <td ?last-in-group="${column._lastInGroup}">
                <open-data-table-body-cell style=${styles} .column="${column}" .row="${row}" .value="${row[column.field]}" false-icon="${column.falseIcon}" true-icon="${column.trueIcon}"></open-data-table-body-cell>
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
                const width = invisibleCells[i].getBoundingClientRect().width + 'px';
                visibleCells[i].style.width = width;
                visibleCells[i].style.minWidth = width;
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