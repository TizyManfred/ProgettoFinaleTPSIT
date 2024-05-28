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
       }
    };

    handleLogout();
  });

  return (
    <div>
      <p>Stai effettuando il logout...</p>
    </div>
  );
};

export default Logout;
