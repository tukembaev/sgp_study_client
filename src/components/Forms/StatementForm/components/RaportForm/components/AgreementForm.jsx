import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../../../../../utils/Notifications";
import Button from "../../../../../Button/Button";
import styles from "./../RaportForm.module.scss";
import { getPositionData } from "../../../../../../service/OrderService";
import { setPositionById } from "../../../../../../store/slices/OrderSlice";
import { getEmployee } from "../../../../../../service/TaskService";
import { setEmployee } from "../../../../../../store/slices/TaskSlice";
import TaskResponsible from "../../../../TaskForm/components/TaskResponsible/TaskResponsible";
const AgreementForm = ({setRender , setState}) => {

    const [Responsible, setResponsible] = useState([]);
  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();
  //Const & Let

  const getData = async () => {
    try {
      let response = await getEmployee(data);

      dispatch(
        setEmployee({
          employee: response.data,
        })
      );

    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();

  }, []);


//   const handleSubmit = async (event) => {
//     event.preventDefault();
 
//     if (text === "") {
//       setNotify({
//         isOpen: true,
//         message: " Вы не указали название рапорта",
//         type: "warning",     sound: 'warning'
//       });
//     } 
//     else
//       try {
//         let response = await createRaport(signer, type, text, file);
//         dispatch(
//           postStatement({
//             addressee:signer,
//             type:type,
//             text: text,
//             file,
//           })
//         );
//         setNotify({
//           isOpen: true,
//           message: "Рапорт успешно отправлен",
//            type: "success", sound : "success"
//         });
//         setState(({ isPaneOpen: false } ))
//         setRender(true)
  
//       } catch (error) {
//         

//         setNotify({
//           isOpen: true,
//           message: "Ошибка",
//           type: "error",
//         });
//       }
//   };
const employee = useSelector((state) => state.task);
const data = [employee.employee];
  return (
    <div className={styles.wrapper}>
    <div className={styles.signer}>

        <TaskResponsible
            dataResponsible={data}
            setResponsible={setResponsible}
            IsMilti={false}
            text={"Кому:"}
          />
     </div>
     
    <div className={styles.statement_footer}>
      <Button className={styles.btn1} >
        Отправить
      </Button>
    </div>
    <Notification notify={notify} setNotify={setNotify} />
  </div>
  )
}

export default AgreementForm