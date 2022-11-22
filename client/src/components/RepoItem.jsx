import "./RepoItem.css";

const RepoItem = (props) => {
  const { repo } = props;

  return (
    <tr className="repo-item" onClick={props.onRepoItemClick}>
      <td>{repo.owner.login}</td>
      <td>{repo.name}</td>
      <td>
        {" "}
        <img src={repo.owner.avatar_url} alt="Avatar" />{" "}
      </td>
      <td>{repo.description}</td>
      <td>{repo.stargazers_count}</td>
      <td>
        {props.inFavorites === true ? (
          "favorite"
        ) : (
          <button onClick={() => props.addFav(repo)}>+Fav</button>
        )}
      </td>
      {props.allowDelete && (
        <td>
          <button onClick={() => props.deleteFav(repo.id)}>DELETE</button>
        </td>
      )}
    </tr>
  );
};

export default RepoItem;
