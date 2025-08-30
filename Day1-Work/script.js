document.getElementById("user-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) return;

  const li = document.createElement("li");
  li.textContent = `${name} - ${email}`;

  document.getElementById("user-list").appendChild(li);

  // Clear input fields
  document.getElementById("name").value = '';
  document.getElementById("email").value = '';
});
