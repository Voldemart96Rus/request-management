import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import {Form, Button} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

import Alerts from '../components/layout/Alerts';

const initialState = {
    companyName: '',
    fio: '',
    phone: '',
    ati: '',
    comment: '',
};

const RequestForm = ({
    sendRequest,
    requestItem = null,
    disabled = false,
    history,
}) => {
    const [state, setState] = useState(initialState);
    const [alerts, setAlerts] = useState([]);
    const [editable, setEditable] = useState(false);
    const [deleteReq, setDeleteReq] = useState(false);

    const removeAlert = (id) =>
        setAlerts(alerts.filter((alert) => alert.id !== id));

    useEffect(() => {
        if (requestItem) {
            setState(requestItem);
            setEditable(true);
        }
    }, [requestItem]);

    useEffect(() => {
        if (disabled) setEditable(true);
    }, [disabled]);

    const deleteRequest = async () => {
        try {
            const res = await fetch(`/api/Requests/delete/${requestItem._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (res.ok) {
                setAlerts([
                    {
                        id: uuidv4(),
                        text: `Заявка № ${data.id} успешно удалена.`,
                        variant: 'success',
                    },
                    ...alerts,
                ]);
                setDeleteReq(true);
                // setTimeout(() => history.push('/'), 1500);
            } else {
                setAlerts([
                    {
                        id: uuidv4(),
                        text: 'Ошибка при удалении заявки. Попробуйте еще раз.',
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

    const onChange = (e) => {
        setState({...state, [e.target.id]: e.target.value});
    };

    const onATIChange = (e) => {
        const value = e.target.value;
        if (/^\d+$/.test(value)) setState({...state, [e.target.id]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (/^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(state.phone)) {
            sendRequest(state);
            setState(initialState);
        } else {
            setAlerts([
                {
                    id: uuidv4(),
                    text: 'Заполните номер телефона.',
                    variant: 'danger',
                },
                ...alerts,
            ]);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Alerts alerts={alerts} removeAlert={removeAlert} />
            <h1>{requestItem ? 'Заявка № ' + state._id : 'Создание заявки'}</h1>
            <Form.Group controlId="companyName" onChange={onChange}>
                <Form.Label>Название организации</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ИП «Перевозчиков»"
                    value={state.companyName}
                    onChange={onChange}
                    disabled={editable}
                    required
                />
            </Form.Group>
            <Form.Group controlId="fio">
                <Form.Label>Фамилия Имя Отчество</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    value={state.fio}
                    onChange={onChange}
                    disabled={editable}
                    required
                />
            </Form.Group>
            <Form.Group controlId="phone">
                <Form.Label>Телефон</Form.Label>
                <InputMask
                    className="form-control"
                    mask="+7\ (999) 999 99 99"
                    id="phone"
                    maskChar="_"
                    placeholder="+7 (900) 999 99 99"
                    value={state.phone}
                    onChange={onChange}
                    disabled={editable}
                    required
                />
            </Form.Group>
            <Form.Group controlId="ati">
                <Form.Label>ATI код сети перевозчика</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Код ATI"
                    value={state.ati}
                    onChange={onATIChange}
                    disabled={editable}
                    required
                />
                <Form.Text className="text-muted">
                    ATI код сети перевозчика с сайта ati.su
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="comment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    value={state.comment}
                    onChange={onChange}
                    disabled={editable}
                />
            </Form.Group>

            <Button
                type="submit"
                className="mr-4"
                variant="success"
                hidden={editable | deleteReq}
            >
                Отправить
            </Button>
            {requestItem && (
                <>
                    <Button
                        className="mr-4"
                        hidden={deleteReq}
                        variant="dark"
                        onClick={() => {
                            setEditable(!editable);
                            setState(requestItem);
                        }}
                    >
                        {editable ? 'Редактировать' : 'Отменить'}
                    </Button>
                    <Button
                        variant="danger"
                        hidden={deleteReq}
                        onClick={deleteRequest}
                    >
                        Удалить
                    </Button>
                </>
            )}
        </Form>
    );
};

RequestForm.propTypes = {
    sendRequest: PropTypes.func.isRequired,
    requestItem: PropTypes.object,
    disabled: PropTypes.bool,
    history: PropTypes.object,
};

export default RequestForm;
