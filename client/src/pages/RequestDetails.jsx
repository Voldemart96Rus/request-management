import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import Alerts from '../components/layout/Alerts';
import RequestForm from '../components/RequestForm';
import Preloader from '../components/layout/Preloader';

const RequestDetails = ({history}) => {
    const [alerts, setAlerts] = useState([]);
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(false);

    const removeAlert = (id) =>
        setAlerts(alerts.filter((alert) => alert.id !== id));

    useEffect(() => {
        const requestId = history.location.pathname.replace(
            '/request-details/',
            ''
        );
        async function getRequest(requestId) {
            try {
                const res = await fetch(
                    `/api/Requests/getRequest/${requestId}`
                );
                if (res.ok) {
                    const data = await res.json();
                    setRequest(data);
                } else {
                    setAlerts([
                        {
                            id: uuidv4(),
                            text: 'Данная заявка не существует',
                            variant: 'danger',
                        },
                        ...alerts,
                    ]);

                    setRequest(null);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getRequest(requestId);
        // eslint-disable-next-line
    }, [history.location.pathname, setAlerts]);

    const changeRequest = async ({fio, companyName, phone, comment, ati}) => {
        setLoading(true);
        const id = request._id;
        try {
            const res = await fetch(`/api/Requests/changeRequest`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id,
                    fio,
                    companyName,
                    phone,
                    comment,
                    ati,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setRequest(data);
                setAlerts([
                    {
                        id: uuidv4(),
                        text: 'Заявка изменена',
                        variant: 'success',
                    },
                    ...alerts,
                ]);
            } else {
                setAlerts([
                    {
                        id: uuidv4(),
                        text:
                            'Ошибка при изменение заявки. Попробуйте еще раз.',
                        variant: 'danger',
                    },
                    ...alerts,
                ]);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <>
            <Alerts alerts={alerts} removeAlert={removeAlert} />
            {request && (
                <RequestForm
                    sendRequest={changeRequest}
                    requestItem={request}
                    disabled={true}
                    history={history}
                />
            )}
        </>
    );
};

export default RequestDetails;
