import "./style.scss";
import { Form, Button, Input, Menu } from "antd";
import { useState } from "react";
import avt from "../../assets/images/cmt_avt.jpg";
import { useSelector } from "react-redux";
import React from "react";
import { useDispatch } from "react-redux";
import { UserService } from "../../services/UserService";
import { updateUser } from "../../redux/slices/userSilce";
import axios from "axios";
import { FileService } from "../../services/FileService";
// ---- Component con
const ProfileForm = React.memo(({ onFinish }) => {
  const [form] = Form.useForm();
  const handleFinish = async (values) => {
    await onFinish(values);
    form.resetFields(); // ✅ reset form sau khi submit
  };
  return (
    <Form
      form={form}
      name="ho-so"
      layout="vertical"
      onFinish={handleFinish}
      requiredMark={false}
    >
      <Form.Item
        label="Họ tên:"
        name="fullName"
        rules={[{ required: true, message: "Họ tên không được để trống" }]}
      >
        <Input placeholder="Nhập họ tên" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
});

// ---- Component chính
function UserInfo() {
  const user = useSelector((state) => state.user.currentUser);

  ///up file

  const [file, setFile] = useState(null); //file chuẩn bị tải
  const [preview, setPreview] = useState(null); //hiển thị file trước khi lưu ảnh
  const handleUpload = async () => {
    try {
      const src = await FileService.uploadFile(file); // lấy link ảnh trả về
      const res = await UserService.updateUser({ avatarUrl: `${src}` }); //update link ảnh vô profile
      dispatch(updateUser(res));
    } catch (error) {
      console.error("Update failed:", error);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const Photos = React.memo(() => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              color: "#2a2929ff",
            }}
          >
            Xem trước hình ảnh
          </div>
          <div style={{ border: "1px solid #d2cfcfff" }}>
            <div
              style={{
                border: "10px solid #fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px 0",
                backgroundColor: "#ebeaeaff",
              }}
            >
              <img
                src={file ? preview : user.avatarUrl} //nếu k có preview thì hiển thị avata cũ
                style={{ width: "200px" }}
              ></img>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "14px",
            marginBottom: "10px",
            color: "#2a2929ff",
            marginTop: "5px",
          }}
        >
          Thêm/Thay đổi hình ảnh{" "}
        </div>
        <div style={{ display: "flex", gap: "40px" }}>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div
            onClick={() => document.getElementById("file-upload").click()}
            className="custom-btn"
          >
            Chọn tệp
          </div>

          <button className="btn-upload" onClick={handleUpload}>
            Lưu
          </button>
        </div>
      </div>
    );
  });

  /////////////////////////////////////////////////////////////////update name
  console.log(user);
  const [selectedKey, setSelectedKey] = useState("1");

  const items = [
    { key: "1", label: "Hồ sơ" },
    { key: "2", label: "Ảnh" },
  ];

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      console.log("Ho so form:", values);
      const res = await UserService.updateUser(values);
      dispatch(updateUser(res));
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="userinfo">
      <div className="profile">
        <div className="sidebar">
          <div className="avatar">
            <img src={user.avatarUrl} alt="avatar" />
          </div>
          <div className="name">{user.fullName}</div>
          <Menu
            mode="inline"
            theme="light"
            items={items}
            onClick={handleClick}
            selectedKeys={[selectedKey]}
          />
        </div>
        <div className="info">
          <div className="info-title">
            {selectedKey === "1" && (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "26px",
                    marginTop: "15px",
                  }}
                >
                  Hồ sơ công khai
                </div>
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  Thêm thông tin về bản thân bạn.
                </div>
              </>
            )}
            {selectedKey === "2" && (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    fontSize: "26px",
                    marginTop: "15px",
                  }}
                >
                  Ảnh
                </div>
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  Thêm một bức ảnh đẹp của bạn cho hồ sơ.
                </div>
              </>
            )}
          </div>
          <div className="info-content">
            {selectedKey === "1" && <ProfileForm onFinish={onFinish} />}
            {selectedKey === "2" && <Photos />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
