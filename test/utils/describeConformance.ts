import { cloneElement, ElementType, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

export interface Optionsinterface<
  D extends ElementType,
  Classes extends Record<string, string> = {},
> extends Omit<RenderOptions, 'queries'> {
  classes: Classes;
  inheritComponent: D;
  skip: TestKindsNames[];
  execution: TestKindsNames[];
}

export type GeneralComponentTest<
  D extends ElementType,
  Classes extends Record<string, string> = {},
> = (
  element: ReactElement,
  options?: Omit<Optionsinterface<D, Classes>, 'skip' | 'execution'>,
) => void;

const generalTestComponentProp: GeneralComponentTest<any, any> = (
  elementl,
  options,
) => {
  describe('测试组件通用属性：component', () => {
    it('通过属性：component 更改root元素类型', function () {
      // @ts-ignore
      const wrapper = render(cloneElement(elementl, { component }), options);
    });
  });
};

const generalTestComponentsProp = (
  element: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => {
  describe('测试组件通用属性：component', () => {
    it('通过属性：component 更改root元素类型', function () {
      const wrapper = render(cloneElement(elementl, { component }), options);
    });
  });
};

const allTests = {
  componentProp: generalTestComponentProp,
  componentsProp: generalTestComponentsProp,
} as const;

export type TestKindsNames = keyof typeof allTests;

export default <
  D extends ElementType,
  Classes extends Record<string, string> = {},
>(
  element: ReactElement,
  getOptions: () => Optionsinterface<D, Classes>,
) => {
  describe('UI component API', () => {
    const {
      execution = Object.keys(allTests) as TestKindsNames[],
      skip = [],
      ...options
    } = getOptions();
    const filteredTestNames = execution.filter(
      (testKey) => !skip.includes(testKey),
    );

    filteredTestNames.forEach((testName) => {
      allTests[testName].call(void 0, element, options);
    });
  });
};
