import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RepoSearch } from '../../components';
import './style.css';

import axios from 'axios';

export default function Repos({ username }) {
	const [userRepoList, setUserRepoList] = useState([]);

	useEffect(() => {
		let isLoading = true;
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
				if (isLoading) setUserRepoList(data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
		return () => {
			isLoading = false;
		};
	}, []);

	const searchRepos = (searchTerm) => {
		console.log(searchTerm);
	};

	return (
		<div className="repos-container">
			<RepoSearch searchRepos={searchRepos} />
			{userRepoList.map((repo) => (
				<Link key={repo.id} to={`/profile/${username}/repos/${repo.id}`}>
					<h4>{repo.name}</h4>
				</Link>
			))}
		</div>
	);
}
