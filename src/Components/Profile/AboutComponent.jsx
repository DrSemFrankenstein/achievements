import React, { useState } from "react";
import { Upload, Input, Card, Typography, Image, Button, Row, Col } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setImage, setName, setDescription, setFormData } from "../../Redux/aboutSlice";
import "antd/dist/reset.css";
import UserFormModal from "./UserFormModal";
import formData from "./formData.json"; // Import the formData JSON

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
  const { image, name, description, formData: savedFormData } = useSelector((state) => state.about);

  const [fileList, setFileList] = useState(image ? [{ uid: "-1", url: image }] : []);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const newFile = newFileList[0];
    if (newFile) {
      const base64 = await getBase64(newFile.originFileObj);
      dispatch(setImage(base64)); // Save the image as Base64 in the store
    } else {
      dispatch(setImage(null)); // Clear the image in the store if no file is present
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleRemove = () => {
    setFileList([]);
    dispatch(setImage(null)); // Clear the image in the store when removed
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
    const story = generateMotivationStory(data, formData);
    dispatch(setName(data.name));
    dispatch(setDescription(story));
    dispatch(setFormData(data)); // Save the form data in Redux
    handleCloseModal();
  };

  const generateMotivationStory = (data, formData) => {
    const {
      name,
      dob,
      gender,
      jobTitle,
      skills,
      education,
      armyRank,
      branchOfService,
      hobby,
    } = data;

    const pronoun = gender === "female" ? "She" : "He";
    const possessivePronoun = gender === "female" ? "Her" : "His";

    const jobTitleLabel =
      formData.fields
        .find((field) => field.name === "jobTitle")
        ?.options.find((option) => option.value === jobTitle)?.label ||
      jobTitle;

    const educationLabel =
      formData.fields
        .find((field) => field.name === "education")
        ?.options.find((option) => option.value === education)?.label ||
      education;

    const armyRankLabel =
      formData.fields
        .find((field) => field.name === "armyRank")
        ?.options.find((option) => option.value === armyRank)?.label ||
      armyRank;

    const branchOfServiceLabel =
      formData.fields
        .find((field) => field.name === "branchOfService")
        ?.options.find((option) => option.value === branchOfService)?.label ||
      branchOfService;

    const skillsLabels = skills.map(
      (skill) =>
        formData.fields
          .find((field) => field.name === "skills")
          ?.options.find((option) => option.value === skill)?.label || skill
    );

    const hobbiesLabels = hobby.map(
      (hobbyItem) =>
        formData.fields
          .find((field) => field.name === "hobby")
          ?.options.find((option) => option.value === hobbyItem)?.label ||
        hobbyItem
    );

    return `
      ${name} was born on ${dob.format(
      "MMMM D, YYYY"
    )}. ${pronoun} is a dedicated ${jobTitleLabel}, with an impressive background in ${educationLabel}. 
      ${possessivePronoun} expertise in ${skillsLabels.join(
      ", "
    )} has set ${pronoun.toLowerCase()} apart in ${possessivePronoun.toLowerCase()} career.
      
      ${name} has also served ${possessivePronoun.toLowerCase()} country as a ${armyRankLabel} in the ${branchOfServiceLabel}, 
      where ${pronoun.toLowerCase()} demonstrated outstanding leadership and commitment.
      
      Outside of work, ${name} enjoys ${hobbiesLabels.join(
      ", "
    )}, which keep ${pronoun.toLowerCase()} balanced and motivated.
      
      ${pronoun} is a role model for others, showing that with passion, dedication, and the right skills, anything is possible.
      The future holds great promise for ${name}, and ${pronoun.toLowerCase()} is sure to achieve even more remarkable accomplishments.
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
              <ImgCrop showGrid rotationSlider aspectSlider showReset aspect={1}>
                <Upload
                  action=""
                  listType="picture-circle"
                  fileList={fileList}
                  onChange={handleChange}
                  onPreview={handlePreview}
                  onRemove={handleRemove} // Handle the remove action
                  showUploadList={{
                    showPreviewIcon: true,
                    showRemoveIcon: true,
                  }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {fileList.length === 0 && uploadButton}
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
        initialValues={savedFormData} // Pass savedFormData to pre-fill the form
      />
    </>
  );
};

export default AboutComponent;
