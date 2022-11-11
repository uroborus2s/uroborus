import createBox from '@mui/system/createBox';
import { OverridableComponent } from '@mui/types';
import { BoxTypeMap } from '@mui/system';
import defaultTheme from '../styles/defaultTheme';

const Div: OverridableComponent<BoxTypeMap> = createBox({ defaultTheme });

export default Div;
