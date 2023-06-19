import useUtilityClasses from '../hooks/useUtilityClasses.js';

test('测试useUtilityClasses', () => {
  const classes = useUtilityClasses({
    resizerWrapper: ['resizer-wrapper', 'resizer'],
  });
  expect(classes).toMatchObject({
    resizerWrapper: 'uroGrid-resizer-wrapper uroGrid-resizer',
  });
});
