import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';
import { memo } from 'react';

function App() {

  const [username, setUsername] = useState("nimeshthakur0");
  const [imgLink, setImgLink] = useState("");
  const [repos, setRepos] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [temp, setTemp] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(async function (res) {
        const json = await res.json();
        setUsername(json.login);
        setImgLink(json.avatar_url);
        setRepos(json.public_repos);
        setFollowers(json.followers);
        setFollowing(json.following);
      })
  },[username]);

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-content">
          <User name={username} image={imgLink} />
          <dl className="stats">
            <Stats label="Repositories" value={repos} />
            <Stats label="Followers" value={followers} />
            <Stats label="Following" value={following} />
          </dl>
          <div className="search-bar">
            <input className="search-input" placeholder="Enter GitHub username" type="text" onChange={(e) => {
              setTemp(e.target.value);
            }} />
            <button className="search-button" onClick={(e) => {
              setUsername(temp);
            }}>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const User = memo(function({ name, image }) {

  return (
    <div className="user-info">
      <img alt="Avatar" className="avatar" src={image} />
      <div className="user-details">
        <h2 className="username">{name}</h2>
        <p className="user-handle">@{name}</p>
      </div>
    </div>
  )
})

const Stats = memo(function({ label, value }) {

  return (
    <div className="stat">
      <dt className="stat-label">{label}</dt>
      <dd className="stat-value">{value}</dd>
    </div>
  )
})

export default App
