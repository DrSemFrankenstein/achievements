import React, { useState } from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

const UserFormModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Fill in Your Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender' }]}
        >
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="jobTitle"
          label="Job Title"
          rules={[{ required: true, message: 'Please select your job title' }]}
        >
          <Select placeholder="Select your job title">
            <Option value="softwareEngineer">Software Engineer</Option>
            <Option value="dataScientist">Data Scientist</Option>
            <Option value="productManager">Product Manager</Option>
            <Option value="designer">Designer</Option>
            <Option value="doctor">Doctor</Option>
            <Option value="teacher">Teacher</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: 'Please select your skills' }]}
        >
          <Select mode="multiple" placeholder="Select your skills">
            <Option value="python">Python</Option>
            <Option value="javascript">JavaScript</Option>
            <Option value="java">Java</Option>
            <Option value="react">React</Option>
            <Option value="sql">SQL</Option>
            <Option value="projectManagement">Project Management</Option>
            <Option value="graphicDesign">Graphic Design</Option>
            <Option value="communication">Communication</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="education"
          label="Education"
          rules={[{ required: true, message: 'Please select your education' }]}
        >
          <Select placeholder="Select your education">
            <Option value="bachelors">Bachelor's Degree</Option>
            <Option value="masters">Master's Degree</Option>
            <Option value="phd">Ph.D.</Option>
            <Option value="diploma">Diploma</Option>
            <Option value="highSchool">High School</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="armyRank"
          label="Army Rank"
          rules={[{ required: true, message: 'Please select your army rank' }]}
        >
          <Select placeholder="Select your army rank">
            <Option value="private">Private</Option>
            <Option value="sergeant">Sergeant</Option>
            <Option value="lieutenant">Lieutenant</Option>
            <Option value="captain">Captain</Option>
            <Option value="major">Major</Option>
            <Option value="colonel">Colonel</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="branchOfService"
          label="Branch of Service"
          rules={[{ required: true, message: 'Please select your branch of service' }]}
        >
          <Select placeholder="Select your branch of service">
            <Option value="army">Army</Option>
            <Option value="navy">Navy</Option>
            <Option value="airForce">Air Force</Option>
            <Option value="marines">Marines</Option>
            <Option value="coastGuard">Coast Guard</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name="hobby"
          label="Hobby"
          rules={[{ required: true, message: 'Please select your hobby' }]}
        >
          <Select mode="multiple" placeholder="Select your hobbies">
            <Option value="reading">Reading</Option>
            <Option value="traveling">Traveling</Option>
            <Option value="cooking">Cooking</Option>
            <Option value="sports">Sports</Option>
            <Option value="music">Music</Option>
            <Option value="gaming">Gaming</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        {/* Add more fields as needed */}
      </Form>
    </Modal>
  );
};


export default UserFormModal;
