import React, { useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true; 

const Logout = () => {

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Effettua la richiesta di logout all'API
        await axios.get("http://localhost:50000/api/logout");

        // Reindirizza l'utente alla home
        window.location.href = '/';
    } catch (error) {
        console.error("Errore durante il logout:", error);
        // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
      }
    };

    handleLogout();
  });

  return (
    <div>
      <p>Stai effettuando il logout...</p>
      {/* Puoi mostrare qui un loader o un messaggio di attesa */}
    </div>
  );
};

export default Logout;
