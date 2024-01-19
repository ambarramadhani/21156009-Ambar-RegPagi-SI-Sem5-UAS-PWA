// Inisialisasi IndexedDB
var db;
var request = indexedDB.open("komentarDB", 1);

request.onerror = function (event) {
  console.log("Error saat membuka database: " + event.target.errorCode);
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  var objectStore = db.createObjectStore("message", {
    keyPath: "id",
    autoIncrement: true,
  });
  objectStore.createIndex("name", "name", { unique: false });
  objectStore.createIndex("e-mail", "email", { unique: false });
  objectStore.createIndex("no", "no", { unique: false });
  objectStore.createIndex("message", "message", { unique: false });
};

request.onsuccess = function (event) {
  db = event.target.result;
  // showComments();
};

// Menambahkan komentar ke dalam IndexedDB
document.getElementById("myroom").addEventListener("submit", function (event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var no = document.getElementById("no").value;
  var message = document.getElementById("message").value;

  var transaction = db.transaction(["message"], "readwrite");
  var objectStore = transaction.objectStore("message");
  var comment = { name: name, email: email, no: no, message: message };
  objectStore.add(comment);

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("no").value = "";
  document.getElementById("message").value = "";

  transaction.oncomplete = function () {
    alert("Komentar telah disimpan.");
    document.getElementById("myroom").reset();
  };

  transaction.onerror = function (event) {
    console.error("Kesalahan saat menyimpan komentar: " + event.target.error);
  };

  // showComments();
});
