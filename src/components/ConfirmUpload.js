import { Form, Input } from "antd"

const ConfirmUpload = () => {
  const [form] = Form.useForm()
  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
      <Form.Item
        name="fileName"
        label="文件名稱"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="uploadFile"
        label="上傳文件"
        va
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="tag"
        label="建立標籤"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item> */}
    </Form>
  )
}

export default ConfirmUpload