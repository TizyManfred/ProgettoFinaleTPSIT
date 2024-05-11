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
        <CardSubtitle>Type: {props.type}</CardSubtitle><br></br>
        <Button color="primary">Seleziona</Button> 
      </CardBody>
    </Card>
  );
};

export default Blog;
