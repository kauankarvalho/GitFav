export function toggleButtonAttributesAndClass(button) {
  button.toggleAttribute("disabled")
  button.classList.toggle("group")
}
