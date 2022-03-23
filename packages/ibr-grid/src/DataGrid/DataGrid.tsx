import { forwardRef, ForwardRefRenderFunction, memo } from "react";
import { DataGridProps } from "./props";
import { RecoilRoot } from "recoil";

const DataGrid:ForwardRefRenderFunction<HTMLDivElement,DataGridProps> = () => {
  return <RecoilRoot></RecoilRoot>;
};

export default memo(forwardRef(DataGrid);
