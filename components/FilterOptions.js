import React from "react";
import { FormControl, Select, MenuItem, makeStyles } from "@material-ui/core";
import { MyContext } from "./context";

const options = ["To consume", "Consumed", "Favourites"];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  menuItem: {},
}));

export default function FilterOptions() {
  const classes = useStyles();
  const { filter, setFilter } = React.useContext(MyContext);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={filter}
        onChange={handleChange}
        className={classes.menuItem}
      >
        <MenuItem value="Unfiltered">Unfiltered</MenuItem>
        <MenuItem value="To consume">To consume</MenuItem>
        <MenuItem value="Consumed">Consumed</MenuItem>
        <MenuItem value="Favourites">Favourites</MenuItem>
      </Select>
    </FormControl>
  );
}
