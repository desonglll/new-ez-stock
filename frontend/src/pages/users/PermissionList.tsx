import {useEffect, useState} from "react";
import {get_permissions} from "../../utils/users.ts";
import {Table, TablePaginationConfig} from "antd";

export function PermissionList() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState();
    const [count, setCount] = useState(0);
    const columns = [
        {
            title: 'codename',
            dataIndex: 'codename',
            key: 'codename',
        },
        {
            title: 'content_type',
            dataIndex: 'content_type',
            key: 'content_type',
        },
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
    ];
    const onPageChange = (event: TablePaginationConfig) => {
        console.log(event)
        fetchData(event.pageSize, event.current).then((mappedItems) => {
            setItems(mappedItems)
        })
    }
    const fetchData = async (limit: number = 10, offset: number = 0) => {
        const resp = await get_permissions(limit, offset)
        console.log(resp)
        const mappedItems = resp.results.map((item: {
            codename: string,
            content_type: number,
            id: number,
            name: string
        }) => ({
            codename: item.codename,
            content_type: item.content_type,
            id: item.id,
            name: item.name
        }))
        setItems(mappedItems)
        setCount(resp.count)
        return mappedItems
    }
    useEffect(() => {
        fetchData().then(() => {
        }).finally(() => {
            setLoading(!loading)
        })
    }, []);
    return (
        <>
            {loading ? (<div></div>) : (
                <div>
                    <Table dataSource={items} columns={columns} rowKey={"id"}
                           pagination={{total: count}}
                           onChange={(e) => onPageChange(e)}
                    />
                </div>
            )}

        </>
    );
}