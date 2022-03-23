export function generateUUID(prefix: string, len: number) {
  let d = new Date().getTime();
  return prefix
    .concat('xxxxxxxxxxxxxxxxyxxxxx4xxxxxxxxx')
    .slice(0, len)
    .replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export function localTimeSting() {
  const date = new Date();
}
