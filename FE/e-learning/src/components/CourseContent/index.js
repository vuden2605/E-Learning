import "./style.scss";
import { Collapse } from "antd";

function CourseContent() {
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

  // Không cần ép kiểu CollapseProps["items"], để TS tự suy luận cho gọn
  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <p>{text}</p>,
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <p>{text}</p>,
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  const onChange = (key: string | string[]) => {
    console.log("Active panel:", key);
  };

  return (
    <Collapse
      className="course-collapse"
      items={items}
      defaultActiveKey={["1"]}
      onChange={onChange}
    />
  );
}

export default CourseContent;
