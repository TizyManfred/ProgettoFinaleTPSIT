import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  TabContent
} from "reactstrap";
import "./tab.css"
import axios from "axios";
axios.defaults.withCredentials = true; 

const Blog = (props) => {
  return (

    <Card>
      <CardImg alt="Card image cap" src={props.imageUrl} />
      <CardBody className="p-4">
        <CardTitle tag="h1">{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</CardTitle>
        <CardSubtitle> <i className="bi  bi-star-fill"></i> {props.type}</CardSubtitle>
        <CardSubtitle> <i className="bi bi-bar-chart-fill"></i> {props.level}</CardSubtitle>
        <CardSubtitle> <i className="bi bi-brightness-high-fill"></i> {props.shiny}</CardSubtitle><br/>
        <CardSubtitle> <i className="bi bi-crosshair"></i> Ability:</CardSubtitle>
        <CardSubtitle>     <i className="bi bi-arrow-return-right tab"></i> {props.ability1}</CardSubtitle>
        <CardSubtitle>     <i className="bi bi-arrow-return-right tab"></i> {props.ability2}</CardSubtitle>
        <CardSubtitle>     <i className="bi bi-arrow-return-right tab"></i> {props.ability3}</CardSubtitle>
        <CardSubtitle>     <i className="bi bi-arrow-return-right tab"></i> {props.ability4}</CardSubtitle>

        <Button color="danger" onClick={props.onRelease}>Rilascia</Button>
      </CardBody>
    </Card>
  );
};

export default Blog;
