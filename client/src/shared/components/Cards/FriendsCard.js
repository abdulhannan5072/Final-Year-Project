import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { Button } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    verticalAlign: 'middle',
    width: "50px",
    height: "50px",
    borderRadius: "10%",
    backgroundColor: red[500],
  },
}));

export default function FriendsCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title="Abdul Hannan "
      />

      <CardActions className="d-flex flex-row-reverse">
        <Button type="primary">Accept</Button>
        <Button className="mr-2">Cancel</Button>
      </CardActions>
    </Card>
  );
}
