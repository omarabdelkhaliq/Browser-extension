

export function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}
export function loadData() {
  const text = localStorage.getItem("data");
  return JSON.parse(text);
}