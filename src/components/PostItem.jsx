import React, { useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";
import { setDisplayComment } from "store/slice/postsSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function PostItem() {
  const { displayItem, displayComment } = useSelector(
    (state) => state.postList
  );
  const apiUrl2 = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios(`${apiUrl2}?postId=${id}`);

        dispatch(setDisplayComment(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, []);
  return (
    <Container>
      <Typography variant='h3' sx={{ padding: "15px 0" }}>
        Posts
      </Typography>
      {displayItem.map((post) => (
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
        </Card>
      ))}
      <Typography variant='h5' sx={{ padding: "15px 0" }}>
        Comments
      </Typography>
      {displayComment.map((comment) => (
        <Card key={comment.id} sx={{ mb: "15px" }}>
          <Typography
            sx={{ fontSize: 14, textAlign: "left" }}
            color='text.secondary'
            gutterBottom
          >
            {comment.name}
          </Typography>
        </Card>
      ))}
      <CardActions>
        <Button
          size='big'
          variant='contained'
          sx={{ background: "#dd33fa" }}
          onClick={() => navigate("/")}
        >
          Back
        </Button>
      </CardActions>
    </Container>
  );
}
