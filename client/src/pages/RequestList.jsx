import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import {v4 as uuidv4} from 'uuid';

import Alerts from '../components/layout/Alerts';
import Preloader from '../components/layout/Preloader';

import Search from '../components/Search';

const RequestList = ({history}) => {
    const [alerts, setAlerts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [isSortedByAsc, setIsSortedByAsc] = useState({
        _id: null,
        companyName: null,
        fio: null,
        phone: null,
        date: null,
    });

    const removeAlert = (id) =>
        setAlerts(alerts.filter((alert) => alert.id !== id));

    useEffect(() => {
        const getRequestList = async () => {
            try {
                const res = query
                    ? await fetch(
                          `/api/Requests/search/${encodeURI(query.trim())}`
                      )
                    : await fetch(`/api/Requests/getRequestList`);
                const data = await res.json();
                if (res.ok) {
                    setRequests(data);
                    setLoading(false);
                } else {
                    setAlerts([
                        {
                            id: uuidv4(),
                            text:
                                'Ошибка при загрузке списка заявок. Попробуйте еще раз.',
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
        getRequestList();
    }, [query, alerts, setAlerts, setRequests, setLoading]);

    const openDetailsPage = (e) => {
        if (e.target.parentElement.tagName !== 'TD') {
            const requestId = requests[e.target.parentElement.id]._id;
            history.push('/request-details/' + requestId);
        }
    };

    if (loading) {
        return <Preloader />;
    }

    const sortTable = (e) => {
        const {sortAs, field} = e.currentTarget.dataset;
        if (sortAs === 'string') {
            setRequests(
                requests.sort((a, b) =>
                    isSortedByAsc[field]
                        ? a[field].localeCompare(b[field])
                        : b[field].localeCompare(a[field])
                )
            );
        } else {
            setRequests(
                requests.sort((a, b) =>
                    isSortedByAsc[field]
                        ? new Date(a[field]) - new Date(b[field])
                        : new Date(b[field]) - new Date(a[field])
                )
            );
        }
        setIsSortedByAsc({...isSortedByAsc, [field]: !isSortedByAsc[field]});
    };

    const getArrowClassName = (field) => {
        const classList = ['filter-arrow'];

        if (isSortedByAsc[field] === null) {
            classList.push('filter-arrow_color_grey');
        } else if (isSortedByAsc[field]) {
            classList.push('filter-arrow_desc');
        } else {
            classList.push('filter-arrow_asc');
        }

        return classList.join(' ');
    };

    return (
        <>
            <Alerts alerts={alerts} removeAlert={removeAlert} />
            <Search setQuery={setQuery} />
            {requests.length === 0 ? (
                <div>Заявок нет</div>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th
                                data-sort-as="string"
                                data-field="_id"
                                onClick={sortTable}
                                className="cursor-pointer"
                            >
                                <span className="th-inner">
                                    №
                                    <img
                                        className={getArrowClassName('_id')}
                                        src="/next.svg"
                                        alt="фильтр"
                                        title="фильтр"
                                    />
                                </span>
                            </th>

                            <th
                                data-sort-as="string"
                                data-field="companyName"
                                onClick={sortTable}
                                className="cursor-pointer"
                            >
                                <span className="th-inner">
                                    Компания
                                    <img
                                        className={getArrowClassName(
                                            'companyName'
                                        )}
                                        src="/next.svg"
                                        alt="фильтр"
                                        title="фильтр"
                                    />
                                </span>
                            </th>
                            <th
                                data-sort-as="string"
                                data-field="fio"
                                onClick={sortTable}
                                className="cursor-pointer"
                            >
                                <span className="th-inner">
                                    Перевозчик
                                    <img
                                        className={getArrowClassName('fio')}
                                        src="/next.svg"
                                        alt="фильтр"
                                        title="фильтр"
                                    />
                                </span>
                            </th>
                            <th
                                data-sort-as="string"
                                data-field="phone"
                                onClick={sortTable}
                                className="cursor-pointer"
                            >
                                <span className="th-inner">
                                    Телефон
                                    <img
                                        className={getArrowClassName('phone')}
                                        src="/next.svg"
                                        alt="фильтр"
                                        title="фильтр"
                                    />
                                </span>
                            </th>
                            <th
                                data-sort-as="number"
                                data-field="date"
                                onClick={sortTable}
                                className="cursor-pointer"
                            >
                                <span className="th-inner">
                                    Дата и время
                                    <img
                                        className={getArrowClassName('date')}
                                        src="/next.svg"
                                        alt="фильтр"
                                        title="фильтр"
                                    />
                                </span>
                            </th>
                            <th className="cursor-pointer">ATI</th>
                        </tr>
                    </thead>
                    <tbody className="cursor-pointer" onClick={openDetailsPage}>
                        {requests.map((el, i) => (
                            <tr id={i} key={el._id}>
                                <td className="request-id">{el._id}</td>
                                <td>{el.companyName}</td>
                                <td>{el.fio}</td>
                                <td>{el.phone}</td>
                                <td>{new Date(el.date).toLocaleString()}</td>
                                <td>
                                    <a
                                        href={`https://ati.su/firms/${el.ati}/info`}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        ati.su
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default RequestList;
