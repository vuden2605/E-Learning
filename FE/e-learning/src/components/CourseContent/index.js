import "./style.scss";
import { Collapse } from "antd";

function CourseContent({ lessons }) {
  console.log("lesson",lessons);
  if (!lessons || lessons.length === 0) return <p>Chưa có bài học nào.</p>;

  // map lessons từ API ra items cho Collapse
  const items = lessons.map((lesson) => ({
    key: lesson.id.toString(),
    label: `Bài ${lesson.lessonNumber}: ${lesson.title}`,
    children: (
      <div className="lesson-materials">
        {lesson.materials && lesson.materials.length > 0 ? (
          lesson.materials.map((mat) => (
            <div key={mat.id} className="material-item">
              <p><strong>{mat.title}</strong> ({mat.type})</p>
              <p>{mat.description}</p>
              {mat.url && (
                <a href={mat.url} target="_blank" rel="noopener noreferrer">
                  Xem tài liệu
                </a>
              )}
            </div>
          ))
        ) : (
          <p>Chưa có tài liệu cho bài học này.</p>
        )}
      </div>
    ),
  }));

  const onChange = (key: string | string[]) => {
    console.log("Active panel:", key);
  };

  return (
    <Collapse
      className="course-collapse"
      items={items}
      defaultActiveKey={[lessons[0].id.toString()]}
      onChange={onChange}
    />
  );
}

export default CourseContent;
