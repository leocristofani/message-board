import { makeStyles, Theme } from "@material-ui/core";

interface StyleProps {
  bgColor: string;
}

const styles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    backgroundColor: ({ bgColor }) => bgColor,
  },
  content: {
    paddingBottom: 0,
  },
  actions: {
    paddingRight: 0,
    paddingLeft: 0,
    display: "block",
    textAlign: "right",
  },
  clearButton: {
    textTransform: "none",
  },
}));

export default styles;
