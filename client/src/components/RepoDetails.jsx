import "./RepoDetails.css";
import RepoField from "./RepoField";

const RepoDetails = (props) => {
  const { repo } = props;

  const handleFavorites = () => {
    if (props.inFavorites === true) {
      return <span> in favorites</span>;
    } else {
      return (
        <button style={{ height: "4vh" }} onClick={() => props.addFav(repo)}>
          +Fav
        </button>
      );
    }
  };
  const handleSave = () => {
    const repoItem = {
      id: repo.id,
      name: repo.name,
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      forks: repo.forks,
      created_at: repo.created_at,
      html_url: repo.html_url,
    };
    return (
      <button
        style={{ height: "4vh" }}
        onClick={() => props.saveRepo(repoItem)}
      >
        +Save
      </button>
    );
  };

  return (
    <div className="repo-details">
      <div id="detailsHeader" className="row">
        <button onClick={props.onRepoDetailsClick}>x</button>
        <img src={repo.owner.avatar_url} alt="Avatar" />
      </div>
      <div className="row">
        <RepoField title="Login" value={repo.owner.login} />
        <RepoField title="Name" value={repo.name} width="60%" />
      </div>
      <RepoField title="Description" value={repo.description} width="100%" />
      <div className="row">
        <RepoField title="Stars" value={repo.stargazers_count} />
        <RepoField title="Language" value={repo.language} />
      </div>
      <div className="row">
        <RepoField title="Forks" value={repo.forks} />
      </div>
      <div className="row">
        <RepoField title="Created at" value={repo.created_at} />
      </div>
      <div className="row">
        <RepoField title="URL" value={repo.html_url} />
      </div>
      <RepoField title="favorite" value={""} component={handleFavorites()} />
      <RepoField title="Save" value={""} component={handleSave()} />
    </div>
  );
};

export default RepoDetails;
