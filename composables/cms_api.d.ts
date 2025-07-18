type CMS_API_Response = {
    code: number,
    status: 'ok' | string,
}

type CMS_API_people = {
    prenom: string,
    nom: string,
    image: [],
    lien: [],
    "id": string,
}

type CMS_API_domaines_activite = {
    "domaines": { "titre": string, "description": string }[],
    "image": string[],
    "id": string
}


type CMS_API_hero = {
    titre: string
    texte: string
  }    


  type CMS_API_Article = {
    main_title: string
    date: string
    resume: string
  }