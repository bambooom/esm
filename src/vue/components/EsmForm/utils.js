function addNameToDataURL(dataURL, name) {
  return dataURL.replace(";base64", `;name=${name};base64`);
}


function processFile(file, {fillName = true} = {}) {
  const { name, size, type } = file;
  return new Promise((resolve) => {
    const reader = new window.FileReader();
    reader.onload = event => {
      let data = event.target.result;
      resolve({
        dataURL: fillName ? addNameToDataURL(data, name) : data,
        name,
        size,
        type,
      });
    };
    reader.readAsDataURL(file);
  });
}


export function processFiles(files, opt) {
  return Promise.all([].map.call(files, file => processFile(file, opt)));
}
