/**
 * Wires the Buttondown embed form when BUTTONDOWN_USERNAME is set.
 * Until then, the form stays hidden and the "Subscriptions opening soon"
 * message remains visible. Does not POST to a broken placeholder URL.
 *
 * Documented embed shape (Buttondown HTML form):
 *   action  https://buttondown.com/api/emails/embed-subscribe/{username}
 *   method  post
 *   target  popupwindow
 *   email input name="email"
 *   hidden input name="embed" value="1"
 */
(function () {
  var PLACEHOLDER = "BUTTONDOWN_USERNAME";

  function username() {
    var value = window.BUTTONDOWN_USERNAME;
    if (typeof value !== "string") return "";
    return value.trim();
  }

  function ready(name) {
    return name && name !== PLACEHOLDER;
  }

  function setup(root) {
    var name = username();
    var form = root.querySelector("form.embeddable-buttondown-form");
    var soon = root.querySelector(".subscribe-soon");
    if (!form) return;

    if (!ready(name)) {
      form.hidden = true;
      form.removeAttribute("action");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
      });
      if (soon) soon.hidden = false;
      return;
    }

    form.hidden = false;
    form.setAttribute("method", "post");
    form.setAttribute("target", "popupwindow");
    form.setAttribute(
      "action",
      "https://buttondown.com/api/emails/embed-subscribe/" + encodeURIComponent(name)
    );
    form.addEventListener("submit", function () {
      window.open("https://buttondown.com/" + encodeURIComponent(name), "popupwindow");
    });
    if (soon) soon.hidden = true;
  }

  document.querySelectorAll("[data-subscribe]").forEach(setup);
})();
