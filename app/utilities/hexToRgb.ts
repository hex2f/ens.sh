export default function hexToRgb(hex: string): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (hex.length == 4) {
    r = Number("0x" + hex[1] + hex[1]);
    g = Number("0x" + hex[2] + hex[2]);
    b = Number("0x" + hex[3] + hex[3]);
  } else if (hex.length == 7) {
    r = Number("0x" + hex[1] + hex[2]);
    g = Number("0x" + hex[3] + hex[4]);
    b = Number("0x" + hex[5] + hex[6]);
  }
  return [r, g, b];
}