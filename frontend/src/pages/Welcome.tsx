import "./Welcome.scss"
import reactLogo from '../assets/react.svg'
import djangoLogo from '../assets/django.svg'
import tsLogo from "../assets/ts-logo-512.svg"
import antDesignLogo from "../assets/ant-design.svg"
import viteLogo from '/vite.svg'
import {Button, Divider} from "antd";
import {useNavigate} from "react-router-dom";
import {Fragment} from "react";
import {Fade} from "@material-ui/core";


export function Welcome() {
    const navigate = useNavigate()
    return (
        <Fragment>
            <Fade in={true} timeout={2000}>

                <div className={"welcomeBody"}>
                    <div>
                        <a href="https://www.djangoproject.com" target="_blank">
                            <img src={djangoLogo} className="logo django" alt="Django logo"/>
                        </a>
                        <a href="https://react.dev" target="_blank">
                            <img src={reactLogo} className="logo react" alt="React logo"/>
                        </a>
                    </div>
                    <div>
                        <a href="https://react.dev" target="_blank">
                            <img src={tsLogo} className="logo typescript" alt="React logo"/>
                        </a>
                        <a href="https://vitejs.dev" target="_blank">
                            <img src={viteLogo} className="logo vite" alt="Vite logo"/>
                        </a>
                        <a href="" target="_blank">
                            <img src={antDesignLogo} className="logo ant-design" alt="Ant Design logo"/>
                        </a>
                    </div>
                    <h1>Django + React + TypeScript + Vite + AntDesign</h1>
                    <Divider/>
                    <Button onClick={() => {
                        navigate("/login")
                    }}>Start</Button>
                </div>
            </Fade>
        </Fragment>
    );
}