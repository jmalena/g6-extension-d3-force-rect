export default function <T>(x: T): () => T {
  return function (): T {
    return x;
  };
}
