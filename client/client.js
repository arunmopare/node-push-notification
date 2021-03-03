const publicVapidKey =
  "BN-StMNAjk8g8SO6P2kZGnhKYecUveszCSa_aYMDBmD67tRN_9mu0lr9FbvRGIAm9d9YYdI5tjhxCBZSfQqg184";

//   check for service worker

if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// register service worker, Register Push, send Push
async function send() {
  //   register SW
  console.log("Registering SW");
  const register = await navigator.serviceWorker.register("./worker.js", {
    scope: "/",
  });
  console.log("SW Registered");

  //   Register Push
  console.log("Registering Push");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Push Registered");

  //   send push notification
  console.log("Sending Push");

  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("push sent");
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
