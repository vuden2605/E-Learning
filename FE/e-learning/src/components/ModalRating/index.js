import { CloseOutlined } from "@ant-design/icons";
import "./style.scss";
import { Button, message, Rate } from "antd";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
function ModalRating({ onSubmitRating, onCloseModal }) {
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  console.log(rate, comment);
  const descriptions = {
    1: "Rất tệ",
    2: "Tệ",
    3: "Trung bình",
    4: "Tốt",
    5: "Rất tốt",
  };
  const onSubmit = () => {
    if (!rate || !comment.trim()) {
      /// thay bằng component message
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    onSubmitRating({ rate: rate, comment }); // trả về object
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close" onClick={onCloseModal}>
          <CloseOutlined />
        </div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Vì sao bạn xếp hạng ở mức này?
        </div>
        <div className="modal-rating">
          {rate ? descriptions[rate] : "Hãy chọn số sao"}

          <Rate
            value={rate}
            onChange={(val) => setRate(val)}
            style={{ fontSize: "30px", color: "#fadb14" }}
          />

          <div
            style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}
          ></div>
        </div>
        <TextArea
          className="modal-comment"
          rows={5}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Hãy cho chúng tôi biết trải nghiệm của bạn..."
        />
        <Button type="primary" className="btn-save" onClick={onSubmit}>
          Lưu và tiếp tục
        </Button>
      </div>
    </div>
  );
}
export default ModalRating;
