import React from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Alerts = ({alerts, removeAlert}) => {
    return (
        Array.isArray(alerts) && (
            <>
                {alerts.map(({id, text, variant, link}) => (
                    <Alert
                        key={id}
                        variant={variant}
                        className="d-flex"
                        onClose={() => removeAlert(id)}
                        dismissible
                    >
                        <p className="mr-4 mb-0">{text}</p>
                        {link && <Link to={link}>Посмотреть</Link>}
                    </Alert>
                ))}
            </>
        )
    );
};

Alerts.propTypes = {
    alerts: PropTypes.array.isRequired,
};

export default Alerts;
