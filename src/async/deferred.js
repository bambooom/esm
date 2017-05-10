export default function Deferred() {
  const obj = Object.create(null);
  obj.promise = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  Object.freeze(obj);

  return obj;
};

