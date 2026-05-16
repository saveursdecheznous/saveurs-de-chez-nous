import React, { useMemo, useState } from "react";
import { ShoppingBag, Plus, Trash2, Phone, CreditCard, Home } from "lucide-react";

export default function App() {
  const numeroWhatsApp = "243970226689";
  const numeroAirtel = "+243991787177";
  const numeroMpesa = "0824809200";

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwFyjUpHDL4VnvW5CNH5oyXPwGGhE54zhLmllWuXaQzTs8HmwtINVZgxYtUzDfdAsA/exec";

  const produits = [
    { id: "sombe250", nom: "Sombé ya Léo - 250 g", prix: 3000 },
    { id: "sombe500", nom: "Sombé ya Léo - 500 g", prix: 4500 },
    { id: "sombe1000", nom: "Sombé ya Léo - 1 kg", prix: 8500 },
    { id: "rizpilau", nom: "Riz pilau - 1 plat", prix: 25000 },
  ];

  const demain = new Date();
  demain.setDate(demain.getDate() + 1);
  const dateMinimum = demain.toISOString().split("T")[0];

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dateCommande, setDateCommande] = useState("");
  const [paiement, setPaiement] = useState("");
  const [panier, setPanier] = useState([]);
  const [produitChoisi, setProduitChoisi] = useState("");
  const [quantiteChoisie, setQuantiteChoisie] = useState(1);
  const [factureValidee, setFactureValidee] = useState(false);

  const formatFC = (montant) => `${montant.toLocaleString("fr-FR")} FC`;

  const total = useMemo(() => {
    return panier.reduce((somme, item) => somme + item.prix * item.quantite, 0);
  }, [panier]);

  const telephoneValide = (numero) => {
    const tel = numero.replace(/\s/g, "");
    return /^(0)(8|9)[0-9]{8}$/.test(tel);
  };

  const ajouterAuPanier = () => {
    if (!produitChoisi) {
      alert("Veuillez choisir un produit.");
      return;
    }

    if (!quantiteChoisie || quantiteChoisie < 1) {
      alert("Veuillez entrer une quantité valide.");
      return;
    }

    const produit = produits.find((p) => p.id === produitChoisi);

    const existant = panier.find((item) => item.id === produit.id);

    if (existant) {
      setPanier(
        panier.map((item) =>
          item.id === produit.id
            ? { ...item, quantite: item.quantite + Number(quantiteChoisie) }
            : item
        )
      );
    } else {
      setPanier([
        ...panier,
        {
          id: produit.id,
          nom: produit.nom,
          prix: produit.prix,
          quantite: Number(quantiteChoisie),
        },
      ]);
    }

    setProduitChoisi("");
    setQuantiteChoisie(1);
    setFactureValidee(false);
  };

  const supprimerProduit = (id) => {
    setPanier(panier.filter((item) => item.id !== id));
    setFactureValidee(false);
  };

  const verifierFormulaire = () => {
    if (!nom.trim()) {
      alert("Le nom du client est obligatoire.");
      return false;
    }

    if (!telephone.trim()) {
      alert("Le numéro de téléphone est obligatoire.");
      return false;
    }

    if (!telephoneValide(telephone)) {
      alert("Le numéro doit être un numéro RDC valide de 10 chiffres. Exemple : 0970226689");
      return false;
    }

    if (!adresse.trim()) {
      alert("L’adresse de livraison est obligatoire.");
      return false;
    }

    if (!dateCommande) {
      alert("Veuillez choisir une date de livraison.");
      return false;
    }

    if (dateCommande < dateMinimum) {
      alert("La date autorisée commence à partir de demain. Commande 24h à l’avance obligatoire.");
      return false;
    }

    if (!paiement) {
      alert("Veuillez choisir le mode de paiement.");
      return false;
    }

    if (panier.length === 0) {
      alert("Veuillez ajouter au moins un produit à la facture.");
      return false;
    }

    return true;
  };

  const validerFacture = () => {
    if (!verifierFormulaire()) return;
    setFactureValidee(true);
    alert("Facture validée. Vous pouvez maintenant envoyer la commande sur WhatsApp.");
  };

  const envoyerCommande = async () => {
    if (!verifierFormulaire()) return;

    if (!factureValidee) {
      alert("Veuillez d’abord valider la facture avant d’envoyer la commande.");
      return;
    }

    const detailsProduits = panier
      .map(
        (item) =>
          `- ${item.nom} x ${item.quantite} = ${formatFC(item.prix * item.quantite)}`
      )
      .join("\n");

    const commande = {
      nom,
      telephone,
      adresse,
      produit: panier.map((item) => `${item.nom} x ${item.quantite}`).join(" | "),
      quantite: panier.map((item) => item.quantite).join(" | "),
      dateCommande,
      paiement,
      observation: `Total : ${formatFC(total)} | Facture validée | Preuve de paiement demandée`,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commande),
      });
    } catch (error) {
      console.log("Erreur Google Sheets :", error);
    }

    const message = `
Bonjour Saveurs de chez nous,

Je souhaite confirmer ma commande.

NOM : ${nom}
TÉLÉPHONE : ${telephone}
ADRESSE DE LIVRAISON : ${adresse}
DATE SOUHAITÉE : ${dateCommande}
MODE DE PAIEMENT : ${paiement}

FACTURE :
${detailsProduits}

TOTAL À PAYER : ${formatFC(total)}

Je comprends que la commande est payable en francs congolais avant confirmation.
Je vais envoyer la preuve de paiement.
Je recevrai ma commande après 24h.

Merci.
`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#3b2f22] pb-10">
      <header className="bg-[#0b4b2b] text-white text-center py-6 px-4 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold">Saveurs de chez nous</h1>
        <p className="text-sm mt-1">Le goût authentique de chez nous 🇨🇩🌿</p>
        <p className="text-xs mt-2">Avec Dieu, nous ferons des exploits !</p>
      </header>

      <main className="px-5 py-6 space-y-6">
        <section className="bg-[#fff3dc] rounded-3xl p-5 text-sm">
          <p className="font-semibold">Commande 24h à l’avance obligatoire.</p>
          <p className="mt-2">
            La commande est confirmée après paiement total. Le client doit envoyer la preuve de paiement.
          </p>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa] space-y-4">
          <h2 className="text-xl font-bold text-[#0b4b2b] flex items-center gap-2">
            <Home size={22} /> Informations du client
          </h2>

          <input
            type="text"
            placeholder="Nom du client *"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 outline-none focus:border-[#0b4b2b]"
          />

          <input
            type="tel"
            placeholder="Téléphone RDC * Ex : 0970226689"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            maxLength={10}
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 outline-none focus:border-[#0b4b2b]"
          />

          <input
            type="text"
            placeholder="Adresse de livraison *"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 outline-none focus:border-[#0b4b2b]"
          />

          <input
            type="date"
            min={dateMinimum}
            value={dateCommande}
            onChange={(e) => setDateCommande(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 outline-none focus:border-[#0b4b2b]"
          />
        </section>

        <section className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa] space-y-4">
          <h2 className="text-xl font-bold text-[#0b4b2b] flex items-center gap-2">
            <ShoppingBag size={22} /> Produits
          </h2>

          <select
            value={produitChoisi}
            onChange={(e) => setProduitChoisi(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 bg-white outline-none focus:border-[#0b4b2b]"
          >
            <option value="">Choisir un produit</option>
            {produits.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} — {formatFC(p.prix)}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantiteChoisie}
            onChange={(e) => setQuantiteChoisie(Number(e.target.value))}
            placeholder="Quantité souhaitée"
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 outline-none focus:border-[#0b4b2b]"
          />

          <button
            onClick={ajouterAuPanier}
            className="w-full bg-[#c46b2b] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Ajouter à la facture
          </button>
        </section>

        {panier.length > 0 && (
          <section className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa] space-y-4">
            <h2 className="text-xl font-bold text-[#0b4b2b]">Facture</h2>

            {panier.map((item) => (
              <div
                key={item.id}
                className="border-b border-[#ead8aa] pb-3 flex justify-between gap-3"
              >
                <div>
                  <p className="font-semibold">{item.nom}</p>
                  <p className="text-sm">
                    {item.quantite} x {formatFC(item.prix)}
                  </p>
                  <p className="font-bold text-[#0b4b2b]">
                    {formatFC(item.prix * item.quantite)}
                  </p>
                </div>

                <button
                  onClick={() => supprimerProduit(item.id)}
                  className="text-red-600"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}

            <div className="bg-[#eefaf1] rounded-2xl p-4">
              <p className="text-sm">Total à payer</p>
              <p className="text-2xl font-bold text-[#0b4b2b]">{formatFC(total)}</p>
            </div>
          </section>
        )}

        <section className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa] space-y-4">
          <h2 className="text-xl font-bold text-[#0b4b2b] flex items-center gap-2">
            <CreditCard size={22} /> Paiement
          </h2>

          <select
            value={paiement}
            onChange={(e) => setPaiement(e.target.value)}
            className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 bg-white outline-none focus:border-[#0b4b2b]"
          >
            <option value="">Choisir le mode de paiement *</option>
            <option value="Airtel Money">Airtel Money</option>
            <option value="M-Pesa">M-Pesa</option>
          </select>

          {paiement === "Airtel Money" && (
            <div className="bg-[#eefaf1] rounded-2xl p-4">
              <p>Numéro Airtel Money :</p>
              <p className="font-bold text-xl">{numeroAirtel}</p>
            </div>
          )}

          {paiement === "M-Pesa" && (
            <div className="bg-[#eefaf1] rounded-2xl p-4">
              <p>Numéro M-Pesa :</p>
              <p className="font-bold text-xl">{numeroMpesa}</p>
            </div>
          )}
        </section>

        <button
          onClick={validerFacture}
          className="w-full bg-[#c46b2b] text-white py-4 rounded-2xl text-lg font-bold"
        >
          Valider la facture
        </button>

        <button
          onClick={envoyerCommande}
          className="w-full bg-[#0b4b2b] text-white py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2"
        >
          <Phone size={22} /> Envoyer la commande sur WhatsApp
        </button>
      </main>
    </div>
  );
}
