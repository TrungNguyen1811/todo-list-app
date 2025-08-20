import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function TaskFormBase({ initialValues, onSubmit, onCancel }) {
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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Title</label>
        <input name="title" value={formik.values.title} onChange={formik.handleChange} />
      </div>

      <div>
        <label>Description</label>
        <input name="description" value={formik.values.description} onChange={formik.handleChange} />
      </div>

      <div>
        <label>Status</label>
        <select name="status" value={formik.values.status} onChange={formik.handleChange}>
          <option value="">Select status</option>
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div>
        <label>Priority</label>
        <select name="priority" value={formik.values.priority} onChange={formik.handleChange}>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  )
}
