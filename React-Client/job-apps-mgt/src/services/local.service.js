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
