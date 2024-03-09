import {Button, Result} from "antd";

export function SignUpSuccess() {
    return (
        <>
            <Result
                status="success"
                title="Successfully Sign Up EZ-Stock!"
                subTitle="Have a good day!"
                extra={[
                    <Button type="primary" onClick={() => {
                        window.location.href = "/login"
                    }}>
                        Go To Login
                    </Button>,
                ]}
            />
        </>
    );
}