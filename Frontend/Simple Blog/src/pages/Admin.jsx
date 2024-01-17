import { useEffect, useState } from "react";
import PostsAdmin from "./PostsAdmin";
import Axios from "axios";
import Navbar from "../components/Navbar";

const Admin = () => {
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState({
		postTitle: "",
		postContent: "",
		img: File,
	});
	useEffect(() => {
		fetch("http://localhost:3000/api/data")
			.then((res) => res.json())
			.then(({ success, result, error }) => {
				if (!success) console.log(error);
				else setPosts(result);
			})
			.catch((err) => console.log(err));
	}, []);
	const addpost = (e) => {
		const fd = new FormData(e.target);
		Axios.post("http://localhost:3000/api/posts/uploadimg", fd)
			.then((res) => res.json())
			.then((success, result, error) => {
				if (!success) console.log(error);
				else setPosts(result);
			});
		setTimeout(() => window.location.reload(), 150).catch((err) =>
			console.log(err),
		);
	};

	return (
		<section className='admin'>
			<Navbar />
			<main>
				<form onSubmit={(e) => addpost(e)}>
					<input
						type='text'
						placeholder='title'
						name='postTitle'
						value={newPost.postTitle}
						onChange={(e) =>
							setNewPost({
								...newPost,
								postTitle: e.target.value,
							})
						}
					/>
					<input
						type='text'
						placeholder='description'
						name='postContent'
						value={newPost.postContent}
						onChange={(e) =>
							setNewPost({
								...newPost,
								postContent: e.target.value,
							})
						}
					/>
					<input
						type='file'
						name='postImg'
						id=''
						onChange={(e) =>
							setNewPost({ ...newPost, img: e.target.files[0] })
						}
					/>
					<input
						type='submit'
						value='Post '
					/>
				</form>
			</main>
			<PostsAdmin
				posts={posts}
				setPosts={setPosts}
			/>
		</section>
	);
};

export default Admin;
