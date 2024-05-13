import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
//import user5 from "../../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "GabryChini",
    email: "gabriele.chini@buonarroti.tn.it",
    grado: "Allenatore",
    status: "online",
    settimane: "13",
    pokemon: "15",
  },
  {
    avatar: user2,
    name: "SamiFacc",
    email: "sami.facchinelli@buonarroti.tn.it",
    grado: "Maestro",
    status: "offline",
    settimane: "11",
    pokemon: "21",
  },
  {
    avatar: user3,
    name: "MassiFedri",
    email: "max.fedrizi@buonarroti.tn.it",
    grado: "Campione",
    status: "holt",
    settimane: "15",
    pokemon: "32",
  },
  {
    avatar: user4,
    name: "TizyManfred",
    email: "tiziano.manfredi@buonarroti.tn.it",
    grado: "Capo palestra",
    status: "online",
    settimane: "3",
    pokemon: "7",
  },
];

const ProjectTables = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Utenti in tendenza</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Questi sono gli utenti con più ore di gioco
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Utente</th>
                <th>Grado</th>
                <th>Status</th>
                <th>Ore di gioco</th>
                <th>Pokemon</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />

                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.grado}</td>
                  <td>
                    {tdata.status === "online" ? (
                      
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    ) :  (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      //<span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) 
                  }
                  </td>
                  <td>{tdata.pokemon}</td>
                  <td>{tdata.settimane}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
