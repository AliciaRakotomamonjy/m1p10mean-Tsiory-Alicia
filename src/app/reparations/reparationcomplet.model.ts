export interface ReparationEncours{
  reparation :{
    _id: string,
    voiture : {
      _id :string,
      matricule:string,
      personne:string
    },
    etat:number,
    date_sortie : Date,
    date_debut_reparation : Date,
    date_fin_reparation : Date,
    date_depot : Date
  }
}
