import { Button, Select } from 'antd'
import { Input } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './TaskFormBase.scss'

const { TextArea } = Input;

export default function TaskFormBase({ initialValues, onSubmit, onCancel }) {

  const statusData = [
    { value: 'incomplete', label: 'incomplete' }, 
    { value: 'inprogress', label: 'inprogress'}, 
    { value: 'completed', label: 'completed' }
  ];

  const priorityData = [
    { value: 'low', label: 'low' }, 
    { value: 'medium', label: 'medium'}, 
    { value: 'high', label: 'high' }
  ];

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      status: Yup.string().required('Status is required'),
      priority: Yup.string().required('Priority is required'),
    }),
    onSubmit: (values) => {
      onSubmit(values)
      formik.resetForm()
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className='task-form'>
      <div>
        <label>Title</label>
        <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
      </div>

      <div>
        <label>Description</label>
        <TextArea name="description" value={formik.values.description} onChange={formik.handleChange} />
      </div>

      <div className='task-form--row'>
        <div>
          <label>Status</label>
          <Select
            name='status'
            defaultValue={statusData[0]}
            value={formik.values.status}
            style={{ width: 120 }}
            onChange={formik.handleChange}
            options={statusData}
          />
        </div>

        <div>
          <label>Priority</label>
          <Select
            name='priority'
            defaultValue={priorityData[0]}
            value={formik.values.priority}
            style={{ width: 120 }}
            onChange={formik.handleChange}
            options={priorityData}
          />
        </div>
      </div>

      <div className='task-form__button'>
        <Button color="default" variant="solid" type="submit">Submit</Button>
        <Button color="default" variant="solid" type="button" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  )
}
