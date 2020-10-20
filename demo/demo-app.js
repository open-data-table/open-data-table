/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit-element';
import '../src/open-data-table.js';

export class DemoApp extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            .table-container {
                box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.14),
                0 1px 3px 0 rgba(0, 0, 0, 0.12),
                0 2px 1px -1px rgba(0, 0, 0, 0.2);
                margin: 24px;
            }

            open-data-table {
               /*height: 461px;*/
               /*width: 900px;*/
            }
        `];
    }

    static get properties() {
        return {
            columns: {
                type: Array
            },

            rows: {
                type: Array
            },

            salesColumns: {
                type: Array
            },

            salesRows: {
                type: Array
            }
        }
    }

    currencyFormatter(value) {
        return `$${value.toFixed(2)}`;
    }

    percentageFormatter(value) {
        return `${value}%`;
    }

    customRenderer(value, column) {
        return html`
            <div style="width: 100%; text-overflow: ellipsis; white-space: nowrap; text-align: right; padding: 0 20px;">${value}</div>
        `;
    }

    detailSectionRenderer(row) {
        //const height = 40 + (row.id * 10);
        const width = 200;
        return html`
            <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; width: ${width}px; padding: 8px; box-sizing: border-box; background: white;">
                <div>DETAIL SECTION</div>
                <div>${row.dessert}</div>
            </div>
        `;
    }

    detailRowRenderer(row) {
        //const height = 40 + (row.id * 10);
        const height = 40;
        return html`
            <div style="height: ${height}px; display: flex; align-items: center; width: auto; padding: 0 24px; background: lightyellow;"><div>DETAIL ROW: ${row.dessert}</div></div>
        `;
    }

    detailRowRenderer2(row) {
        const div = document.createElement('div');
        div.style.width = '100%';
        div.style.padding = '0 20px';
        div.innerHTML = 'DETAIL ROW: XXX';
        return div;
    }

    detailRowRenderer3(row) {
        return html`
            <div style="background: lightyellow;">
                <div style="font-weight: 500; margin: 4px; padding: 0 8px; background: cornflowerblue; color: white;">Annual Sales</div>
                <open-data-table style="--open-data-table-background-color: white; margin: 4px; outline: 1px solid lightgrey; width: auto;" .columns="${this.salesColumns}" .rows="${this.salesRows}" id-field="id" selection-mode="none"></open-data-table>
            </div>
        `;
    }

    constructor() {
        super();

        this.booleanVisualizer = {
            name: 'boolean',

            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                trueValue: 'YES!',
                falseValue: 'NO!',
                trueColor: 'green',
                falseColor: 'red',
                icons: true
            }
        }

        this.percentageVisualizer = {
            name: 'percentage',

            params: {
                headerAlign: 'center',
                baseStyle: { 'bar-background': 'aqua' }
            }
        }

        this.enumVisualizer = {
            name: 'enum',
            
            params: {
                headerAlign: 'center',
                valueAlign: 'center',
                lookups: ['small', 'medium', 'large', 'extra large'],
                baseStyle: { margin: '6px 0', 'border-radius': '3px', 'font-size': '12px' },
                styles: [
                    //null, 
                    { color: 'white', background: '#E53935' },
                    { color: 'white', background: '#757575' }, 
                    { color: 'white', background: '#43A047' },
                    { color: 'white', background: '#1E88E5' }
                ]
            }
        }

        
        this.columns = [
            {
                label: 'All of the Columns', fix: 'none', columns: [
                    { label: 'Dessert (100g serving)', field: 'dessert', type: 'text', actionLabel: '', sortable: true, fix: 'left' },
                    { label: 'Price', field: 'price', type: 'number', formatter: this.currencyFormatter, actionLabel: '', sortable: true, width: 'auto' },

                    {
                        label: 'Some of the Columns', columns: [
                            {
                                label: 'Nutritional Information', columns: [
                                    { label: 'Calories', field: 'calories', type: 'number', actionLabel: '', sortable: true, renderer: this.customRenderer },
                                    { label: 'Fat (g)', field: 'fat', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Carbs (g)', field: 'carbs', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Protein (g)', field: 'protein', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Sodium (mg)', field: 'sodium', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Calcium (%)', field: 'calcium', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true },
                                    { label: 'Iron (%)', field: 'iron', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true }
                                ]
                            },

                            {
                                label: 'Sales Information', fix: 'none', columns: [
                                    { label: 'Profit (%)', field: 'profit', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true, visualizer: this.percentageVisualizer },
                                    { name: 'size', label: 'Size', field: 'size', type: 'number', sortable: true, visualizer: this.enumVisualizer },
                                    { label: 'In Stock', field: 'available', type: 'boolean', actionLabel: '', sortable: true, visualizer: this.booleanVisualizer }
                                ]
                            }]
                    }
                ]
            },
            {
                label: 'Actions', fix: 'right', columns: [
                    { label: 'Add to Cart', field: '', type: 'action', actionLabel: 'Add', sortable: false, fix: 'none' }
                ]
            }
        ];
        

        /*
        this.columns = [
            {
                label: 'All of the Columns', fix: 'none', columns: [
                    { label: 'Dessert (100g serving)', field: 'dessert', type: 'text', actionLabel: '', sortable: true, fix: 'left' },
                    { label: 'Price', field: 'price', type: 'number', formatter: this.currencyFormatter, actionLabel: '', sortable: true, width: 'auto' },

                    {
                        label: 'Some of the Columns', columns: [
                            {
                                label: 'Nutritional Information', columns: [
                                    { label: 'Calories', field: 'calories', type: 'number', actionLabel: '', sortable: true, renderer: this.customRenderer },
                                    { label: 'Fat (g)', field: 'fat', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Carbs (g)', field: 'carbs', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Protein (g)', field: 'protein', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Sodium (mg)', field: 'sodium', type: 'number', actionLabel: '', sortable: true },
                                    { label: 'Calcium (%)', field: 'calcium', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true },
                                    { label: 'Iron (%)', field: 'iron', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true }
                                ]
                            },

                            {
                                label: 'Sales Information', fix: 'none', columns: [
                                    { label: 'Profit (%)', field: 'profit', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true, visualizer: this.percentageVisualizer },
                                    { label: 'In Stock', field: 'available', type: 'boolean', actionLabel: '', sortable: true, visualizer: this.booleanVisualizer }
                                ]
                            }]
                    },

                    { label: 'Add to Cart', field: '', type: 'action', actionLabel: 'Add', sortable: false, fix: 'none' }
                ]
            }
        ];
        */

        /*
        this.columns = [
            { label: 'Dessert (100g serving)', field: 'dessert', type: 'text', actionLabel: '', sortable: true, fix: 'left' },
            { label: 'Price', field: 'price', type: 'number', formatter: this.currencyFormatter, actionLabel: '', sortable: true, width: 'auto' },

            {
                label: 'Stuff', columns: [
                    {
                        label: 'Nutritional Information', columns: [
                            { label: 'Calories', field: 'calories', type: 'number', actionLabel: '', sortable: true, renderer: this.customRenderer },
                            { label: 'Fat (g)', field: 'fat', type: 'number', actionLabel: '', sortable: true },
                            { label: 'Carbs (g)', field: 'carbs', type: 'number', actionLabel: '', sortable: true },
                            { label: 'Protein (g)', field: 'protein', type: 'number', actionLabel: '', sortable: true },
                            { label: 'Sodium (mg)', field: 'sodium', type: 'number', actionLabel: '', sortable: true },
                            { label: 'Calcium (%)', field: 'calcium', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true },
                            { label: 'Iron (%)', field: 'iron', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true }
                        ]
                    },

                    {
                        label: 'Sales Information', fix: 'none', columns: [
                            { label: 'Profit (%)', field: 'profit', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true, visualizer: this.percentageVisualizer },
                            { label: 'In Stock', field: 'available', type: 'boolean', actionLabel: '', sortable: true, visualizer: this.booleanVisualizer }
                        ]
                    }]
            },

            { label: 'Add to Cart', field: '', type: 'action', actionLabel: 'Add', sortable: false, fix: 'none' }
        ];
        */

        /*
        this.columns = [
            { label: 'Dessert (100g serving)', field: 'dessert',   type: 'text',    actionLabel: '', sortable: true, fix: 'none' },
            { label: 'Price',                  field: 'price',     type: 'number',  formatter: this.currencyFormatter,  actionLabel: '', sortable: true, width: 'auto' },
            
            { label: 'Nutritional Information', columns: [
                { label: 'Calories',               field: 'calories',  type: 'number',  actionLabel: '', sortable: true, renderer: this.customRenderer  },
                { label: 'Fat (g)',                field: 'fat',       type: 'number',  actionLabel: '', sortable: true  },
                { label: 'Carbs (g)',              field: 'carbs',     type: 'number',  actionLabel: '', sortable: true  },
                { label: 'Protein (g)',            field: 'protein',   type: 'number',  actionLabel: '', sortable: true  },
                { label: 'Sodium (mg)',            field: 'sodium',    type: 'number',  actionLabel: '', sortable: true  },
                { label: 'Calcium (%)',            field: 'calcium',   type: 'number',  formatter: this.percentageFormatter,  actionLabel: '', sortable: true  },
                { label: 'Iron (%)',               field: 'iron',      type: 'number',  formatter: this.percentageFormatter,  actionLabel: '', sortable: true  }
            ]},
            
            { label: 'Sales Information', fix: 'right', columns: [
                { label: 'Profit (%)',             field: 'profit',    type: 'number',  formatter: this.percentageFormatter,  actionLabel: '', sortable: true, visualizer: this.percentageVisualizer  },
                { label: 'In Stock',               field: 'available', type: 'boolean', actionLabel: '', sortable: true, visualizer: this.booleanVisualizer }
            ]},

            //{ label: 'Add to Cart',            field: '',          type: 'action',  actionLabel: 'Add', sortable: false, fix: 'none' }
        ];
        */

        /*
        this.columns = [
            { name: 'dessert', label: 'Dessert (100g serving)', field: 'dessert', type: 'text', actionLabel: '', sortable: true, fix: 'left', width: 'auto' },
            { name: 'price', label: 'Price', field: 'price', type: 'number', formatter: this.currencyFormatter, actionLabel: '', sortable: true, width: 'auto' },
            { name: 'calories', label: 'Calories', field: 'calories', type: 'number', actionLabel: '', sortable: true, renderer: this.customRenderer, minWidth: 88, maxWidth: 200 },
            { name: 'fat', label: 'Fat (g)', field: 'fat', type: 'number', actionLabel: '', sortable: true },
            { name: 'carbs', label: 'Carbs (g)', field: 'carbs', type: 'number', actionLabel: '', sortable: true },
            { name: 'protein', label: 'Protein (g)', field: 'protein', type: 'number', actionLabel: '', sortable: true },
            { name: 'sodium', label: 'Sodium (mg)', field: 'sodium', type: 'number', actionLabel: '', sortable: true, width: 'auto' },
            { name: 'calcium', label: 'Calcium (%)', field: 'calcium', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true },
            { name: 'iron', label: 'Iron (%)', field: 'iron', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true },
            { name: 'profit', label: 'Profit (%)', field: 'profit', type: 'number', formatter: this.percentageFormatter, actionLabel: '', sortable: true, visualizer: this.percentageVisualizer, width: 'auto' },
            { name: 'size', label: 'Size', field: 'size', type: 'number', sortable: true, visualizer: this.enumVisualizer },
            { name: 'stock', label: 'In Stock', field: 'available', type: 'boolean', actionLabel: '', sortable: true, visualizer: this.booleanVisualizer },
            { name: 'add', label: 'Add to Cart', field: '', type: 'action', actionLabel: 'Add', sortable: false, fix: 'right' }
        ];
        */

        this.rowSet = [
            { id: 0, dessert: 'Frozen Yoghurt', price: 4.50, calories: 159, fat: 6.0, carbs: 24, protein: 4.0, sodium: 87, calcium: 14, iron: 1, available: true, profit: 8, size: 0 },
            { id: 1, dessert: 'Ice Cream Sandwich', price: 3.99, calories: 237, fat: 9.0, carbs: 37, protein: 4.3, sodium: 129, calcium: 8, iron: 1, available: true, profit: 33, size: 3 },
            { id: 2, dessert: 'Eclair', price: 2.99, calories: 262, fat: 16.0, carbs: 24, protein: 6.0, sodium: 337, calcium: 6, iron: 7, available: false, profit: 12, size: 0 },
            { id: 3, dessert: 'Cupcake', price: 2.50, calories: 305, fat: 3.7, carbs: 67, protein: 4.3, sodium: 413, calcium: 3, iron: 8, available: true, profit: 10, size: 0 },
            { id: 4, dessert: 'Gingerbread', price: 1.75, calories: 356, fat: 16.0, carbs: 49, protein: 3.9, sodium: 327, calcium: 7, iron: 16, available: true, profit: 25, size: 1 },
            { id: 5, dessert: 'Jelly Bean', price: 0.35, calories: 375, fat: 0.0, carbs: 94, protein: 0.0, sodium: 50, calcium: 0, iron: 0, available: true, profit: 48, size: 2 },
            { id: 6, dessert: 'Lollipop', price: 0.50, calories: 392, fat: 0.2, carbs: 98, protein: 0.0, sodium: 38, calcium: 0, iron: 2, available: false, profit: 72, size: 0 },
            { id: 7, dessert: 'Honeycomb', price: 1.45, calories: 408, fat: 3.2, carbs: 87, protein: 6.5, sodium: 562, calcium: 0, iron: 45, available: false, profit: 19, size: 3 },
            { id: 8, dessert: 'Donut', price: 0.99, calories: 452, fat: 25.0, carbs: 51, protein: 4.9, sodium: 326, calcium: 2, iron: 22, available: true, profit: 50, size: 1 },
            { id: 9, dessert: 'KitKat', price: 0.99, calories: 518, fat: 26.0, carbs: 65, protein: 7.0, sodium: 54, calcium: 12, iron: 6, available: true, profit: 81, size: 2 }
        ];

        /*
        var t0 = performance.now()

        doSomething()   // <---- The function you're measuring time for 
        
        var t1 = performance.now()
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
        */
        const rowsJson = JSON.stringify(this.rowSet);

        let t0 = performance.now();

        let tempRows = [];

        for (let i = 0; i < 1; i++) {
            tempRows.push(...JSON.parse(rowsJson));
        }

        tempRows.forEach((row, index) => {
            row.id = index;
        });

        this.rows = tempRows;

        let t1 = performance.now();
        console.log(`Data load took ${t1 - t0} milliseconds.`);

        this.salesColumns = [
            { label: 'Store', field: 'store', type: 'text', fix: 'none' },
            { label: 'January', field: 'january', type: 'number' },
            { label: 'February', field: 'february', type: 'number' },
            { label: 'March', field: 'march', type: 'number' },
            { label: 'April', field: 'april', type: 'number' },
            { label: 'May', field: 'may', type: 'number' },
            { label: 'June', field: 'june', type: 'number' },
            { label: 'July', field: 'july', type: 'number' },
            { label: 'August', field: 'august', type: 'number' },
            { label: 'September', field: 'september', type: 'number' },
            { label: 'October', field: 'october', type: 'number' },
            { label: 'November', field: 'november', type: 'number' },
            { label: 'December', field: 'december', type: 'number' },
        ];

        this.salesRows = [
            { id: 0, store: 'Gateway', january: 10, february: 25, march: 34, april: 87, may: 53, june: 63, july: 99, august: 25, september: 25, october: 65, november: 53, december: 42 },
            { id: 1, store: 'La Lucia', january: 32, february: 86, march: 87, april: 94, may: 33, june: 54, july: 17, august: 86, september: 34, october: 84, november: 26, december: 74 },
            { id: 2, store: 'Pavilion', january: 86, february: 20, march: 63, april: 18, may: 93, june: 62, july: 53, august: 74, september: 52, october: 83, november: 34, december: 36 }
        ];
    }

    connectedCallback() {
        super.connectedCallback();

    }

    disconnectedCallback() {

        super.disconnectedCallback();
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);

    }

    updated(changedProperties) {
        super.updated(changedProperties);

        changedProperties.forEach((oldValue, propName) => {
            //
        });
    }

    render() {
        return html`
            <div class="container">
                <div class="table-container">
                    <open-data-table column-sizing="resizable" .detailRowTemplate="${this.detailRowRenderer.bind(this)}" .detailSectionTemplate="${this.detailSectionRenderer}"
                     @open-data-table-action="${this._onAction}" .columns="${this.columns}" .rows="${this.rows}" id-field="id" selection-mode="multiple" sort-index="0"
                     show-active-row>
                     </open-data-table>
                </div>
            </div>
        `;
    }

    _onAction(e) {
        console.log(e.detail);
    }
}

window.customElements.define('demo-app', DemoApp);

