import {Button, Result} from "antd";

export function Notfound() {
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => {
                    window.location.href = "/workspace"
                }}>Back To WorkSpace</Button>}
            />
        </>
    );
}