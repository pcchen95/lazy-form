import "./App.css";
import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";

const Root = styled.div``;

const FormSection = styled.div`
  margin: 50px auto;
  left: 50%;
  width: 645px;
  height: auto;
  background: white;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
`;

const Top = styled.div`
  height: 8px;
  background: #fad312;
`;

const Section = styled.div`
  margin: 54px 40px 16px 40px;

  & h1 {
    font-size: 36px;
    margin: 0;
  }
`;

const EventInfo = styled.div`
  margin-top: 35px;
  font-size: 13px;
  line-height: 2em;

  & + div {
    color: #e74149;
    font-size: 16px;
    margin-top: 22px;
  }
`;

const FieldName = styled.div`
  margin-top: 50px;
  font-size: 20px;
  color: black;

  ${(props) =>
    props.$required &&
    `
      &:after {
        content: ' *';
        color: red;
      }
    `}
`;

const Textbox = styled.div`
  position: relative;

  & input {
    display: flex;
    margin-top: 20px;
    width: 287px;
    height: 30px;
    border: solid 1px #d0d0d0;
    color: black;
    font-size: 16px;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
  }

  & InputEntered {
    color: black;
  }
`;

const RemindText = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  color: red;
  font-size: 14px;

  ${(props) =>
    props.$display &&
    `
      display: block;
    `}
`;

const Option = styled.div`
  margin-top: 24px;
  font-size: 14px;
  position: relative;

  & RemindText {
    position: absolute;
    top: 40px;
    color: red;
    font-size: 14px;
  }

  & div {
    margin-top: 23px;

    & label {
      margin-left: 9px;
    }
  }
`;

const Remark = styled.div`
  font-size: 14px;
  margin-top: 12px;
`;

const Warn = styled.div`
  padding-bottom: 35px;
  margin-top: 21px;
`;

const Submit = styled.button`
  display: inline-block;
  padding: 13px 30px;
  background: #fad312;
  font-size: 15px;
  border: solid 1px transparent;
  border-radius: 3px;
  margin-top: 55px;
  cursor: pointer;
  box-sizing: border-box;
`;

const Footer = styled.div`
  margin-top: 64px;
`;

const Line = styled.div`
  height: 3px;
  background: #fad312;
`;

const Copyright = styled.div`
  height: 60px;
  background: black;
  color: #999999;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Field({
  name,
  type,
  chineseName,
  stateName,
  handleEvent,
  isShowMessage,
  isError,
}) {
  return (
    <div>
      <FieldName $required={stateName.required}>{chineseName}</FieldName>
      {name === "others" && <Remark>????????????????????????</Remark>}
      <Textbox>
        <input
          type={type}
          placeholder="????????????"
          value={stateName.value}
          onChange={handleEvent}
        />
        <RemindText $display={isShowMessage}>
          {isError && "??????????????????"}
        </RemindText>
      </Textbox>
    </div>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  chineseName: PropTypes.string,
  stateName: PropTypes.object,
  handleEvent: PropTypes.func,
  isShowMessage: PropTypes.bool,
  isError: PropTypes.bool,
};

function FieldOption({
  name,
  chineseName,
  options,
  handleEvent,
  stateName,
  isShowMessage,
  isError,
}) {
  return (
    <div>
      <FieldName $required={stateName.required}>{chineseName}</FieldName>
      <Option>
        {options.map((option, index) => {
          const value = index + 1;
          return (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={name}
                  value={value}
                  onChange={handleEvent}
                  checked={Number(stateName.value) === value}
                />
                {option}
              </label>
            </div>
          );
        })}
        <RemindText $display={isShowMessage}>
          {isError && "??????????????????"}
        </RemindText>
      </Option>
    </div>
  );
}

FieldOption.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  chineseName: PropTypes.string,
  stateName: PropTypes.object,
  handleEvent: PropTypes.func,
  isShowMessage: PropTypes.bool,
  isError: PropTypes.bool,
};

