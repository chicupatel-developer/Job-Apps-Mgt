import React from "react";

const Tracking_Data = ({ bgcolor, height, appCompleted, appStatusDisplay }) => {
  const Parentdiv = {
    height: height,
    width: "90%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
    margin: 50,
  };

  const Childdiv = {
    height: "100%",
    width: `${appCompleted}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progressText = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  const appStatusDisplayText = {
    padding: 10,
    color: "black",
    fontWeight: 900,
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progressText}>{`${appCompleted}%`}</span>
      </div>
      <span style={appStatusDisplayText}>{appStatusDisplay}</span>
    </div>
  );
};

export default Tracking_Data;
