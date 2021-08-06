import { useState, useEffect } from "react";
import {
  Box,
  makeStyles,
  TextareaAutosize,
  FormControl,
  InputBase,
  Button,
  Typography,
  NativeSelect,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { getPost, updatePost, uploadFile } from "../../service/api";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 100px",
    [theme.breakpoints.down("md")]: {
      padding: 5,
    },
  },
  image: {
    width: "100%",
    height: "50vh",
    objectFit: "cover",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  form1: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  form2: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 20,
    width: "30%",
    fontSize: 12,
    color: "#878787",
  },
  textField: {
    flex: 1,
    margin: "0 30px",
    fontSize: 25,
  },
  textarea: {
    width: "100%",
    border: "none",
    marginTop: 50,
    fontSize: 18,
    "&:focus": {
      outline: "none",
    },
  },
}));

const initialValues = {
  title: "",
  description: "",
  picture: "",
  username: "You",
  categories: "All",
  createdDate: new Date(),
};

const UpdateView = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [post, setPost] = useState(initialValues);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      console.log(data);
      setPost(data);
    };
    fetchData();
  }, [match.params.id]);

  useEffect(
    (post) => {
      setUser(JSON.parse(localStorage.getItem("profile")));
      console.log(user);
      /* setPost({ ...post, username: user?.result.name }); */
    },
    [location]
  );

  const url = post.picture ? post.picture : "https://i.imgur.com/uaPwCQE.jpg";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const image = await uploadFile(data);
        post.picture = image.data;
        setImage(image.data);
      }
    };
    getImage();
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updateBlog = async () => {
    await updatePost(match.params.id, post);
    history.push(`/details/${match.params.id}`);
  };

  return (
    <Box className={classes.container}>
      <img src={url} className={classes.image} />
      <FormControl className={classes.form}>
        <Box>
          <label htmlFor="fileInput">
            <AddCircle fontSize="large" color="action" />
          </label>
          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            type="file"
            id="fileInput"
            style={{ display: "none" }}
          />

          <InputBase
            onChange={(e) => handleChange(e)}
            name="title"
            placeholder="title"
            value={post.title}
            className={classes.textField}
          />
          <Button
            onClick={() => updateBlog()}
            variant="contained"
            color="primary"
          >
            Update
          </Button>
        </Box>
        <Box className={classes.form2}>
          <Typography className={classes.form2}> Category: </Typography>

          <NativeSelect
            value={post.categories}
            onChange={handleChange}
            name="categories"
            className={classes.selectEmpty}
            inputProps={{ categories: "categories" }}
          >
            <option value="">None</option>
            <option value="Music">Music</option>
            <option value="Movies">Movies</option>
            <option value="Sports">Sports</option>
            <option value="Tech">Tech</option>
            <option value="Fashion">Fashion</option>
          </NativeSelect>
        </Box>
      </FormControl>

      <TextareaAutosize
        onChange={(e) => handleChange(e)}
        name="description"
        minRows={5}
        placeholder="Tell your Story"
        value={post.description}
        className={classes.textarea}
      />
    </Box>
  );
};

export default UpdateView;
