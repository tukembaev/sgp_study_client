import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import ListItemButton from "@mui/material/ListItemButton";

import unetLogo from "./../../../../../assets/img/UNET.png";
import userInfo from "../../../../../utils/userInfo";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./Menu.module.scss";
import home from "./../../../../../assets/side_panel_icons/1home.png";
import task from "./../../../../../assets/side_panel_icons/2task.png";
import personal_calendar from "./../../../../../assets/side_panel_icons/3calendar.png";
import teams from "./../../../../../assets/side_panel_icons/4team.png";
import docs from "./../../../../../assets/side_panel_icons/5docs.png";
import order from "./../../../../../assets/side_panel_icons/6order.png";
import chart from "./../../../../../assets/side_panel_icons/7chart.png";
import calendar365 from "./../../../../../assets/side_panel_icons/8calendar.png";
import chat from "./../../../../../assets/side_panel_icons/9chat.png";
import registration from "./../../../../../assets/side_panel_icons/10registration.png";
import faq from "./../../../../../assets/side_panel_icons/11faq.png";
import performance from "./../../../../../assets/side_panel_icons/performance.png";
import academ from "./../../../../../assets/side_panel_icons/2academ.png";
import disciplines from "./../../../../../assets/side_panel_icons/3disc.png";
import work_plan from "./../../../../../assets/side_panel_icons/4studplan.png";
import stream from "./../../../../../assets/side_panel_icons/5stream.png";
import growth from "./../../../../../assets/side_panel_icons/growth.png";
import reports from "../../../../../assets/icons/report.png";

import struc from "./../../../../../assets/side_panel_icons/struc.png";
import { useLocation, useNavigate } from "react-router-dom";
import publication from "./../../../../../assets/side_panel_icons/publication.png";
const drawerWidth = 270;

const openedMixin = (theme) => ({
  width: drawerWidth,
  borderRight: "unset",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "& img": {
    width: "26px",
    height: "26px",
    marginBottom: "3px",
  },
  "& p": {
    paddingLeft: "10px",
  },
});

