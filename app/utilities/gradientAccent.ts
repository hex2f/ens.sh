export default function gradientAccent(dark: boolean, h: number): string {
  if (dark) {
    return `radial-gradient(50% 50% at 50% 50%,hsl(${h}, 35%, 20%) 0,hsl(${h}, 50%, 3%) 100%)`;
  } else {
    return `radial-gradient(50% 50% at 50% 50%,hsl(${h}, 55%, 90%) 0,rgba(255,255,255,1) 100%)`;
  }
}