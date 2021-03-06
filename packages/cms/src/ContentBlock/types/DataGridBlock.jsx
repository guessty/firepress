import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import JsonBlock from './JsonBlock';

export default class EditorContent extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape()),
      gridConfig: PropTypes.shape({
        columnDefs: PropTypes.arrayOf(PropTypes.shape()),
      }),
    }),
    onSetWorkingContent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content: {
      data: [],
      gridConfig: {
        columnDefs: [],
      },
    },
  };

  gridApi;

  state = {
    view: 'grid',
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    if (this.gridApi) {
      this.gridApi.destroy();
      this.gridApi = undefined;
      this.columnApi = undefined;
    }
  }

  handleResize = () => {
    setTimeout(() => {
      if (this.gridApi) {
        this.gridApi.sizeColumnsToFit();
      }
    }, 0);
  };

  handleGridReady = async (params) => {
    const { api: gridApi, columnApi } = params;
    this.gridApi = gridApi;
    this.columnApi = columnApi;

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  };

  handleChangeView = (event) => {
    this.setState({
      view: event.target.value,
    })
  };

  renderRadios() {
    const { view } = this.state;

    return (
      <div className="fp-cms__data-grid-editor__radio_container">
        <div className="fp-cms__data-grid-editor__radio">
          <input
            type="radio"
            value="grid"
            name="view"
            id="gridView"
            checked={view === 'grid'}
            onChange={this.handleChangeView}
          />
          <label htmlFor="gridView">Grid</label>
        </div>
        <div className="fp-cms__data-grid-editor__radio">
          <input
            type="radio"
            value="json"
            name="view"
            id="jsonView"
            checked={view === 'json'}
            onChange={this.handleChangeView}
          />
          <label htmlFor="jsonView">JSON</label>
        </div>
      </div>
    );
  }

  render() {
    const { view } = this.state;
    const { content } = this.props;
    const columnDefs = content?.gridConfig?.columnDefs || [];
    const rowData = content?.data || [];

    return (
      <div className="fp-cms__data-grid-editor">
        {this.renderRadios()}
        {view === 'grid' && (
          <div className="fp-cms__data-grid-editor__grid-container">
            <AgGridReact
              key="datagrid"
              ensureDomOrder
              singleClickEdit
              suppressColumnVirtualisation
              suppressPropertyNamesCheck
              className="fp-cms__data-grid-editor__grid"
              columnDefs={columnDefs}
              defaultColDef={{
                sortingOrder: ['asc', 'desc'],
                lockPosition: true,
                resizable: true,
                sortable: true,
                editable: true,
              }}
              headerHeight={40}
              rowData={rowData}
              rowHeight={40}
              onGridReady={this.handleGridReady}
            />
          </div>
        )}
        {view === 'json' && (
          <JsonBlock {...this.props} />
        )}
      </div>
    );
  }
}
