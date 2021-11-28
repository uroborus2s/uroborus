import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

const SingleLineTextFiled = () => {
  return (
    <div style={{ padding: '0.5rem 0' }}>
      <Typography sx={{ opacity: 0.75 }}>
        单行文本。您可以选择使用默认值填充单元格：
      </Typography>
      <Typography
        sx={{
          marginTop: '0.5rem',
          marginBottom: '0.25rem',
          fontWeight: 500,
          opacity: 0.75,
        }}
      >
        默认值<span style={{ fontSize: '11px', opacity: 0.5 }}>(选填)</span>
      </Typography>
      <Input
        sx={{
          width: '100%',
          borderRadius: '3px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'rgba(0,0,0,0.05)',
          '&.Mui-focused': { borderColor: 'rgba(0,0,0,0.25)' },
        }}
        placeholder="新增记录单元格默认值"
        disableUnderline
      />
    </div>
  );
};

export default SingleLineTextFiled;
