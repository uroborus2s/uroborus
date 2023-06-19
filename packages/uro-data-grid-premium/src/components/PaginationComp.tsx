import { gridComponentName, styled } from '@/styles';

const PaginationStyles = styled('div', {
  name: gridComponentName,
  slot: 'PagingPanel',
  overridesResolver: (props, styles) => styles.pagingPanel,
})(({ theme }) => ({
  borderTop: '1px solid',
  borderTopColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: theme.spacing(8),
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
}));

const PaginationComp = () => {
  return (
    <PaginationStyles>
      <span className="ag-paging-row-summary-panel" role="status">
        <span
          id="ag-${compId}-first-row"
          ref="lbFirstRowOnPage"
          className="ag-paging-row-summary-panel-number"
        ></span>
        <span id="ag-${compId}-to">${strTo}</span>
        <span
          id="ag-${compId}-last-row"
          ref="lbLastRowOnPage"
          className="ag-paging-row-summary-panel-number"
        ></span>
        <span id="ag-${compId}-of">${strOf}</span>
        <span
          id="ag-${compId}-row-count"
          ref="lbRecordCount"
          className="ag-paging-row-summary-panel-number"
        ></span>
      </span>
      <span className="ag-paging-page-summary-panel" role="presentation">
        <div
          ref="btFirst"
          className="ag-paging-button"
          role="button"
          aria-label="${strFirst}"
        ></div>
        <div
          ref="btPrevious"
          className="ag-paging-button"
          role="button"
          aria-label="${strPrevious}"
        ></div>
        <span className="ag-paging-description" role="status">
          <span id="ag-${compId}-start-page">${strPage}</span>
          <span
            id="ag-${compId}-start-page-number"
            ref="lbCurrent"
            className="ag-paging-number"
          ></span>
          <span id="ag-${compId}-of-page">${strOf}</span>
          <span
            id="ag-${compId}-of-page-number"
            ref="lbTotal"
            className="ag-paging-number"
          ></span>
        </span>
        <div
          ref="btNext"
          className="ag-paging-button"
          role="button"
          aria-label="${strNext}"
        ></div>
        <div
          ref="btLast"
          className="ag-paging-button"
          role="button"
          aria-label="${strLast}"
        ></div>
      </span>
    </PaginationStyles>
  );
};

export default PaginationComp;
