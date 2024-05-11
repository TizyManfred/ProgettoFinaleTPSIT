import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (data) => {
  return (


    <Card>
      <CardImg alt="Card image cap" src={data.imageUrl} />
      {/* <CardBody className="p-4">
        <CardTitle tag="h1">{data.name}</CardTitle>
        <Button color="primary">{data.quizOptions[0]}</Button> 
        <Button color="primary">{data.quizOptions[1]}</Button> 
        <Button color="primary">{data.quizOptions[2]}</Button> 
        <Button color="primary">{data.quizOptions[3]}</Button> 
      </CardBody> */}
    </Card>
  );
};

export default Blog;