function App() {
  const [nickname, setNickname] = useState({ value: "", required: true });
  const [email, setEmail] = useState({ value: "", required: true });
  const [phone, setPhone] = useState({ value: "", required: true });
  const [type, setType] = useState({ value: "", required: true });
  const [source, setSource] = useState({ value: "", required: true });
  const [others, setOthers] = useState({ value: "", required: false });
  const [isError, setIsError] = useState({
    nickname: nickname.required,
    email: email.required,
    phone: phone.required,
    type: type.required,
    source: source.required,
    others: others.required,
  });
  const [isShowMessage, setIsShowMessage] = useState(false);

  const handleNicknameChange = (e) => {
    setNickname({
      ...nickname,
      value: e.target.value,
    });
    if (nickname.required) {
      setIsError({ ...isError, nickname: false });
    }
  };

  const handleEmailChange = (e) => {
    setEmail({
      ...email,
      value: e.target.value,
    });
    if (email.required) {
      setIsError({ ...isError, email: false });
    }
  };

  const handlePhoneChange = (e) => {
    setPhone({
      ...phone,
      value: e.target.value,
    });
    if (phone.required) {
      setIsError({ ...isError, phone: false });
    }
  };

  const handleTypeChange = (e) => {
    setType({
      ...type,
      value: e.target.value,
    });
    if (type.required) {
      setIsError({ ...isError, type: false });
    }
  };

  const handleSourceChange = (e) => {
    setSource({
      ...source,
      value: e.target.value,
    });
    if (source.required) {
      setIsError({ ...isError, source: false });
    }
  };

  const handleOthersChange = (e) => {
    setOthers({
      ...others,
      value: e.target.value,
    });
    if (others.required) {
      setIsError({ ...isError, others: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isError.nickname ||
      isError.email ||
      isError.phone ||
      isError.type ||
      isError.source ||
      isError.others
    ) {
      setIsShowMessage(true);
      return;
    }

    alert(`
      ?????????${nickname.value}
      ???????????????${email.value}
      ???????????????${phone.value}
      ???????????????${
        type.value === "1" ? "??????????????????????????????" : "?????????????????????????????????"
      }
      ??????????????????????????????${source.value}
      ?????????${others.value}
    `);

    setNickname({ ...nickname, value: "" });
    setEmail({ ...email, value: "" });
    setPhone({ ...phone, value: "" });
    setType({ ...type, value: "" });
    setSource({ ...source, value: "" });
    setOthers({ ...others, value: "" });
    setIsShowMessage(false);
    setIsError({
      nickname: nickname.required,
      email: email.required,
      phone: phone.required,
      type: type.required,
      source: source.required,
      others: others.required,
    });
  };

  return (
    <Root>
      <FormSection>
        <Top></Top>
        <Section>
          <h1>???????????????????????????</h1>
          <EventInfo>
            <div>???????????????2020/12/10 ~ 2020/12/11</div>
            <div>???????????????????????????????????????????????????1???</div>
          </EventInfo>
          <div>* ??????</div>
          <form onSubmit={handleSubmit}>
            <Field
              name="nickname"
              type="text"
              chineseName="??????"
              stateName={nickname}
              handleEvent={handleNicknameChange}
              isShowMessage={isShowMessage}
              isError={isError.nickname}
            />
            <Field
              name="email"
              type="email"
              chineseName="????????????"
              stateName={email}
              handleEvent={handleEmailChange}
              isShowMessage={isShowMessage}
              isError={isError.email}
            />
            <Field
              name="phone"
              type="text"
              chineseName="????????????"
              stateName={phone}
              handleEvent={handlePhoneChange}
              isShowMessage={isShowMessage}
              isError={isError.phone}
            />

            <FieldOption
              name="type"
              chineseName="????????????"
              options={["??????????????????????????????", "?????????????????????????????????"]}
              handleEvent={handleTypeChange}
              stateName={type}
              isShowMessage={isShowMessage}
              isError={isError.type}
            />
            <Field
              name="source"
              type="text"
              chineseName="??????????????????????????????"
              stateName={source}
              handleEvent={handleSourceChange}
              isShowMessage={isShowMessage}
              isError={isError.source}
            />
            <Field
              name="others"
              type="text"
              chineseName="??????"
              stateName={others}
              handleEvent={handleOthersChange}
              isShowMessage={isShowMessage}
              isError={isError.others}
            />
            <Submit type="submit">??????</Submit>
            <Warn>???????????????????????????????????????</Warn>
          </form>
        </Section>
      </FormSection>
      <Footer>
        <Line></Line>
        <Copyright>
          <p>?? 2020 ?? Copyright. All rights Reserved.</p>
        </Copyright>
      </Footer>
    </Root>
  );
}

export default App;
