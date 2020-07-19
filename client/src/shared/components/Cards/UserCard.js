import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { Block, Done } from "@material-ui/icons";
import { Row, Item } from "@mui-treasury/components/flex";
import { Info, InfoTitle, InfoSubtitle } from "@mui-treasury/components/info";
import { useTutorInfoStyles } from "@mui-treasury/styles/info/tutor";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { Button } from "antd";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 300,
    minWidth: 300,

    "&:hover": {
      backgroundColor: "#fff",
      transform: "translateY(-2px)",
      "& $shadow": {
        bottom: "-1.5rem",
      },
      "& $shadow2": {
        bottom: "-2.5rem",
      },
    },
  },

  action: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px 0 rgba(0,0,0,0.12)",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#000",
    },
  },
}));

export const UserCard = React.memo(function TutorCard(props) {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6, radius: "3px" });
  const avatarStyles = useDynamicAvatarStyles({ radius: 12, size: 40 });
  return (
    <Row
      p={1.5}
      gap={2}
      bgcolor={"#f5f5f5"}
      borderRadius={2}
      className={styles.root}
    >
      <Item>
        <Avatar classes={avatarStyles} src={props.imageUrl} />
      </Item>
      <Info position={"middle"} useStyles={useTutorInfoStyles}>
        <InfoTitle>{props.name || "Name "}</InfoTitle>
        <InfoSubtitle>{`@${props.username || "Username"}`}</InfoSubtitle>
      </Info>
      {props.iconButtons ? (
        <>
          <Item ml={5} position={"middle"}>
            <IconButton
              className={styles.action}
              onClick={props.onClickCancel}
              classes={iconBtnStyles}
            >
              <Block />
            </IconButton>
          </Item>
          <Item position={"middle"}>
            <IconButton
              className={styles.action}
              onClick={props.onClickDone}
              classes={iconBtnStyles}
            >
              <Done />
            </IconButton>
          </Item>
        </>
      ) : null}
    </Row>
  );
});
