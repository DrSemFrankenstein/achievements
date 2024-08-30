import React, { useState } from "react";
import { Upload, Input, Card, Typography, Image, Button, Row, Col } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setImage, setName, setDescription } from "../../Redux/aboutSlice";
import "antd/dist/reset.css";
import UserFormModal from "./UserFormModal";

const { Title, Text } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AboutComponent = () => {
  const dispatch = useDispatch();
  const { image, name, description } = useSelector((state) => state.about);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = async ({ fileList: newFileList }) => {
    const newFile = newFileList[0];
    if (newFile) {
      const base64 = await getBase64(newFile.originFileObj);
      dispatch(setImage(base64)); // Save the image as Base64 in the store
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div style={{ textAlign: "center", fontSize: "20px" }}>
      <PlusOutlined style={{ fontSize: "24px" }} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSubmitForm = (data) => {
    const story = generateStory(data);
    dispatch(setName(data?.name || "")); // Update the name in the store
    dispatch(setDescription(story)); // Set the generated story as the description
    handleCloseModal();
    console.log("Form Data:", data);
  };

  const generateStory = (data) => {
    return `
      ${data?.name || 'User'}, born on ${data?.dob?.format("MMMM D, YYYY") || 'an unknown date'},
      ${data?.description || 'has a lot of achievements to be proud of!'}
    `;
  };

  return (
    <>
      <div style={{ padding: "20px", width: "100%" }}>
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <ImgCrop rotationSlider aspect={1}>
                <Upload
                  action=""
                  listType="picture-circle"
                  fileList={image ? [{ uid: "-1", url: image }] : []}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {!image && uploadButton}
                </Upload>
              </ImgCrop>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Card
              style={{
                marginTop: "40px",
                textAlign: "center",
                position: "relative",
              }}
            >
              <Button
                icon={<EditOutlined />}
                onClick={handleOpenModal}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
              />
              <Title level={3}>
                <Input
                  value={name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  placeholder="Enter name"
                  style={{
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    fontSize: "24px",
                  }}
                />
              </Title>
              <Text>
                <Input.TextArea
                  value={description}
                  onChange={(e) => dispatch(setDescription(e.target.value))}
                  placeholder="Enter description"
                  autoSize={{ minRows: 3 }}
                  style={{
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    fontSize: "18px",
                  }}
                />
              </Text>
            </Card>
          </Col>
        </Row>
      </div>

      <UserFormModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleSubmitForm}
      />
    </>
  );
};

export default AboutComponent;
