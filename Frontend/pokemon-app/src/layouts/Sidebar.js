import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import './sidebar.css';

const navigation = [
  {
    title: "Home",
    href: "/starter",
    icon: "bi bi-house-door",
  },
  {
    title: "Pokédex",
    href: "/cards2",
    icon: "bi bi-box",
  },
  {
    title: "Cattura i pokémon",
    href: "/cards",
    icon: "bi bi-cart",
  },
  {
    title: "Allenamento base",
    href: "/alerts",
    icon: "bi bi-speedometer2",
  },
  {
    title: "Allenamento speciale",
    href: "/Alerts2",
    icon: "bi bi-graph-up-arrow",
  },
];

const Sidebar = () => {
  // const showMobilemenu = () => {
  //   // document.getElementById("sidebarArea").classList.toggle("showSidebar");
  //   document.querySelector('.sidebar').classList.toggle("showSidebar");
  // };

  const hideMobilemenu = () => {
    // document.getElementById("sidebarArea").classList.toggle("showSidebar");
    document.querySelector('.sidebar').classList.toggle("hidden");
  };
  let location = useLocation();

  return (
    <div className="p-3 sidebar">
      
      <div className="d-flex align-items-center ">
        <Logo />
        <span className="ms-auto d-lg-none">
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => hideMobilemenu()}
        ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
{/* 
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
          >
            Upgrade To Pro
          </Button>
           */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
