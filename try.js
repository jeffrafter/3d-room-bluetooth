const noble = require("noble-mac");

noble.on("discover", peripheral => {
  console.log({ peripheral });
  noble.stopScanning(); // any service UUID, no duplicates
});

noble.on("warning", message => {
  console.log("WARNING: " + message);
});

noble.on("stateChange", state => {
  console.log("STATE CHANGE");
  console.log({ state });
  noble.startScanning(); // any service UUID, no duplicates
});
