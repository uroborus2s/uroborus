import CircularProgressWithNumber from '@ibr/ibr-loading/LoadingWithNumber';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import { DefaultTheme } from '@mui/styles/defaultTheme';
import makeStyles from '@mui/styles/makeStyles';
import classNames from 'classnames';
import { FC } from 'react';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';

interface UploadFileProps {
  loading: boolean;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
}

const useStyel = makeStyles<DefaultTheme, { loading: boolean }>({
  topBar: {
    display: 'flex',
    justifyContent: 'center',
    height: '40px',
    flex: 'none',
  },
  blankContent: {
    flex: 'auto',
    border: '2px dashed rgba(0,0,0,0.1)',
    borderRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover >.uploadImage': {
      backgroundImage: 'url(/icon-add-files-blue.svg)',
    },
  },
  fspSelect: (props) => ({
    backgroundImage: 'url(/icon-add-files-grey.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 0',
    textAlign: 'center',
    display: props.loading ? 'none' : 'block',
  }),
  fspTextTitle: {
    marginTop: '75px',
    fontSize: '16px',
    color: '#444',
    fontWeight: 500,
  },
  fspTextLable: {
    marginTop: '0.5rem',
    fontSize: '13px',
    color: '#9E9E9E',
    fontWeight: 400,
    lineHeight: '20px',
  },
  fileinput: {
    position: 'absolute',
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
  },
});

const UploadFilePanel: FC<UploadFileProps> = ({ loading, onDrop }) => {
  const classes = useStyel({ loading: loading });

  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xlsx,.xls,.csv',
    multiple: false,
    maxFiles: 1,
    onDrop,
  });

  return (
    <>
      <div className={classes.topBar}>
        <DesktopMacIcon />
      </div>
      <div className={classes.blankContent} {...getRootProps()}>
        <CircularProgressWithNumber loading={loading} duration={2000} />
        <div className={classNames(classes.fspSelect, 'uploadImage')}>
          <div className={classes.fspTextTitle}>
            将文件拖拽到这里或者点击此区域开始导入
          </div>
          <div className={classes.fspTextLable}>支持上传.xlsx/.csv文件</div>
        </div>
        <input {...getInputProps()} />
      </div>
    </>
  );
};

export default UploadFilePanel;
