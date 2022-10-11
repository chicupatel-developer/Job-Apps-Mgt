import React from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageHeader: {},
  pageTitle: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid red",
    borderRadius: "10px",
    backgroundColor: "lightgoldenrodyellow",
    color: "blue",
    fontSize: "large; ",
  },
  titleHeader: {
    textAlign: "center",
    verticalAlign: "middle",
    marginTop: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "20px",
    border: "2px solid green",
    borderRadius: "10px",
    backgroundColor: "lightskyblue",
    color: "black",
    fontSize: "large; ",
  },
}));

const Home = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.pageHeader}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={1}>
          <div></div>
        </Grid>
        <Grid item xs={12} sm={12} md={10}>
          <div className={classes.pageTitle}>
            <div>Job-Apps MGT</div>
            <br />
            <div>
              Web API Core - 3.1, EF Core [Code First - EF Transaction] / SQL
              Server / Angular / React
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={1}>
          <div></div>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={1}></Grid>
        <Grid item xs={12} sm={12} md={10}>
          <hr />
        </Grid>
        <Grid item xs={12} sm={12} md={1}></Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={1}></Grid>
        <Grid item xs={12} sm={12} md={5}>
          <div className={classes.titleHeader}>
            <b>Apply - Job</b>
          </div>
          <div>
            <ul>
              <li>
                User can Apply To Job [Initially Application Status = Applied]
              </li>
            </ul>
          </div>

          <p></p>
          <hr />
          <div className={classes.titleHeader}>
            <b>Follow Up - Job</b>
          </div>
          <div>
            <ul>
              <li>User can Follow Up Applied Job</li>
              <li>
                Application Status == (Any != [Closed])
                <ul>
                  <b>User can --&gt;</b>
                  <li>[View / Edit / Delete] Job</li>
                  <li>Upload (Connect) Resume File To A Job</li>
                  <li>Download Resume File Connected To A Job</li>
                  <li>Track Application Status by Date &amp; Time wise</li>
                </ul>
              </li>
              <li>
                Application Status == [Closed]
                <ul>
                  <b>User can --&gt;</b>
                  <li>[View / Delete] Job</li>
                  <li>Download Resume File Connected To A Job</li>
                  <li>Track Application Status by Date &amp; Time wise</li>
                </ul>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <div className={classes.titleHeader}>
            <b>Resume - Creator</b>
          </div>
          <div>
            <ul>
              <li>Create Personal Info [Add / Edit]</li>
              <li>Create Technical Skills [Add / Edit]</li>
              <li>Create Work Experience(s) [Add / Edit / Remove]</li>
              <li>Create Education(s) [Add / Edit / Remove]</li>
              <li>
                My - Resume
                <ul>
                  <b>User can --&gt;</b>
                  <li>
                    View Resume [Generate PDF Resume File and Download To User's
                    Computer]
                  </li>
                  <li>
                    Email Resume [Generate PDF Resume File and Email as
                    Attachment To User's Email Address]
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <p></p>
          <hr />
          <div className={classes.titleHeader}>
            <b>User - Data</b>
          </div>
          <div>
            <ul>
              <li>
                View User's Data By Resume-Created and Downloaded To User's
                Computer
              </li>
              <li>View User's Data By Resume-Created and Emailed To User</li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={1}></Grid>
      </Grid>
    </div>
  );
};

export default Home;
