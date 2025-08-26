import { MODAL_WIDTH } from "@/constants/responsive";
import { STATUS_OPTION } from "@/constants/status";
import useModalTask from "@/hooks/useModalTask";
import { getValidateProps } from "@/utils/getValidateProps";
import { Button, Form, Input, Select, Modal } from "antd";
import { Formik } from "formik";

function ModalTask({
  formikRef,
  editingTask,
  isModalVisible,
  setIsModalVisible,
  cancelModalTask,
}) {
  const {
    modalTitle,
    initialValues,
    validationSchema,
    submitLoading,
    deleteLoading,
    customOnChange,
    submitForm,
    priorityData,
    handleDeleteTask,
  } = useModalTask({
    formikRef,
    editingTask,
    isModalVisible,
    setIsModalVisible,
  });

  const { Item: FormItem } = Form;
  const { TextArea } = Input;

  return (
    <Modal
      title={modalTitle}
      open={isModalVisible}
      onCancel={cancelModalTask}
      footer={null}
      width={MODAL_WIDTH.PC}
    >
      <Formik
        innerRef={formikRef}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form onFinish={handleSubmit} labelCol={{ span: 4 }} noValidate>
            <FormItem
              required
              label="Title"
              {...getValidateProps("title", touched, errors)}
            >
              <Input
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </FormItem>

            <FormItem
              required
              label="Description"
              {...getValidateProps("description", touched, errors)}
            >
              <TextArea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
            </FormItem>

            <FormItem
              required
              label="Status"
              {...getValidateProps("status", touched, errors)}
            >
              <Select
                value={values.status}
                style={{ width: 180 }}
                onChange={customOnChange("status", setFieldValue)}
                options={STATUS_OPTION}
              />
            </FormItem>

            <FormItem
              required
              label="Priority"
              {...getValidateProps("priorityId", touched, errors)}
            >
              <Select
                value={values.priorityId}
                style={{ width: 180 }}
                onChange={customOnChange("priorityId", setFieldValue)}
                options={priorityData}
              />
            </FormItem>

            <FormItem label={null}>
              <Button type="primary" htmlType="submit" loading={submitLoading}>
                Submit
              </Button>
              {editingTask ? (
                <Button
                  type="default"
                  danger
                  style={{ marginLeft: 8 }}
                  onClick={() => handleDeleteTask(editingTask.id)}
                  loading={deleteLoading}
                >
                  Delete
                </Button>
              ) : (
                ""
              )}
            </FormItem>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default ModalTask;
