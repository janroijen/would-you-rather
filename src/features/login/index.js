import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, login } from "../../store/usersSlice";

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const UserItem = ({ id, name, avatarURL }) => {
  const dispatch = useDispatch();

  const handleUserSelection = () => {
    dispatch(login({ id }));
  };

  return (
    <ListItem button onClick={handleUserSelection}>
      <ListItemAvatar>
        <Avatar src={avatarURL} />
      </ListItemAvatar>
      {name}
    </ListItem>
  );
};

const Login = () => {
  const users = useSelector(selectUsers);

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Paper style={{ padding: "20px" }}>
        <Typography variant="h3">Login</Typography>
        <List>
          {users.map((user) => (
            <UserItem key={user.id} {...user} />
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Login;
