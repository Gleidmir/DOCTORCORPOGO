import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DoctorCorpo GO — Clínica de Estética & Odontologia" },
      {
        name: "description",
        content:
          "Agende sua consulta ou procedimento de estética online em poucos cliques. Simples, rápido e no seu controle.",
      },
      { property: "og:title", content: "DoctorCorpo GO — Clínica de Estética & Odontologia" },
      {
        property: "og:description",
        content:
          "Elimine a espera. Agende seus procedimentos de harmonização facial, odontologia e estética em tempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "keywords", content: "dentista, clinica de estetica, harmonização facial, preenchimento labial, botox, odontologia, clareamento dental, doctorcorpogo, doctorcorpo, agendamento de consulta, estetica goiás" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://doctorcorpogo.netlify.app/",
      },
    ],
  }),
  component: LandingPage,
});
