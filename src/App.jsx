import { useState } from "react";
import "./App.css";

function App() {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [produit, setProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [unite, setUnite] = useState("");
  const [dateCommande, setDateCommande] = useState("");
  const [paiement, setPaiement] = useState("");

  const numeroWhatsApp = "243970226689";

  const aujourdHui = new Date().toISOString().split("T")[0];

  const changerProduit = (e) => {
    const choix = e.target.value;
    setProduit(choix);
    setUnite("");

    if (choix === "Riz") {
      setUnite("plats");
    }
  };

  const envoyerWhatsApp = () => {
    if (!nom || !telephone || !produit || !quantite || !unite || !dateCommande || !paiement) {
      alert("Veuillez remplir tous les champs avant d’envoyer la commande.");
      return;
    }

    const message = `Bonjour Saveurs de chez nous 🌿

Je souhaite passer une commande.

Nom : ${nom}
Téléphone : ${telephone}
Produit : ${produit}
Quantité : ${quantite} ${unite}
Date de commande : ${dateCommande}
Mode de paiement choisi : ${paiement}

Je comprends que ma commande sera confirmée après paiement à l’avance.

Merci.`;

    const lien = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(lien, "_blank");
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Saveurs de chez nous</h1>
        <p className="slogan">Le goût authentique de chez nous 🇨🇩🌿</p>

        <label>Nom du client</label>
        <input
          type="text"
          placeholder="Ex : Elsa"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />

        <label>Téléphone</label>
        <input
          type="tel"
          placeholder="Ex : 0970000000"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />

        <label>Produit commandé</label>
        <select value={produit} onChange={changerProduit}>
          <option value="">Choisir un produit</option>
          <option value="Sombé">Sombé</option>
          <option value="Riz">Riz</option>
        </select>

        <label>Quantité</label>
        <input
          type="number"
          min="1"
          placeholder="Ex : 500, 1, 2"
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />

        <label>Unité</label>
        <select
          value={unite}
          onChange={(e) => setUnite(e.target.value)}
          disabled={!produit || produit === "Riz"}
        >
          <option value="">Choisir l’unité</option>

          {produit === "Sombé" && (
            <>
              <option value="grammes">Grammes</option>
              <option value="kilo">Kilo</option>
            </>
          )}

          {produit === "Riz" && <option value="plats">Plats</option>}
        </select>

        <label>Date de commande</label>
        <input
          type="date"
          min={aujourdHui}
          value={dateCommande}
          onChange={(e) => setDateCommande(e.target.value)}
        />

        <label>Mode de paiement</label>
        <select value={paiement} onChange={(e) => setPaiement(e.target.value)}>
          <option value="">Choisir le mode de paiement</option>
          <option value="Airtel Money : +243991787177">
            Airtel Money : +243991787177
          </option>
          <option value="M-Pesa : 0824809200">
            M-Pesa : 0824809200
          </option>
        </select>

        <button onClick={envoyerWhatsApp}>
          Commander sur WhatsApp
        </button>

        <p className="note">
          Commande à confirmer par paiement à l’avance. Merci de commander 24h à l’avance.
        </p>
      </div>
    </div>
  );
}

export default App;
