import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import Alerts from '../components/layout/Alerts';
import RequestForm from '../components/RequestForm';

const CreateRequest = () => {
    const [alerts, setAlerts] = useState([]);

    const removeAlert = (id) =>
        setAlerts(alerts.filter((alert) => alert.id !== id));

    const createRequest = async (request) => {
        try {
            const res = await fetch(`api/Requests/createRequest`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(request),
            });
            if (res.ok) {
                const data = await res.json();
                setAlerts([
                    {
                        id: uuidv4(),
                        text: 'Заявка создана.',
                        link: `/request-details/${data.id}`,
                        variant: 'success',
                    },
                    ...alerts,
                ]);
            } else {
                setAlerts([
                    {
                        id: uuidv4(),
                        text: 'Ошибка при создании заявки. Попробуйте еще раз.',
                        variant: 'danger',
                    },
                    ...alerts,
                ]);
            }
        } catch (error) {
            setAlerts([
                {
                    id: uuidv4(),
                    text: 'Сервер не доступен. Попробуйте еще раз.',
                    variant: 'danger',
                },
                ...alerts,
            ]);
            console.error(error);
        }
    };

    return (
        <>
            <Alerts alerts={alerts} removeAlert={removeAlert} />
            <RequestForm sendRequest={createRequest} />
        </>
    );
};

export default CreateRequest;
