import {
  FaAmbulance,
  FaAsterisk,
  FaBolt,
  FaRegFile,
  FaWpforms,
} from 'react-icons/fa';
import {
  RiCalendarCheckFill,
  RiGalleryFill,
  RiMoneyCnyBoxLine,
  RiSuitcaseLine,
} from 'react-icons/ri';
import { GiBookshelf, GiSuitcase } from 'react-icons/gi';
import { BsFillGrid1X2Fill, BsKanbanFill } from 'react-icons/bs';

import { SiGooglecalendar } from 'react-icons/si';
import { ViewSchemaType } from '@/models/types';

export const DefaultIcon = FaRegFile;

export const IconNames = {
  asterisk: FaAsterisk,
  suitcase: RiSuitcaseLine,
  calendar: RiCalendarCheckFill,
  money: RiMoneyCnyBoxLine,
  bolt: FaBolt,
  suitcaseAlt: GiSuitcase,
  ambulance: FaAmbulance,
  book: GiBookshelf,
  blank: FaRegFile,
};
export type AppIconTypes = keyof typeof IconNames;

export function getAppIcon(name: AppIconTypes | null) {
  if (name) {
    const icon = IconNames[name];
    if (icon) {
      return icon;
    } else {
      return IconNames['blank'];
    }
  } else {
    return IconNames['blank'];
  }
}

const ViewTypeIcons = {
  grid: BsFillGrid1X2Fill,
  calendar: SiGooglecalendar,
  kanban: BsKanbanFill,
  gallery: RiGalleryFill,
  form: FaWpforms,
};

export function getViewTypeIcon(viewType: ViewSchemaType | null | undefined) {
  if (viewType) {
    const icon = ViewTypeIcons[viewType];
    if (icon) {
      return icon;
    } else {
      return DefaultIcon;
    }
  } else {
    return DefaultIcon;
  }
}
