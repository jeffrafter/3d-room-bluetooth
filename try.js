const noble = require("noble-mac");

const servicesDiscovered = (peripheral) => {
  return (services) => {
    console.log(`services for ${peripheral.uuid}`)
    console.log({ services })
  }
}

noble.on("discover", peripheral => {
  console.log("------------------- NEW PERIPHERAL -------------------------")
  console.log({ peripheral });

  peripheral.once('servicesDiscover', servicesDiscovered(peripheral))

  peripheral.discoverServices()

  // noble.stopScanning(); // any service UUID, no duplicates
});

noble.on("warning", message => {
  console.log("WARNING: " + message);
});

noble.on("stateChange", state => {
  console.log("STATE CHANGE");
  console.log({ state });
  noble.startScanning(); // any service UUID, no duplicates
});
