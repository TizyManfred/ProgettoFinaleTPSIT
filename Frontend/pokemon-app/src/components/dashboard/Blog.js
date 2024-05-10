import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (

    // name = {blg.name}
    // type = {blg.type}
    // imageUrl = {blg.imageUrl}
    // level = {blg.level}
    // ability1 = {blg.ability1}
    // ability2 = {blg.ability2}
    // ability3 = {blg.ability3}
    // ability4 = {blg.ability4}

    <Card>
      <CardImg alt="Card image cap" src={props.imageUrl} />
      <CardBody className="p-4">
        <CardTitle tag="h1">{props.name}</CardTitle>
        <CardSubtitle>Type: {props.type}</CardSubtitle>
        <CardSubtitle>Level: {props.level}</CardSubtitle><br></br>
        Ability:
        <CardSubtitle> - {props.ability1}</CardSubtitle>
        <CardSubtitle> - {props.ability2}</CardSubtitle>
        <CardSubtitle> - {props.ability3}</CardSubtitle>
        <CardSubtitle> - {props.ability4}</CardSubtitle>
        <Button color="primary">Seleziona</Button> 
      </CardBody>
    </Card>
  );
};

export default Blog;
