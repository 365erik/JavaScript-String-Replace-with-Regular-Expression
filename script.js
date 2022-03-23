const replaceFirstMatch = (str) =>
  str.replace(/{{(.*?)}}/, `<span style="color:green">$1</span>`);

// Use /g flag in your regex to enable greedy matching
const replaceAllMatches = (str) =>
  str.replace(/{{(.*?)}}/g, `<span style="color:blue">$1</span>`);

const useStringPrototypeReplaceAll = (str) => {
  if (typeof str.replaceAll === "function") {
    // Note replaceAll() requires explicit
    // instantiation of a RegExp object.
    const re = new RegExp("{{(.*?)}}", "g");
    return str.replaceAll(re, `<span style="color:red">$1</span>`);
  }

  return `String.prototype.replaceAll() is supported in most browsers, 
		but you won't find it in Nodejs until v15 and greater.`;
};

// Demo Setup
const handleTextAreaInput = (str, el) => {
  el.innerHTML = "";

  const examples = [
    `<p>${replaceFirstMatch(str)}</p>`,
    `<p>${replaceAllMatches(str)}</p>`,
    `<p>${useStringPrototypeReplaceAll(str)}</p>`,
  ];

  examples.forEach((example) => el.insertAdjacentHTML("beforeend", example));
};

document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("TextArea");
  const outputArea = document.getElementById("OutputArea");

  if (textArea && outputArea) {
    handleTextAreaInput(textArea.value, outputArea);
    textArea.addEventListener("input", (ev) =>
      handleTextAreaInput(ev.target.value, outputArea)
    );
  }
});
