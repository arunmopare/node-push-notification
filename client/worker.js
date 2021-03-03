console.log("service worker loaded");

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push received...");
  self.registration.showNotification(data.title, {
    body: "Notified By Arun",
    icon:
      "https://www.brandcrowd.com/gallery/brands/pictures/picture13268012627052.jpg",
  });
});
