import "./style.scss";
import { Collapse } from "antd";
import { useState, useEffect } from "react";

function CourseContent({ lessons, materialOnclick, idMaterialParent }) {
  const [activeMaterialId, setActiveMaterialId] = useState(null);
  // WTF LÀM SAO ĐỂ  ITEM TỰ ĐỘNG ACTIVE KHI CHILL=idMaterialParent???????????????????????????????????????????????????????????????
  // Khi idMaterialParent thay đổi thì cập nhật activeMaterialId
  useEffect(() => {
    if (idMaterialParent) {
      setActiveMaterialId(idMaterialParent);
    }
  }, [idMaterialParent]);

  if (!lessons || lessons.length === 0) return <p>Chưa có bài học nào.</p>;
  console.log("lesonnnn:", lessons);
  const items = [...lessons]
    .sort((a, b) => a.id - b.id)
    .map((lesson) => ({
      key: lesson.id.toString(),
      label: `Bài ${lesson.lessonNumber}: ${lesson.title}`,
      children: (
        <div className="lesson-materials">
          {lesson.materials && lesson.materials.length > 0 ? (
            [...lesson.materials]
              .sort((a, b) => a.id - b.id)
              .map((mat) => (
                <div
                  key={mat.id}
                  className={`material-item ${
                    activeMaterialId === mat.id ? "material-item-active" : ""
                  }`}
                  onClick={() => {
                    setActiveMaterialId(mat.id);
                    materialOnclick?.(mat.id);
                  }}
                >
                  <span style={{ marginLeft: "20px" }}>
                    {mat.title} ({mat.type})
                  </span>
                </div>
              ))
          ) : (
            <p>Chưa có tài liệu cho bài học này.</p>
          )}
        </div>
      ),
    }));

  return (
    <Collapse
      className="course-collapse"
      items={items}
      defaultActiveKey={[lessons[0].id.toString()]}
    />
  );
}

export default CourseContent;
