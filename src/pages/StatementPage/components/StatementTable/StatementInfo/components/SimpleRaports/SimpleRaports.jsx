import React, { useState, useRef, useEffect } from "react";
import styles from "./SimpleRaports.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../../../components/index";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import { useReactToPrint } from "react-to-print";
import TaskForm from "./../../../../../../../components/Forms/TaskForm/TaskForm";

import { setSignStatement } from "../../../../../../../store/slices/StatementsSlice";
import { SignRaport } from "../../../../../../../service/StatementsService";
import userInfo from "../../../../../../../utils/userInfo";
import Notification from "../../../../../../../utils/Notifications";

import close from "./../../../../../../../assets/icons/close.png";
import printer from "./../../../../../../../assets/icons/printer.png";
import back from "./../../../../../../../assets/icons/back.svg";
import print from "./../../../../../../../assets/icons/print.png";
import SlidingPaneUtil from "../../../../../../../utils/SlidingPaneUtil";
import AgreementForm from "../../../../../../../components/Forms/StatementForm/components/RaportForm/components/AgreementForm";
import DocumentHistory from "../../../../../../../components/DocumentHistory/DocumentHistory";
import PdfPreview from "../../../../../../../hooks/PdfPreview/PdfPreview";
import DocumentImgSigns from "../../../../../../../components/Signs/DocumentImgSigns";
import ModalWindow from "../../../../../../../hooks/ModalWindow/ModalWindow";
import EmployeeSelectUserId from "../../../../../../../hooks/EmployeeSelect/EmployeeSelectUserId";
import PinCode from "../../../../../../../hooks/PinCode/PinCode";
import { ScaleLoader } from "react-spinners";

