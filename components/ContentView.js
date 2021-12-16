import React from "react";
import ContentCard from "./ContentCard";
import TableView from "../components/TableView";
import { makeStyles } from "@material-ui/core";
import { CssBaseline, Typography, Grid } from "@material-ui/core";
import useSWR from "swr";
import fetcher from "../util/fetcher";
import SkeletonCard from "./SkeletonCard";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import SessionExpiredCheck from "./SessionExpiredCheck";
import { MyContext } from "./context";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { UndrawNoData } from "react-undraw-illustrations";
import Image from "next/image";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  noData: {
    primaryColor: "blue",
  },

  flex: {
    height: "70vh",
    alignItems: "center",
    justifyAligns: "center",
  },

  imageBox: {
    paddingTop: "5em",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function ContentView({ grid }) {
  const router = useRouter();
  const topic = router.query.name;
  const { type, setType, filter } = React.useContext(MyContext);
  const { data, error } = useSWR(
    `/api/content?topic=${topic}&type=${type}&filter=${filter}`,
    fetcher
  );

  const classes = useStyles();
  const { addToast } = useToasts();
  React.useEffect(() => {
    if (error && !data) {
      router.push("/login");
    }
  }, [error]);
  // console.log(filter);
  const theme = useTheme().palette.type;
  console.log(theme);
  return (
    <div className={classes.centered}>
      {grid ? (
        <Grid container spacing={2}>
          {data ? (
            <>
              {data.length == 0 ? (
                <div className={classes.imageBox}>
                  <Image
                    src={`/images/empty_${
                      theme === "dark" ? "dark" : "light"
                    }.svg`}
                    width={350}
                    height={350}
                  />
                </div>
              ) : (
                <>
                  {data.map((card) => (
                    <Grid
                      item
                      key={card._id}
                      _xs={12}
                      _md={6}
                      _lg={4}
                      _xl={3}
                      xxl={1}
                    >
                      <ContentCard data={card} />
                    </Grid>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              <Grid item _xs={12} _md={6} _lg={4} _xl={3} xxl={1}>
                <SkeletonCard />
              </Grid>
              <Grid item _xs={12} _md={6} _lg={4} _xl={3} xxl={1}>
                <SkeletonCard />
              </Grid>
              <Grid item _xs={12} _md={6} _lg={4} _xl={3} xxl={1}>
                <SkeletonCard />
              </Grid>
            </>
          )}
        </Grid>
      ) : (
        <TableView />
      )}
      {error && <SessionExpiredCheck />}
    </div>
  );
}
