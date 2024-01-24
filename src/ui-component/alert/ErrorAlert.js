import {IconAlertTriangle} from "@tabler/icons";
import {Typography} from "@mui/material";

// eslint-disable-next-line react/prop-types
const ErrorAlert = ({ message }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconAlertTriangle style={{ marginRight: '8px', color: 'red' }} />
        <Typography color="error">{message}</Typography>
    </div>
);

export default ErrorAlert;