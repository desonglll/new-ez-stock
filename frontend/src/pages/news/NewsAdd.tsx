import {Button, Card, Form, Input} from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {Fade} from "@material-ui/core";

export function NewsAdd() {
    const instace = axios.create()
    return (
        <>
            <Fade in={true} timeout={500}>
                <Card>
                    <Form
                        onFinish={(event) => {
                            console.log(event)
                            instace.post("api/news/add/", event, {
                                headers: get_headers()
                            }).then((res) => {
                                console.log(res)
                            })
                        }}
                    >
                        <FormItem name={"title"} label={"Title"}>
                            <Input/>
                        </FormItem>
                        <FormItem name={"content"} label={"Content"}>
                            <Input/>
                        </FormItem>
                        <FormItem>
                            <Button htmlType={"submit"}>Submit</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Fade>
        </>
    );
}