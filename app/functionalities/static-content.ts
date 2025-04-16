import cms_img from "@/public/assets/cms_img.svg"
import template from "@/public/assets/template_img.svg"
import ecran from "@/public/assets/ecran_img.svg"
import plann from "@/public/assets/plann_img.svg"
import stat from "@/public/assets/stat_img.svg"
import int from "@/public/assets/int_img.svg"
import exp from "@/public/assets/exp_img.svg"



export const static_content = [
    {title: "📂 Système de Gestion de Contenu (CMS)", img: cms_img, 
    desc: ['✅ Interface intuitive pour la création et gestion de contenus multimédias.', '✅ Support des formats : textes, images, vidéos, flux RSS, etc.', '✅ Aperçu en temps réel avant diffusion.', '✅ Organisation hiérarchique via dossiers et sous-dossiers.']
},
    {title: "🎨 Bibliothèque de Templates Dynamiques", img: template,
        desc: ['✅ Modèles personnalisables (diaporamas, météo, annonces, etc.).', '✅ Intégration de widgets interactifs.', '✅ Modification en quelques clics pour une personnalisation rapide.']
    },
    {title: "🏢 Gestion des Écrans et Bornes", img: ecran,
        desc: ['✅ Ajout et gestion de plusieurs écrans depuis un tableau de bord centralisé.', '✅ Paramétrage avancé : résolution, volume, redémarrage automatique.', "✅ Suivi en temps réel de l'état des écrans."]
    },
    {title: "🗓 Planification et Diffusion Intelligente", img: plann,
        desc: ["✅ Programmation des contenus selon des horaires définis.", "✅ Visualisation des diffusions via un calendrier intuitif.", "✅ Duplication facile des campagnes récurrentes."]
    },
    {title: "📊 Statistiques et Analyses", img: stat,
        desc: ["✅ Suivi des performances des campagnes.", "✅ Rapport d'engagement et de portée des diffusions.", "✅ Tableau de bord avec graphiques et données en temps réel."]
    },
    {title: "🛠️ Interface d’Administration Avancée", img: int, 
        desc: ["✅ Gestion des utilisateurs et permissions.", "✅ Journalisation des actions (modifications, mises à jour, etc.).", "✅ Personnalisation des rôles et accès."]
    },
    {title: "🌟 Expérience Utilisateur Optimisée", img: exp, 
        desc: ["✅ Interface responsive et adaptée à tous les écrans.", "✅ Support client dédié et documentation complète.", "✅ Intégration facile avec d'autres services et plateformes."]
    },
]