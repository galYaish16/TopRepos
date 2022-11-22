import "./RepoField.css";

const RepoField = ({ title, value, width = "initial", component = null }) => {
  return (
    <div className="repo-field" style={{ width: width }}>
      <div className="title">{title}: </div>
      {component !== null ? component : <div>{value}</div>}
    </div>
  );
};

export default RepoField;
