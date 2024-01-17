import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Navbar from "../components/Navbar";

const Posts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3000/api/data")
			.then((res) => res.json())
			.then(({ success, result, error }) => {
				if (!success) console.log(error);
				else setPosts(result);
			});
	}, []);
	return (
		<section className='posts'>
			<Navbar />
			<main>
				{posts.map((post) => (
					<PostItem
						post={post}
						key={post.id}
					/>
				))}
			</main>
		</section>
	);
};

export default Posts;
