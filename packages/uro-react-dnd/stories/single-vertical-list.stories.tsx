import type { Meta, StoryObj } from '@storybook/react';

import { DndContext } from '../src/index.js';

const meta: Meta<typeof DndContext> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/7.0/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: '简单列表（垂直）',
  component: DndContext,
};

export default meta;

type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/7.0/react/api/csf
 * to learn how to use render functions.
 */
export const basic: Story = {
  name: '基本列表',
  render: () => <DndContext>测试dnd</DndContext>,
};
