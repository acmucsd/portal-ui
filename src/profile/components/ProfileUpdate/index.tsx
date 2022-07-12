import React, { useContext, useEffect, useRef, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import * as ANTD from 'antd';
import { Avatar, Button, Form, Input, Modal, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { fetchUser } from '../../../auth/utils';
import majorsData from '../../../constants/majors.json';
import { getDefaultProfile } from '../../../utils';
import { updateEmail, updateProfile, uploadUserImage } from '../../utils';
import './style.less';
import { AppContext } from '../../../context';

const { Option } = Select;
const { TextArea } = Input;

const years = [...Array(6)].map((_, i) => i + new Date().getFullYear());

const ProfileUpdate: React.FC = () => {
  const { user, setUser } = useContext(AppContext);

  const history = useHistory();

  const [email, setEmail] = useState<string>();
  const [bg, setBG] = useState(user.profilePicture);
  const [fileList, setFileList] = useState([] as any[]);
  const [visible, setVisible] = useState(false);
  const [uploadState, setUploadState] = useState('none');
  const dummyRequest = ({ onSuccess }: { onSuccess: Function }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };
  const onFileChange = (info: { [key: string]: any }) => {
    const infoFileList = [...info.fileList];
    URL.revokeObjectURL(bg);
    if (infoFileList.length) {
      const lastFile = infoFileList[infoFileList.length - 1];
      if (lastFile) {
        setFileList([lastFile]);
      }
      const newBg = URL.createObjectURL(lastFile.originFileObj);
      setBG(newBg);
    } else {
      setBG('');
    }
  };
  const handleCancel = () => {
    setVisible(false);
    setUploadState('none');
  };
  const showModal = () => {
    setVisible(true);
  };
  const uploadImageButton = useRef(null);
  const uploadPhoto = () => {
    setUploadState('uploading');
    uploadUserImage(fileList[0].originFileObj)
      .then(() => {
        setUploadState('none');
        setVisible(false);
        fetchUser().then(setUser);
      })
      .catch(() => {
        setUploadState('none');
      });
  };

  useEffect(() => {
    setBG(user.profilePicture);
  }, [user]);

  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  const InnerRefButton = ANTD.Button as React.ComponentClass<any>;
  const CustomSelect = ANTD.Select as React.ComponentClass<any>;
  const CustomUpload = ANTD.Upload as React.ComponentClass<any>;

  return (
    <Formik
      initialValues={{
        firstName: user.firstName,
        lastName: user.lastName,
        graduationYear: user.graduationYear,
        major: user.major,
        bio: user.bio,
      }}
      onSubmit={(values) => {
        updateProfile(values)
          .then(() => {
            fetchUser().then(setUser);
          })
          .catch(() => {});
      }}
    >
      {({ values, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
        <div className="update-card">
          <div className="updatecontent">
            <h1 className="title">Profile</h1>
            <Avatar size={145} src={bg} className="avatar" />
            <br />
            <Button type="primary" className="upload-modal-button" onClick={showModal}>
              Change Profile Picture
            </Button>
            <Modal
              visible={visible}
              title="Change Profile Picture"
              onOk={uploadPhoto}
              onCancel={handleCancel}
              className="EditProfilePage-Modal"
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>,
                <Button key="submit" type="primary" loading={uploadState === 'uploading'} onClick={uploadPhoto} disabled={fileList.length === 0}>
                  {uploadState !== 'uploading' && <UploadOutlined />} Upload
                </Button>,
              ]}
            >
              <div className="upload-wrapper">
                <CustomUpload
                  className="upload-profile-pic"
                  name="file"
                  type="file"
                  customRequest={dummyRequest}
                  fileList={fileList}
                  onChange={onFileChange}
                  onRemove={() => {
                    setFileList([]);
                  }}
                >
                  <div className="new-profile-pic-wrapper">
                    <Avatar size={115} src={bg || getDefaultProfile()} className="avatar" />
                  </div>
                  <InnerRefButton className="upload-button" innerRef={uploadImageButton}>
                    Change Picture
                  </InnerRefButton>
                </CustomUpload>
              </div>
            </Modal>
            <div className="divider" />
            <Form.Item label="Email">
              <Input name="email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Button
              key="submit"
              type="primary"
              className="save-button"
              onClick={() => {
                if (email) updateEmail(email);
              }}
            >
              Update Email
            </Button>
            <div className="divider" />
            <form onSubmit={handleSubmit} className="update-profile-form">
              <Form.Item label="First name">
                <Input name="firstName" className="input-box" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
              </Form.Item>
              <Form.Item label="Last name">
                <Input name="lastName" className="input-box" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
              </Form.Item>
              <div className="horizontal-input">
                <Form.Item label="Year">
                  <CustomSelect
                    name="graduationYear"
                    value={values.graduationYear}
                    className="year"
                    onBlur={(value: string | number) => {
                      setFieldValue('graduationYear', value);
                    }}
                    onChange={(value: string | number) => {
                      setFieldValue('graduationYear', value);
                    }}
                  >
                    {years.map((num) => (
                      <Option key={num} value={num}>
                        {num}
                      </Option>
                    ))}
                  </CustomSelect>
                </Form.Item>
                <Form.Item label="Major">
                  <CustomSelect
                    showSearch
                    placeholder="Major"
                    className="major"
                    value={values.major}
                    onChange={(value: string) => setFieldValue('major', value)}
                    onBlur={(value: string) => setFieldValue('major', value)}
                  >
                    {majorsData.majors.map((major) => (
                      <Option key={major} value={major}>
                        {major}
                      </Option>
                    ))}
                  </CustomSelect>
                </Form.Item>
              </div>
              <Form.Item label="About">
                <TextArea name="bio" className="area-box" value={values.bio} onChange={handleChange} onBlur={handleBlur} />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="save-button">
                Save Profile Changes
              </Button>
              <Button type="danger" className="discard-button" onClick={() => history.push('/profile')}>
                Discard
              </Button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default ProfileUpdate;
