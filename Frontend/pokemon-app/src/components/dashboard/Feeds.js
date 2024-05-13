import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "Gabbo ha migliorato un pokemon",
    icon: "bi bi-capslock",
    color: "warning",
    date: "6 minuti fa",
  },
  {
    title: "Nuovo utente registrato",
    icon: "bi bi-person",
    color: "info",
    date: "20 minuti fa",
  },
  {
    title: "Sami ha catturato un nuovo pokemon",
    icon: "bi bi-fire",
    color: "success",
    date: "32 minuti fa",
  },
  {
    title: "Massimiliano ha reso un pokemon shiny",
    icon: "bi bi-capslock",
    color: "danger",
    date: "1 ora fa",
  },
  {
    title: "Tiziano ha migliorato un pokemon",
    icon: "bi bi-fire",
    color: "warning",
    date: "2 ore fa",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Attività</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Qui puoi vedere le attività di tutti gli utenti
        </CardSubtitle>

        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
