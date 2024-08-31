import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs'; // Import dayjs for date handling
import formData from './formData.json'; // Import the JSON file

const { Option } = Select;

const UserFormModal = ({ visible, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      // Convert date fields in initialValues to dayjs objects if necessary
      const processedValues = {
        ...initialValues,
        dob: initialValues.dob ? dayjs(initialValues.dob) : null,
      };
      form.setFieldsValue(processedValues);
    }
  }, [form, initialValues]);

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  const renderFormItem = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules ? [{ required: field.rules.required, message: field.rules.message }] : []}
          >
            <Input />
          </Form.Item>
        );
      case 'date':
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules ? [{ required: field.rules.required, message: field.rules.message }] : []}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        );
      case 'select':
        return (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules ? [{ required: field.rules.required, message: field.rules.message }] : []}
          >
            <Select placeholder={field.placeholder} mode={field.mode}>
              {field.options.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={formData.title}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          {formData.buttons.cancel.label}
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          {formData.buttons.submit.label}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {formData.fields.map(field => renderFormItem(field))}
      </Form>
    </Modal>
  );
};

export default UserFormModal;
