const PostItem = ({ post }) => {
	const localServer = "http://localhost:3000/";

	return (
		<article className='postItem'>
			<img
				src={localServer + post.img}
				alt={post.title}
			/>
			<div>
				<h2>{post.title}</h2>
				<p>{post.content}</p>
			</div>
		</article>
	);
};

export default PostItem;
