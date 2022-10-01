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

export function displayJobDetails(jobDetails) {
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

  if (indexes[indexes.length] < jobDetails.length) {
    parts.push(jobDetails.substring(indexes[indexes.length - 1]));
  }

  console.log(parts);

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

  return parts;
}
