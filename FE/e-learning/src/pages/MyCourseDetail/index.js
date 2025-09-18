import "./style.scss";
import { useParams } from "react-router-dom";

function MyCourseDetail() {
  const { id } = useParams();
  console.log("id-param:", id);
  return <div className="mycourse-detail">{id}</div>;
}
export default MyCourseDetail;