const closedMixin = (theme) => ({
  transition: theme?.transitions.create("width", {
    easing: theme?.transitions.easing.sharp,
    duration: theme?.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  borderRight: "unset",
  height: "64px",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  textAligh: "center",
  "& img": {
    width: "26px",
    height: "26px",
    marginBottom: "3px",
  },
  "& p": {
    paddingLeft: "10px",
    marginBottom: "5px",
  },
});

const StyledDrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  borderRight: "unset",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      background: "rgb(35, 32, 32, 0.95)",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      background: "none",
    },
  }),
}));
export default function MenuDrawerMobile({ width }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const user = userInfo();
  const [currentDynamicUser, getDynamic] = useState();
  const [isActive, setIsActive] = useState(false);
  const [switchToStudy, setSwitchToStudy] = useState(
    localStorage.getItem("switchToStudy") === "true"
  );

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  useEffect(() => {
    localStorage.setItem("switchToStudy", switchToStudy);
  }, [switchToStudy]);

  const handleSwitchToStudy = () => {
    setSwitchToStudy((prevSwitchToStudy) => !prevSwitchToStudy);
  };

  const location = useLocation();
  return (
    <div>
      <Drawer variant="permanent" open={open}>
        <StyledDrawerHeader>
          {open ? (
            <div className={styles.logo__wrapper}>
              <img
                src={unetLogo}
                style={{ width: "80px", height: "30px" }}
                alt=""
              />
            </div>
          ) : null}

          <IconButton
            sx={{ color: "white", padding: "0 4px" }}
            aria-label="open drawer"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </StyledDrawerHeader>
        {open && (
          <>
            <Divider />
            <div className={styles.menu__list}>
              <List>
                {user.user_type === "S" ? (
                  <>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/alerts/${user.userId}/`)}
                      style={
                        location.pathname.includes("alerts")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={home} alt="" />
                      {open ? <p>Главная</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/academ-calendar/`)}
                      style={
                        location.pathname === "/academ-calendar/"
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={academ} alt="" />
                      {open ? <p>Академический Календарь</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/discipline/`)}
                      style={
                        location.pathname.includes("/discipline/")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={disciplines} alt="" />
                      {open ? <p>Мои дисциплины</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/schedules/`)}
                      style={
                        location.pathname.includes("/schedules/")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={disciplines} alt="" />
                      {open ? <p>Расписание</p> : null}
                    </ListItemButton>
                    {/* <ListItemButton
              disablePadding
              onClick={() => navigate(`/kpi/`)}
              style={
                location.pathname.includes("/kpi/")
                  ? { background: "rgb(188 182 182 / 34%)" }
                  : {}
              }
            >
              <img src={performance} alt="" />
              {open ? <p>KPI</p> : null}
            </ListItemButton> */}
                    <ListItemButton
                      Button
                      disablePadding
                      onClick={() => navigate(`/student-discipline/`)}
                      style={
                        location.pathname === "/student-discipline/"
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={registration} alt="" />
                      {open ? <p>Регистрация</p> : null}
                    </ListItemButton>
                    <span>
                      ----------------------------------------------------
                    </span>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/tasks/${user.userId}/`)}
                      style={
                        location.pathname.includes("task")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={task} alt="" />
                      {open ? <p>Задачи</p> : null}
                    </ListItemButton>

                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/statements/${user.userId}/`)}
                      style={
                        location.pathname.includes("statement")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={docs} alt="" />
                      {open ? <p>Обращения</p> : null}
                    </ListItemButton>
                    {user.division === "Канцелярия" ? (
                      <ListItemButton
                        disablePadding
                        onClick={() => navigate(`/chancellerys`)}
                        style={
                          location.pathname.includes("chancellery")
                            ? { background: "rgb(188 182 182 / 34%)" }
                            : {}
                        }
                      >
                        <img src={task} alt="" />
                        {open ? <p>Канцелярия</p> : null}
                      </ListItemButton>
                    ) : null}

                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/support`)}
                      style={
                        location.pathname.includes("support")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={faq} alt="" />
                      {open ? <p>Поддержка 24/7</p> : null}
                    </ListItemButton>
                  </>
                ) : (
                  <>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/alerts/${user.userId}/`)}
                      style={
                        location.pathname.includes("alert")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={home} alt="" />
                      {open ? <p>Главная</p> : null}
                    </ListItemButton>
                    {/* <ListItemButton disablePadding onClick={() => navigate(`/publications/`)} style={location.pathname.includes('publications') ? { background: 'rgb(188 182 182 / 34%)' } : {}}>
                      <img src={publication} alt="" />

                      {open ? <p>Публикации</p> : null}
                    </ListItemButton> */}

                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/tasks/${user.userId}/`)}
                      style={
                        location.pathname.includes("task")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={task} alt="" />

                      {open ? <p>Задачи</p> : null}
                    </ListItemButton>

                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/academ-calendar/`)}
                      style={
                        location.pathname.includes("/academ-calendar/")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={personal_calendar} alt="" />

                      {open ? <p>Календарь</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/statements/${user.userId}/`)}
                      style={
                        location.pathname.includes("statement")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={docs} alt="" />

                      {open ? <p>Обращения</p> : null}
                    </ListItemButton>
                    {user.division === "Канцелярия" ? (
                      <ListItemButton
                        disablePadding
                        onClick={() => navigate(`/chancellerys`)}
                        style={
                          location.pathname.includes("chancellery")
                            ? { background: "rgb(188 182 182 / 34%)" }
                            : {}
                        }
                      >
                        <img src={order} alt="" />

                        {open ? <p>Канцелярия</p> : null}
                      </ListItemButton>
                    ) : null}
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/orders/${user.userId}/`)}
                      style={
                        location.pathname.includes("order")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={order} alt="" />

                      {open ? <p>Приказы</p> : null}
                    </ListItemButton>

                    {user.is_admin_of ? (
                      <ListItemButton
                        disablePadding
                        onClick={() => navigate(`/structure`)}
                        style={
                          location.pathname.includes("structure")
                            ? { background: "rgb(188 182 182 / 34%)" }
                            : {}
                        }
                      >
                        <img src={struc} alt="" />

                        {open ? <p>Структура</p> : null}
                      </ListItemButton>
                    ) : null}

                    {user.is_admin_of ? (
                      <ListItemButton
                        disablePadding
                        onClick={() => navigate(`/register_person`)}
                        style={
                          location.pathname.includes("register_person")
                            ? { background: "rgb(188 182 182 / 34%)" }
                            : {}
                        }
                      >
                        <img src={registration} alt="" />

                        {open ? <p>Регистрация</p> : null}
                      </ListItemButton>
                    ) : null}

                    <hr style={{ margin: "7px 0" }} />

                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/study-plan/`)}
                      style={
                        location.pathname.includes("study-plan")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={work_plan} alt="" />
                      {open ? <p>РУП</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/flow/`)}
                      style={
                        location.pathname.includes("flow")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={stream} alt="" />
                      {open ? <p>Потоки</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/load/`)}
                      style={
                        location.pathname.includes("load")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={growth} alt="" />
                      {open ? <p>Нагрузка</p> : null}{" "}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/discipline/`)}
                      style={
                        location.pathname.includes("discipline")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={disciplines} alt="" />
                      {open ? <p>Мои дисциплины</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/kpi/`)}
                      style={
                        location.pathname.includes("/kpi/")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={performance} alt="" />
                      {open ? <p>KPI</p> : null}
                    </ListItemButton>
                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/support`)}
                      style={
                        location.pathname.includes("support")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={faq} alt="" />
                      {open ? <p>Поддержка 24/7</p> : null}
                    </ListItemButton>

                    <ListItemButton
                      disablePadding
                      onClick={() => navigate(`/reports`)}
                      style={
                        location.pathname.includes("reports")
                          ? { background: "rgb(188 182 182 / 34%)" }
                          : {}
                      }
                    >
                      <img src={reports} alt="" />
                      {open ? <p>Отчеты</p> : null}
                    </ListItemButton>
                  </>
                )}
              </List>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
}
