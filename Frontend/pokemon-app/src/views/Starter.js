import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Visualizza pokèdex"
            subtitle="Tutti i tuoi pokemon sono qui"
            earning="Visualizza pokèdex"
            icon="bi bi-box"
            href="#/pokedex"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Cattura qui i tuoi pokemon"
            earning="Cattura pokemon"
            icon="bi bi-cart"
            href="#/pokemon"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="Allenamento base"
            subtitle="Aumenta livello pokemon"
            earning="Allenamento base"
            icon="bi bi-speedometer2"
            href="#/allenamento"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Allenamento speciale"
            subtitle="Rendi il pokemon shiny"
            earning="Allenamento speciale"
            icon="bi bi-graph-up-arrow"
            href="#/allenamentoSpeciale"
          />
        </Col>
      </Row>

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>

      {/***Table ***/}
      <Row>
        <Col lg="12">
          <ProjectTables />
        </Col>
      </Row>

    </div>
  );
};

export default Starter;