const SimpleRaports = ({ info, setRender }) => {
  const [otkaz, setOtkaz] = useState("");
  let text = useState();
  const [isShown, setIsShown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newAdresseId, setNewAdresseId] = useState();
  const [selectedEmployeeLabel, setSelectedEmployeeLabel] = useState([]);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
    isTask: false,
  });
  const [pinOrComment, setPinOrComment] = useState(true);
  const [pinCode, setPinCode] = useState("");
  const [state2, setState2] = useState({
    isPaneOpen2: false,
    isPaneOpenLeft2: false,
    isDecline: false,
    isAcquaint: false,
    isСhancellery: false,
  });
  const [loader , setLoader] = useState(false);

  const handleClickDecline = () => {
    setState2({ isPaneOpen2: true, isDecline: true });
  };
  const handleClickAcquainted = () => {
    setState2({ isPaneOpen2: true, isAcquaint: true });
  };
  const handleClickСhancellery = () => {
    setState2({ isPaneOpen2: true, isСhancellery: true });
  };
  const handleClickReSend = (info) => {
    setOpenModal(true);
  };

  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = userInfo();
  const { id } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Рапорт (${info.number})`,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  useEffect(() => {
    width < 600 && handleSideNavToggle();
  });

  function handleSideNavToggle() {
    console.log("toggle it");
  }

  const DeclineStatement = async (info, text) => {
    if (otkaz === "") {
      setNotify({
        isOpen: true,
        message: "Введите причину отказа",
        type: "warning",
        sound: "warning",
      });
    } else {
      try{
        setLoader(true);
        let newStatement = {
          addressee: info.addressee,
          applicationmember: info.applicationmember,
          type: info.type,
          status: text,
          prich_pr_otkaz: otkaz,
        };
  
        let response = await SignRaport(id, newStatement);
  
        dispatch(setSignStatement(response.data));
        setNotify({
          isOpen: true,
          message: "Рапорт успешно отказан",
          type: "success",
          sound: "success",
        });
  
        setRender(true);
        setState2({ isPaneOpen2: false });
      }catch(err){
        console.log(err.response);
      }finally{
        setLoader(false);
      }
    }
  };

  const AcquaintedStatement = async (info, text) => {
    if (otkaz === "") {
      setNotify({
        isOpen: true,
        message: "Введите комментарий для заявителя",
        type: "warning",
        sound: "warning",
      });
    } else {
      try{
        setLoader(true);
        let newStatement = {
          addressee: info.addressee,
          applicationmember: info.applicationmember,
          type: info.type,
          status: text,
          prich_pr_otkaz: otkaz,
        };
  
        let response = await SignRaport(id, newStatement);
  
        dispatch(setSignStatement(response.data));
        setNotify({
          isOpen: true,
          message: "Ознакомлен",
          type: "success",
          sound: "success",
        });
  
        setRender(true);
        setState2({ isPaneOpen2: false });
      }catch(err){
        console.log(err.response);
      }finally{
        setLoader(false);
      }
    }
  };
  // ! PINCODE
  const pinLogIn = () => {
    if (String(pinCode).length === 4 && pinCode === user.pin) {
      setNotify({
        isOpen: true,
        message: "Верный Пин-Код!",
        type: "success",
        sound: "success",
      });

      setPinOrComment(false);
    } else {
      setNotify({
        isOpen: true,
        message: "Неправильный Пин-Код",
        type: "error",
      });
    }
  };
  // PINCODE END
  const СhancelleryStatement = async (info, text) => {
    if (otkaz === "") {
      setNotify({
        isOpen: true,
        message: "Введите комментарий для концелярии",
        type: "warning",
        sound: "warning",
      });
    } else {
      let newStatement = {
        addressee: info.addressee,
        applicationmember: info.applicationmember,
        type: info.type,
        status: text,
        prich_pr_otkaz: otkaz,
      };

      let response = await SignRaport(id, newStatement);

      dispatch(setSignStatement(response.data));
      setNotify({
        isOpen: true,
        message: "Отправлено в канцелярию",
        type: "success",
        sound: "success",
      });

      setRender(true);
      setState2({ isPaneOpen2: false });
    }
  };

  const ReSendStatement = async (info) => {
    if (newAdresseId === user.userId) {
      setNotify({
        isOpen: true,
        message: " Адрессат является пользователем!",
        type: "warning",
        sound: "warning",
      });
    } else if (newAdresseId === info?.employee.user) {
      setNotify({
        isOpen: true,
        message: " Адрессат является создателем!",
        type: "warning",
        sound: "warning",
      });
    } else {
      try{
        setLoader(true);
        let newStatement = {
          addressee: newAdresseId,
          applicationmember: info.applicationmember,
          type: info.type,
          status: "Передать",
        };
  
        let response = await SignRaport(id, newStatement);
  
        dispatch(setSignStatement(response.data));
        setNotify({
          isOpen: true,
          message: "Рапорт успешно переотправлен",
          type: "success",
          sound: "success",
        });
        setOpenModal(false);
        setRender(true);
        setNewAdresseId(null);
      }catch(err){
        console.log(err.response);
      }finally{
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <div className={styles.simple_raports_wrapper}>
        <div className={styles.simple_raports_info_wrapper}>
          <div className={styles.simple_raports_info_header}>
            {width > 1100 ? (
              <>
                <img
                  src={close}
                  style={{
                    width: "25px",
                    height: "25px",
                    cursor: "pointer",
                    marginTop: "20px",
                  }}
                  alt=""
                  onClick={() => navigate(`/statements/${user.userId}`)}
                />
                <img
                  src={printer}
                  style={{
                    width: "35px",
                    height: "35px",
                    cursor: "pointer",
                    marginTop: "20px",
                  }}
                  alt=""
                  onClick={handlePrint}
                />
              </>
            ) : (
              <>
                <img
                  src={back}
                  onClick={() => navigate(-1)}
                  className={styles.size}
                  alt="s"
                />
                <img
                  src={print}
                  onClick={handlePrint}
                  className={styles.size}
                />
              </>
            )}
          </div>
          <div ref={componentRef}>
            <div className={styles.simple_raports_info_heading}>
              <div className={styles.left}>
                <p>Номер оборота документа: {info.number} </p>
                <p>Статус: {info.status}</p>
                <p>Тема: {info.type}</p>
              </div>
              <div className={styles.right}>
                <p>{info.prorector}</p>
                <p>от</p>
                <p>
                  {info.employee?.surname} {info.employee?.first_name}
                </p>
              </div>
            </div>
            <div className={styles.simple_raports_info_body}>
              <h1>{info?.type_doc}</h1>
              <div className={styles.simple_raports_info_discrip}>
                <p>{info.text}</p>
                <div className={styles.simple_rapoirts_user_sign}>
                  <p>
                    {info.employee?.surname} {info.employee?.first_name}{" "}
                    {info.date_zayavki}
                    {info.ispolnpodcheck && (
                      <div className={styles.user_sign}>
                        {info.ispolnpodcheck.includes("Отказано") ? (
                          <p className={styles.text_sign}>
                            Подпись заявителя: <br />
                            Отказано{" "}
                          </p>
                        ) : (
                          <p>
                            Подпись заявителя: <br /> <br />{" "}
                          </p>
                        )}
                        <div>
                          <img src={info.ispolnpodsign} alt="" />
                        </div>
                      </div>
                    )}
                  </p>
                </div>
              </div>

              {info.status === "Отказано" && info.prich_pr_otkaz != null ? (
                <div className={styles.simple_raports_info_heading}>
                  <h2>Причина отказа: {info.prich_pr_otkaz} </h2>
                </div>
              ) : info.status === "Ознакомлен" &&
                info.prich_pr_otkaz != null ? (
                <div className={styles.simple_raports_info_heading}>
                  <h2>Комментарий ознакомления: {info.prich_pr_otkaz} </h2>
                </div>
              ) : info.status === "В канцелярии" &&
                info.prich_pr_otkaz != null ? (
                <div className={styles.simple_raports_info_heading}>
                  <h2>Комментарий для концелярии: {info.prich_pr_otkaz} </h2>
                </div>
              ) : (
                ""
              )}
              <div className={styles.all_checks}>
                {info.prorectorcheck && (
                  <div>
                    {info.prorectorcheck.includes("Отказано") ? (
                      <p className={styles.text_sign}>
                        Подпись заявителя: <br />
                        Отказано{" "}
                      </p>
                    ) : (
                      <p>
                        Подпись {info.prorector_name}: <br />{" "}
                        {info.prorector_date_check} <br />{" "}
                      </p>
                    )}
                    <div>
                      <img src={info.prorectorsign} alt="" />
                    </div>
                  </div>
                )}

                {info.applicationmember?.map((item) => {
                  return (
                    <DocumentImgSigns
                      signer_name={item.name}
                      signer_sign={item.sign}
                      signer_sign_time={item.date_check_member}
                      signer_type={item.name_approval}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {info?.files?.length === 0 ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginLeft: "50px",
                flexWrap: "wrap",
              }}
            >
              Файлы:
              {info?.files?.map((item, index) => (
                <a
                  style={{ textDecoration: "none" }}
                  href={item?.file}
                  target="_blank"
                  download={`file_${index}.pdf`}
                >
                  {decodeURI(item?.file).split("/").slice(-1)[0]}
                </a>
              ))}
            </div>
          )}
          <div className={styles.simple_raports_footer}>
            <div className={styles.all_checks}></div>
            {width > 1000 ? (
              <SlidingPaneUtil
                size="900px"
                title={
                  state.isTask
                    ? "Новая задача на основе рапорта"
                    : "Передать на согласование"
                }
                state={state}
                setState={setState}
              >
                {" "}
                {state.isTask === true ? (
                  <TaskForm
                    idstatement={info.id}
                    typestatement={info.type}
                    setRender={setRender}
                    setState={setState}
                  />
                ) : (
                  <AgreementForm
                    idstatement={info.id}
                    typestatement={info.type}
                    setRender={setRender}
                    setState={setState}
                  />
                )}
              </SlidingPaneUtil>
            ) : (
              <SlidingPaneUtil
                size="100%"
                title={
                  state.isTask
                    ? "Новая задача на основе рапорта"
                    : "Передать на согласование"
                }
                state={state}
                setState={setState}
              >
                {" "}
                <TaskForm
                  idstatement={info.id}
                  typestatement={info.type}
                  setRender={setRender}
                  setState={setState}
                />{" "}
              </SlidingPaneUtil>
            )}

            {pinOrComment ? (
              <ModalWindow
                openModal={state2.isPaneOpen2}
                setOpenModal={setState2.isPaneOpen2}
                modalText={"Введите ПИН-код"}
              >
                <>
                  <PinCode setPinCode={setPinCode} passwordVisible={true} />
                  <Button
                    onClick={() => setState2({ isPaneOpen2: false })}
                    className={styles.btn_pin_close}
                  >
                    {" "}
                    Закрыть
                  </Button>
                  <Button onClick={pinLogIn} className={styles.btn_pin}>
                    Подтвердить
                  </Button>
                </>
              </ModalWindow>
            ) : (
              <ModalWindow
                openModal={state2.isPaneOpen2}
                setOpenModal={setState2.isPaneOpen2}
                modalTitle={
                  state2.isDecline
                    ? "Введите причину отказа"
                    : state2.isAcquaint
                    ? "Введите комментарий для ознакомления"
                    : state2.isСhancellery
                    ? "Введите комментарий для концелярии"
                    : ""
                }
              >
                <div className={styles.decline_form}>
                  <div className={styles.item_flex1}>
                    <div className={styles.input_type3}>
                      <textarea
                        onChange={(e) => setOtkaz(e.target.value)}
                        className={styles.discription_input}
                        placeholder={
                          state2.isDecline
                            ? "Причина отказа"
                            : state2.isAcquaint
                            ? "Комментарий для ознакомления"
                            : state2.isСhancellery
                            ? "Комментарий для концелярии"
                            : ""
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    onClick={() => setState2({ isPaneOpen2: false })}
                    className={styles.btn_pin_close}
                  >
                    Закрыть
                  </Button>

                  {state2.isDecline ? (
                    <>
                    
                    {loader ? 
                     <ScaleLoader color="gray" size={30} />
                   : 
                   <Button
                     onClick={(e) =>
                       DeclineStatement(info, (text = "Отказано"))
                     }
                     className={styles.btn_pin}
                   >
                     Отказать
                   </Button>
                   }
                    </>
                  ) : state2.isAcquaint ? (
                    <>
                    {
                      loader ? (
                        <ScaleLoader color="gray" size={30} />
                      ) : (
                        <Button
                        onClick={(e) =>
                          AcquaintedStatement(info, (text = "Ознакомлен"))
                        }
                        className={styles.btn_pin}
                      >
                        Отправить
                      </Button> 
                      )
                    }
                    </>
                  ) : state2.isСhancellery ? (
                    <Button
                      onClick={(e) =>
                        СhancelleryStatement(info, (text = "В канцелярии"))
                      }
                      className={styles.btn_pin}
                    >
                      Отправить
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </ModalWindow>
            )}

            {isShown === false ? (
              <div>
                {user.employeeId === info.employee?.id &&
                (info.status === "В режиме ожидания" ||
                  info.status === "В процессе выполнения") ? (
                  <div className={styles.btns_rightside}>
                    <Button disabled="true" className={styles.btn3}>
                      {" "}
                      Успешно отправлено{" "}
                    </Button>
                  </div>
                ) : info.user_id_prorector === user.userId &&
                  info.status !== "Отказано" &&
                  info.status !== "Завершена" &&
                  info.status !== "В канцелярии" &&
                  info.status !== "Ознакомлен" &&
                  info.applicationmember?.some(
                    (item) => item.status === "На рассмотрении"
                  ) === false &&
                  info.has_tasks === false ? (
                  <div>
                    <div className={styles.btns_rightside}>
                      <Button
                        className={styles.btn4}
                        onClick={handleClickDecline}
                      >
                        {" "}
                        Отказать
                      </Button>

                      <Button
                        className={styles.btn2}
                        onClick={() =>
                          setState({ isPaneOpen: true, isTask: true })
                        }
                      >
                        Формировать задачу
                      </Button>
                      {/* <Button
                        className={styles.btn2}
                        onClick={handleClickСhancellery}
                      >
                        {" "}
                        Подписать и на концелярию
                      </Button> */}
                      <Button
                        className={styles.btn2}
                        onClick={handleClickAcquainted}
                      >
                        {" "}
                        Ознакомлен
                      </Button>
                      <Button
                        className={styles.btn2}
                        onClick={() => handleClickReSend(info)}
                      >
                        {" "}
                        Передать
                      </Button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className={styles.simple_raports_footer2}>
                <div>
                  <div className={styles.input_type3}>
                    <textarea
                      onChange={(e) => setOtkaz(e.target.value)}
                      className={styles.discription_input}
                      placeholder="Причина отказа"
                    />
                  </div>
                </div>
                <div className={styles.mobile_btns}>
                  {loader ? 
                    <ScaleLoader color="gray" size={30} />
                  : 
                  <Button
                  className={styles.btn1}
                  onClick={() => {
                    DeclineStatement(info, (text = "Отказано"));
                  }}
                >
                  {" "}
                  Отказать
                </Button>
                  }
                </div>
              </div>
            )}
          </div>
        </div>

        <DocumentHistory typeDoc={"Рапорт"} info={info} />

        <Notification notify={notify} setNotify={setNotify} />
      </div>
      {width > 1300 && info.file !== null && info?.file?.includes(".pdf") ? (
        <div className={styles.simple_raports_wrapper}>
          <div className={styles.simple_raports_info_wrapper}>
            <PdfPreview file={info.file} />
          </div>
        </div>
      ) : (
        ""
      )}

      <>
        <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalTitle={"Выберите сотрудника"}
          // modalText={"Выбор"}
        >
          <div style={{ marginBottom: "10px" }}></div>
          <EmployeeSelectUserId
            selectedEmployee={setNewAdresseId}
            setSelectedEmployeeLabel={setSelectedEmployeeLabel}
            isMulti={false}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              style={{ paddingInline: "10px", marginLeft: "0" }}
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </button>
            {
              loader ? (
                <ScaleLoader color="gray" size={30} />
              ) : (
                <Button
                onClick={() => ReSendStatement(info)}
                className={styles.btn_pin}
              >
                Передать
              </Button>
              )
            }
          </div>
        </ModalWindow>{" "}
      </>
    </div>
  );
};

export default SimpleRaports;
