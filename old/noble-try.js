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
  peripheral.once('connect', (_peripheral) => {
    console.log("CONNECT!")
    console.log('connected to:', _peripheral)
  });

  if (peripheral.connectable) {
    console.log(`${peripheral.uuid} connetable, trying to connect`)
    peripheral.connect()
  }

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
