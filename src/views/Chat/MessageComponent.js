import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MessageComponent = ({ message, date, isCurrentUser }) => {
  const theme = useTheme();
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'UTC' // Adjust the time zone as needed
    };

    return date.toLocaleString('en-US', options);
  };
  return (
    <>
      <Paper
        elevation={1}
        style={{
          display: 'inline-block',
          // maxWidth: '50%',
          padding: ' 5%',
          borderBottomRightRadius: isCurrentUser ? '0' : '12',
          borderBottomLeftRadius: isCurrentUser ? '12' : '0',
          backgroundColor: isCurrentUser ? theme.palette.secondary.light : theme.palette.grey.A200
        }}
      >
        <Typography variant={'subtitle1'}>{message}</Typography>
        <br />
        <Typography variant={'subtitle2'} style={{ marginTop: '2%', textAlign: isCurrentUser ? 'end' : 'start' }}>
          {formatDate(date)}
        </Typography>
      </Paper>
    </>
  );
};
export default MessageComponent;
