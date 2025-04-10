import type { Meta, StoryObj } from "@storybook/react";
import  Button from "./buttons";

const meta = {
    title: 'Example/Button',
    component: Button,
    parameters: {
        layout: 'centered',
         // optional parameter to centralize the item in canvas
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['solid', 'outline'],
            description: "Visual style variant of the buttom"
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
            description: "Size of the button"
        },
        children: {
            control: "text",
            description: "Button content"
        },
        className:  {
            control: 'text',
            description: 'Additional CSS classes to apply'
        }
    },
    tags: ['autodocs'],
    args: { variant: 'solid', size: 'md', children: 'Solid'}, // use fn to spy on the onClick arg, which will appear in the actions panel once invoked
}  satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
    args: {
        children: 'Solid',
        variant: 'solid',
    },
}

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    }
}
