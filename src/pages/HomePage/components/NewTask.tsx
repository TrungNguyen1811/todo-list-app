import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd'
import { useFormik } from 'formik'

const { RangePicker } = DatePicker

function NewTask() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      // This function is called when the form is submitted
      alert(JSON.stringify(values, null, 2)) // Display submitted values
    },
    validate: (values) => {},
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Form.Item
          label='Title'
          name='Input'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Description'
          name='TextArea'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label='Status'
          name='Select'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label='Priority'
          name='Select'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Select />
        </Form.Item>

        <Form.Item
          label='Due'
          name='DatePicker'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label='Category'
          name='Select'
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <Select />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </form>
    </div>
  )
}
export default NewTask
