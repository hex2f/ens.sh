import { useTheme } from "~/contexts/ThemeContext";
import type { SocialLink } from "~/wallet";

export default function SocialButton({ link }: { link: SocialLink }) {
  const { accent } = useTheme();
  return (
    <a href={link.url} className={`p-3 h-12 w-12 flex items-center justify-center rounded-xl border border-white border-opacity-10 group`} style={{ backgroundColor: accent + "11", boxSizing: 'border-box' }}>
      <svg stroke={link.icon.stroke} fill={link.icon.fill} strokeWidth={link.icon.strokeWidth} viewBox={link.icon.viewBox} className="text-2xl group-hover:scale-105 transition-transform" style={{ color: accent }} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: link.icon.body }}></svg>
    </a>
  );
}