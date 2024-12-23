import React, { useEffect, useState } from "react";
import "./styles/demo.css";
import InputForm from "../../shared/components/form/InputForm";
import {observer} from "mobx-react";
import InputEmail from "../../shared/components/form/InputEmail";
import {demoStore} from "./DemoStore";
import ButtonAdd from "../../shared/components/button/ButtonAdd";
import SelectAnt from "../../shared/components/form/SelectAnt";
import DatePickerAnt from "../../shared/components/form/DatePickerAnt";
import { Input } from "antd";
import TextEditor from "../../shared/components/form/TextEditor";
import StorageService from "../../common/service/StorageService";

const Demo = () => {

    return (
        <div className="demo d-flex align-items-center justify-content-center">
            <div className="container">
                <div className="demo-row">
                    <div className="form-group">
                        <label>Text <span className="mb-2 text-danger">*</span></label>
                        <InputForm
                            value={demoStore.params.text_base}
                            showCount={true}
                            isError={demoStore.errors.text_base}
                            maxLength={400}
                            onChange={(e: any) => {
                                demoStore.params.text_base = e.target.value;
                                console.log("🚀 ~ Demo ~ demoStore.params.text_base:", demoStore.params.text_base)
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email <span className="mb-2 text-danger">*</span></label>
                        <InputEmail
                            value={demoStore.params.text_email}
                            isError={demoStore.errors.text_email}
                            placeholder={'Email'}
                            onChange={(e: any) => {
                                demoStore.params.text_email = e.target.value;
                            }}/>
                    </div>
                </div>
                <button type="submit" className="btnSubmit d-flex align-items-center justify-content-center"
                        onClick={() => {
                            demoStore.login()
                        }}>
                    Đăng Nhập
                </button>
                <ButtonAdd text="Button Add"/>
            </div>
        </div>
    );
};

//* Observer sẽ theo dõi sự thay đổi
export default observer(Demo);
