import "./style.scss";
import { AppstoreOutlined } from "@ant-design/icons";
import { Form, Button, Input, Menu } from "antd";
import { useState } from "react";
import avt from "../../assets/images/cmt_avt.jpg";

function UserInfo() {
  //---- menu
  const [selectedKey, setSelectedKey] = useState("1");
  const items = [
    { key: "1", label: "Hồ sơ" },
    { key: "2", label: "Ảnh" },
  ];
  const handleClick = (e) => {
    console.log("key-menu:", e.key);
    setSelectedKey(e.key);
  };
  //----HO SO
  const onFinish = (values) => {
    console.log("Ho so form:", values);
  };

  return (
    <div className="userinfo">
      <div className="profile">
        <div className="sidebar">
          <div className="avatar">
            <img src={avt}></img>
          </div>
          <div className="name">Quốc Việt</div>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
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
                  Thêm một bức ảnh đẹp của bạn cho hồ sơ.{" "}
                </div>
              </>
            )}
          </div>
          <div className="info-content">
            {selectedKey === "1" && (
              <>
                <Form
                  name="ho-so"
                  layout="vertical"
                  onFinish={onFinish}
                  requiredMark={false}
                >
                  <Form.Item
                    label="Họ tên:"
                    name="name"
                    rules={[
                      { required: true, message: "Họ tên không được để trống" },
                    ]}
                  >
                    <Input placeholder="Nhập họ tên" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Lưu
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
            {selectedKey === "2" && (
              <>
                <div
                  style={{
                    border: "1px solid #d2d4eb",
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
