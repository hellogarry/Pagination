import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {

    //You shouldn't use async inside a useEffect
    //So Create a new function
    //learn more about this
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    }
    
    fetchPosts();
  }, []); //if no [] it will continue to cycle, you can put something specific here to run when there is a change on the specific value you put in there.


  //get current post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>

  );
}

export default App;
