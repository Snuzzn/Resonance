import React from "react";
import { FormControl, Select, MenuItem, makeStyles } from "@material-ui/core";

const options = ["To consume", "Consumed", "Favourites"];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuItem: {},
}));

export default function StatusButton() {
  const classes = useStyles();
  const [status, setStatus] = React.useState("To consume");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={status}
        onChange={handleChange}
        className={classes.menuItem}
      >
        <MenuItem value="To consume">To consume</MenuItem>
        <MenuItem value="Consumed">Consumed</MenuItem>
        <MenuItem value="Favourites">Favourites</MenuItem>
      </Select>
    </FormControl>
  );
}
