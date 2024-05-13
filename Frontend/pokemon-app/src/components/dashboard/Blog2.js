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
      </CardBody>
    </Card>
  );
};

export default Blog;
