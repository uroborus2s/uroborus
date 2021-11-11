import { iconColors } from '@/core/util';
import { base } from '@/domain';
import { useRecoilValue } from 'recoil';

const getFristName = (name: string): string => {
  let fristChar = '';
  if (name.length > 0) {
    if (/[\u4e00-\u9fa5]/.test(name[1])) {
      fristChar = name.substr(0, 1);
    } else {
      fristChar = name.substr(0, 2);
    }
  }
  return fristChar;
};

export default function (baseId: string) {
  const name = useRecoilValue(base.name(baseId));
  const color = useRecoilValue(base.color(baseId));
  const icon = useRecoilValue(base.icon(baseId));
  const fontColor = Object.entries(iconColors)
    .find(([, value]) => value == color)![0]
    .trim()
    .endsWith('Light')
    ? 'hsl(0,0%,20%)'
    : '#fff';

  const fristChar = getFristName(name);

  return {
    baseName: name,
    baseColor: color,
    baseIcon: icon,
    fontColor,
    fristChar,
  };
}
