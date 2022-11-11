import { ExButton } from '@uroborus/uro-sense';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

export default {
  title: 'Example/ExButton',
  component: ExButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ExButton>;

const Template: ComponentStory<typeof ExButton> = (args) => (
  <ExButton {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
