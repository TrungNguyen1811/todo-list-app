import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Space,
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  ColorPicker,
  Popconfirm,
  Tooltip,
  Badge,
} from "antd";
import {
  PicLeftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import { Flex } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  addPriorityRequest,
  deletePriorityRequest,
  getPrioritiesRequest,
  updatePriorityRequest,
} from "@/sagas/priorities/prioritiesSlice";
import FormItem from "antd/es/form/FormItem";
import { useRef } from "react";
import { useMemo } from "react";
const { Content } = Layout;
const { Title, Text } = Typography;
const Priority = () => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const { listPriorities, loading, actionLoading } = useSelector(
    (state) => state.priorities
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPriority, setEditingPriority] = useState(null);

  useEffect(() => {
    dispatch(getPrioritiesRequest());
  }, [dispatch]);

  const handleAddPriority = () => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    setEditingPriority(null);
    setIsModalVisible(true);
  };

  const handleEditPriority = (priority) => {
    setEditingPriority(priority);
    setIsModalVisible(true);
  };

  const handleDeletePriority = (priorityId) => {
    dispatch(
      deletePriorityRequest({
        id: priorityId,
        meta: {
          callback: () => {
            dispatch(getPrioritiesRequest());
          },
        },
      })
    );
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingPriority(null);
  };

  const submitForm = (values) => {
    if (editingPriority) {
      dispatch(
        updatePriorityRequest({
          values: { ...values, id: editingPriority.id },
          meta: {
            callback: () => {
              setIsModalVisible(false);
              dispatch(getPrioritiesRequest());
            },
          },
        })
      );
    } else {
      dispatch(
        addPriorityRequest({
          values: values,
          meta: {
            callback: () => {
              setIsModalVisible(false);
              dispatch(getPrioritiesRequest());
            },
          },
        })
      );
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: "Priority Name",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Space>
            <Badge color={record.color} />
            <Text strong>{text}</Text>
          </Space>
        ),
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
        width: 180,
        render: (color) => (
          <div
            style={{
              width: 40,
              height: 20,
              backgroundColor: color,
              borderRadius: 4,
              border: "1px solid #d9d9d9",
            }}
          />
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ellipsis: true,
      },
      {
        title: "Actions",
        key: "action",
        width: 150,
        render: (_, record) => (
          <Space>
            <Tooltip name="Edit">
              <Button
                size="large"
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditPriority(record)}
              />
            </Tooltip>
            <Tooltip name="Delete">
              <Popconfirm
                name="Confirm Delete"
                description={
                  record.isDefault
                    ? "Default priority cannot be deleted!"
                    : `Are you sure you want to delete priority "${record.name}"?`
                }
                onConfirm={() => handleDeletePriority(record.id)}
                okText="Delete"
                cancelText="Cancel"
                disabled={record.isDefault}
              >
                <Button
                  type="text"
                  size="large"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={record.isDefault}
                />
              </Popconfirm>
            </Tooltip>
          </Space>
        ),
      },
    ];
  }, [listPriorities]);

  return (
    <Layout style={{ minHeight: "100vh" }} className="dashboard">
      <Flex className="dashboard-header">
        <Title level={2} className="dashboard-title">
          <Space>
            <PicLeftOutlined />
            Priority Management
          </Space>
        </Title>
      </Flex>

      <Content className="dashboard-content">
        <Card
          title="Priority List"
          className="priority-table-card"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddPriority}
              size="middle"
            >
              Add Priority
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={listPriorities}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} priorities`,
            }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No priorities yet"
                />
              ),
            }}
            loading={loading}
          />
        </Card>
      </Content>

      <Modal
        title={editingPriority ? "Edit Priority" : "Add New Priority"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
      >
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            name: editingPriority ? editingPriority.name : "",
            color: editingPriority ? editingPriority.color : "",
            description: editingPriority ? editingPriority.description : "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            color: Yup.string().required("Color is required"),
          })}
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
                label="Name "
                help={errors.name && touched.name && errors.name}
                validateStatus={errors.name && touched.name ? "error" : ""}
              >
                <Input
                  type="name"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </FormItem>

              <FormItem
                required
                label="Color"
                help={errors.color && touched.color && errors.color}
                validateStatus={errors.color && touched.color ? "error" : ""}
              >
                <ColorPicker
                  value={values.color}
                  onChange={(color) => {
                    const hex =
                      typeof color === "string" ? color : color.toHexString();
                    setFieldValue("color", hex);
                  }}
                  showText
                />
              </FormItem>

              <FormItem
                label="Description"
                help={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                validateStatus={
                  errors.description && touched.description ? "error" : ""
                }
              >
                <Input
                  type="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </FormItem>
              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={actionLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </Layout>
  );
};

export default Priority;
