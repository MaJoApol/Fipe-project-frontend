import type { Meta, StoryObj } from "@storybook/react";
import Container from "./container";

const meta = {
    title: 'Example/Container',
    component: Container,
    parameters: {
        layout: 'centered',
         // optional parameter to centralize the item in canvas
    },
    argTypes: {
        children: {
            control: "text",
            description: "Container content"
        },
        classNameOp:  {
            control: 'text',
            description: 'Additional CSS classes to apply'
        }
    },
    tags: ['autodocs']  // use fn to spy on the onClick arg, which will appear in the actions panel once invoked
}  satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Content (selects, texts, buttons...)',
    },
}
