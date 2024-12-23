import React, { useEffect } from "react";
import "./styles/demo.css";
import {observer} from "mobx-react";
import InputEmail from "../../shared/components/form/InputEmail";
import {demoStore} from "./DemoStore";
import InputPass from "../../shared/components/form/InputPassword";
import InputPhone from "../../shared/components/form/InputPhone";
import SelectAnt from "../../shared/components/form/SelectAnt";
import DatePickerAnt from "../../shared/components/form/DatePickerAnt";
import { DatePickerProps } from "antd";
import { dateUtils } from "../../common/utils/DateUtils";
import dayjs from "dayjs";
import { FORMAT_DATE } from "../../common/constants/Constants";
import TabSelectGlobal from "../../shared/components/tabSelectGlobal/TabSelectGlobal";
import StorageService from "../../common/service/StorageService";
import InputForm from "../../shared/components/form/InputForm";


const Demo2 = () => {

    return (
      <div className="demo d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="demo-row">
            <div className="form-group">
              <label>
                Text <span className="mb-2 text-danger">*</span>
              </label>
              <InputForm
                value={demoStore.params.text_base}
                showCount={true}
                isError={demoStore.errors.text_base}
                maxLength={200}
                onChange={(e: any) => {
                  demoStore.params.text_base = e.target.value;
                }}
              />
            </div>
            <div className="form-group">
              <label>
                Email <span className="mb-2 text-danger">*</span>
              </label>
              <InputEmail
                value={demoStore.params.text_email}
                isError={demoStore.errors.text_email}
                placeholder={"Email"}
                onChange={(e: any) => {
                  demoStore.params.text_email = e.target.value;
                }}
              />
            </div>

            <div className="form-group">
              <label>
                Password <span className="mb-2 text-danger">*</span>
              </label>
              <InputPass
                value={demoStore.params.text_password}
                isError={demoStore.errors.text_email}
                placeholder={"Mật khẩu của bạn"}
                onChange={(e: any) => {
                  demoStore.params.text_password = e.target.value;
                }}
              />
            </div>

            <div className="form-group">
              <label>
                InputPhone <span className="mb-2 text-danger">*</span>
              </label>
              <InputPhone
                value={demoStore.params.text_phone}
                placeholder={"Số điện thoại của bạn"}
                iconCheck
                onChange={(e: any) => {
                  demoStore.params.text_phone = e;
                }}
              />
            </div>

            <div className="form-group">
              <label>
                Select <span className="mb-2 text-danger">*</span>
              </label>
              <SelectAnt
                placeholder={`Lựa Chọn Phương Tiện`}
                value={demoStore.params.selected}
                // isError={contactPersonStore.errors.position}
                onChange={(e: any) => (demoStore.params.selected = e)}
                options={[
                  { id: 1, name: "Ô tô" },
                  { id: 2, name: "Xe Máy" },
                  { id: 3, name: "Máy Bay" },
                  { id: 4, name: "Máy Bay" },
                  { id: 5, name: "Máy Bay" },
                  { id: 6, name: "Máy Bay" },
                  { id: 7, name: "Ô tô" },
                  { id: 8, name: "Xe Máy" },
                  { id: 9, name: "Máy Bay" },
                ]}
                isShowClear
                isCallback
                callback={()=>{console.log("Đến cuối rồi !")}}
              />
            </div>

            <div>
            <DatePickerAnt
                format="DD/MM/YYYY"
                value={demoStore.params.chooseDate ? dayjs(demoStore.params.chooseDate, FORMAT_DATE.DD_MM_YYYY) : null}
                onChange={(date: any) => {
                    demoStore.params.chooseDate = date ? dayjs(date).format(FORMAT_DATE.DD_MM_YYYY) : null;
                }}
                isVie
              /> 
            </div>

            <TabSelectGlobal isBorderBottom options={[
                {
                    id: 'RONALDO',
                    value: '',
                    checked: demoStore.tabActive,
                    name: 'Ronaldo'
                },
                {
                    id: 'MESSI',
                    value: 'messi',
                    checked: demoStore.tabActive,
                    name: 'Messi',
                    // isHide: true
                },
                {
                  id: 'NEYMAR',
                  value: 'neymar',
                  checked: demoStore.tabActive,
                  name: 'Neymar',
                  // isHide: true
              },
            ]} handleRadioChange={(e: any)=>{
              demoStore.tabActive = e.target.value
            }}/>
          </div>
          <button
            type="submit"
            className="btnSubmit d-flex align-items-center justify-content-center"
            onClick={() => {
              demoStore.login();
            }}
          >
            Đăng Nhập
          </button>
        </div>
      </div>
    );
};

//* Observer sẽ theo dõi sự thay đổi
export default observer(Demo2);
