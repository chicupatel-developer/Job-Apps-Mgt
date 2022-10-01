export function getProvinces() {
  return ["MB", "ON", "AB", "SK", "BC"];
}

export function getCities(province) {
  if (province === "MB") return ["Winnipeg", "Brandon"];
  if (province === "ON") return ["Toronto", "Missisauga", "Brampton", "London"];
  if (province === "AB") return ["Calgary", "Edmonton"];
  if (province === "BC") return ["Vancouver", "Burnaby"];
  if (province === "SK") return ["Saskatoon", "Regina"];
}

export function getAppStatus(appStatusTypes, appStatus) {
  return appStatusTypes[appStatus];
}

export function getAppStatusTypeColor(appStatusType) {
  if (appStatusType === 0) return "maroon";
  if (appStatusType === 1) return "blue";
  if (appStatusType === 2) return "green";
  if (appStatusType === 3) return "red";
  if (appStatusType === 6) return "orange";
  else return "purple";
}

export function displayBtn(appStatusType) {
  if (appStatusType <= 5) return true;
  if (appStatusType === 6) return false;
}

// this will display jobDetails[] @UI
export function displayJobDetails(parts) {
  if (parts.length > 1) {
    return (
      <div>
        {parts.map((part, i) => {
          return (
            <div key={i}>
              <span>* {part}</span>
              <br />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <span>* {parts[0]}</span>
      </div>
    );
  }
}

// this will return jobDetails as []
// when you want to display jobDetails as [] @ UI,,, then displayFlag=true
// when you just want jobDetails as [],,, then displayFlag=false
export function getJobDetails(jobDetails, displayFlag) {
  const indexes = [];
  for (let i = 0; i < jobDetails.length; i++) {
    if (jobDetails[i] === "\n") {
      indexes.push(i);
    }
  }

  var parts = [];
  var start = 0;
  for (let i = 0; i < indexes.length; i++) {
    var part = jobDetails.substring(start, indexes[i]);
    parts.push(part);
    start = indexes[i];
  }

  console.log("length of indexes,,,", indexes.length);
  if (jobDetails.length - 1 > indexes[indexes.length - 1]) {
    console.log(",,,");
    parts.push(jobDetails.substring(indexes[indexes.length - 1]));
  }

  // jobDetails[] is ready as parts[]
  console.log(parts);

  // for display
  /*
  if (parts.length > 1) {
    return (
      <div>
        {parts.map((part, i) => {
          return (
            <div>
              <span>* {part}</span>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
  */

  if (indexes.length < 1 && jobDetails !== null && jobDetails !== "") {
    parts[0] = jobDetails;
  }
  if (displayFlag) {
    return displayJobDetails(parts);
  } else {
    return parts;
  }
}
