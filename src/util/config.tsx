import { Button, Input } from 'antd';

export const editorState = {
  container: {
    width: 900,
    height: 700,
  },
  blocks: [],
};

export const editorConfig = [
  {
    key: 'text',
    label: 'text',
    render: '文本',
    preview: '文本',
  },
  {
    key: 'button',
    label: '按钮',
    render: () => <Button>按钮</Button>,
    preview: () => <Button>按钮</Button>,
  },
  {
    key: 'input',
    label: '输入框',
    render: () => <Input />,
    preview: () => <Input />,
  },
];
