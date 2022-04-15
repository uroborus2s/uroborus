import * as React from 'react';
import SvgIcon, { svgIconClasses } from '../SvgIcon';
import { describeConformance } from 'test/utils';
import { ReactNode } from 'react';

describe('测试 SvgIcon 组件', () => {
  let path: ReactNode;

  beforeEach(() => {
    path = (
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" data-testid="test-path" />
    );
  });

  describeConformance(
    <SvgIcon>
      <path />
    </SvgIcon>,
    () => ({
      // @ts-ignore
      classes: svgIconClasses,
      inheritComponent: 'svg',
      skip: ['componentsProp'],
    }),
  );

  // it('renders children by default', () => {
  //   const component = renderer.create(<SvgIcon>{path}</SvgIcon>);
  //   const { container, queryByTestId } = render(<SvgIcon>{path}</SvgIcon>);
  //
  //   expect(queryByTestId('test-path')).not.to.equal(null);
  //   expect(container.firstChild).to.have.attribute('aria-hidden', 'true');
  // });
  //
  // describe('prop: titleAccess', () => {
  //   it('should be able to make an icon accessible', () => {
  //     const { container, queryByText } = render(
  //       <SvgIcon title="Go to link" titleAccess="Network">
  //         {path}
  //       </SvgIcon>,
  //     );
  //
  //     expect(queryByText('Network')).not.to.equal(null);
  //     expect(container.firstChild).not.to.have.attribute('aria-hidden');
  //   });
  // });
  //
  // describe('prop: color', () => {
  //   it('should render with the user and SvgIcon classes', () => {
  //     const { container } = render(<SvgIcon className="meow">{path}</SvgIcon>);
  //
  //     expect(container.firstChild).to.have.class('meow');
  //   });
  //
  //   it('should render with the secondary color', () => {
  //     const { container } = render(<SvgIcon color="secondary">{path}</SvgIcon>);
  //
  //     expect(container.firstChild).to.have.class(classes.colorSecondary);
  //   });
  //
  //   it('should render with the action color', () => {
  //     const { container } = render(<SvgIcon color="action">{path}</SvgIcon>);
  //
  //     expect(container.firstChild).to.have.class(classes.colorAction);
  //   });
  //
  //   it('should render with the error color', () => {
  //     const { container } = render(<SvgIcon color="error">{path}</SvgIcon>);
  //
  //     expect(container.firstChild).to.have.class(classes.colorError);
  //   });
  //
  //   it('should render with the primary class', () => {
  //     const { container } = render(<SvgIcon color="primary">{path}</SvgIcon>);
  //
  //     expect(container.firstChild).to.have.class(classes.colorPrimary);
  //   });
  // });
  //
  // describe('prop: fontSize', () => {
  //   it('should be able to change the fontSize', () => {
  //     const { container } = render(
  //       <SvgIcon fontSize="inherit">{path}</SvgIcon>,
  //     );
  //
  //     expect(container.firstChild).to.have.class(classes.fontSizeInherit);
  //   });
  // });
  //
  // describe('prop: inheritViewBox', () => {
  //   const CustomSvg = (props) => (
  //     <svg viewBox="-4 -4 24 24" {...props}>
  //       {path}
  //     </svg>
  //   );
  //
  //   it('should render with the default viewBox if neither inheritViewBox nor viewBox are provided', () => {
  //     const { container } = render(<SvgIcon component={CustomSvg} />);
  //     expect(container.firstChild).to.have.attribute('viewBox', '0 0 24 24');
  //   });
  //
  //   it('should render with given viewBox if inheritViewBox is not provided', () => {
  //     const { container } = render(
  //       <SvgIcon component={CustomSvg} viewBox="0 0 30 30" />,
  //     );
  //     expect(container.firstChild).to.have.attribute('viewBox', '0 0 30 30');
  //   });
  //
  //   it("should use the custom component's viewBox if true", () => {
  //     const { container } = render(
  //       <SvgIcon component={CustomSvg} inheritViewBox />,
  //     );
  //     expect(container.firstChild).to.have.attribute('viewBox', '-4 -4 24 24');
  //   });
  // });
});
