import { makeStyles, Theme } from "@material-ui/core";

const styles = makeStyles<Theme>((theme) => ({
  label: {
    lineHeight: 1,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export default styles;
