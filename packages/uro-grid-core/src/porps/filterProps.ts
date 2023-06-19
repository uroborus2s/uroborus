export interface FilterProps {
  /**
   * 用于列的过滤器组件。
   * - Set to `true` to use the default filter.
   * - Set to the name of a provided filter: `set`, `number`, `text`, `date`.
   * - Set to a `IFilterComp`.
   */
  filter?: any;

  /**
   * The custom component to be used for rendering the floating filter.
   * If none is specified the default AG Grid is used.
   */
  floatingFilterComponent?: any;

  /** Params to be passed to `floatingFilterComponent` or `floatingFilterComponentFramework`. */
  floatingFilterComponentParams?: any;
}
