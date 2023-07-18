import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setDisplayData,
  setDisplayItem,
  setCurrentPage,
} from "store/slice/postsSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Paginate from "./Paginate";
export default function PostsList() {
  const { displayData, currentPage, postsPerPage } = useSelector(
    (state) => state.postList
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios(apiUrl);
        dispatch(setDisplayData(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  const getPostItem = (id) => {
    dispatch(setDisplayItem(id));
    navigate(`/${id}`);
  };
  console.log(displayData);
  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;

  const currentPosts = displayData.slice(indexOfFirstPost, indexOfLastPost);

  const maxPages = Math.ceil(displayData.length / postsPerPage) || 1;
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Typography variant='h3' sx={{ padding: "15px 0" }}>
        Posts
      </Typography>
      {currentPosts.map((post) => (
        <Card key={post.id} sx={{ mb: "15px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold" }}
              color='text.secondary'
              gutterBottom
            >
              {post.title}
            </Typography>

            <Typography
              sx={{ mb: 1.5, textAlign: "left" }}
              color='text.secondary'
            >
              {post.body}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size='small'
              variant='contained'
              sx={{ background: "#dd33fa" }}
              onClick={() => getPostItem(post.id)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}

      <Paginate
        totalPosts={displayData.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        maxPages={maxPages}
        pagination={pagination}
      />
    </Container>
  );
}
