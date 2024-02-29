import {get_users} from "../../utils/users.ts";
import {useEffect, useState} from "react";
import {Table, TableProps} from "antd";
import {User} from "../../utils/models.ts";

export function UserList() {
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState<User[]>();
    const fetchData = async () => {
        return await get_users()
    }
    const columns: TableProps<User>['columns'] = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
    ]
    useEffect(() => {
        fetchData().then((e) => {
            setItems(e.results)
        }).finally(() => {
            setLoading(!loading)
        })
    }, []);
    return (
        <>
            {loading ? (<div></div>) : (
                <>
                    <Table dataSource={items} columns={columns} rowKey={"id"}/>
                </>
            )}
        </>
    );
}