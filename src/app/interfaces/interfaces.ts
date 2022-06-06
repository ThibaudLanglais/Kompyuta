export interface Data {
   pcs: Pc[],
   components: ComponentInterface[]
}
export interface Pc {
   panierId?: string,
   typeObjet: string,
   description: string | null,
   id: number,
   tags: string[],
   marque: string,
   nom: string,
   type: string,
   ecran: string | null,
   clavier: string | null,
   batterie: string | null,
   images: string[],
   custom?: boolean,
   bonus3000?: boolean,
   reviews: {
      positive: number,
      negative: number,
   },
   system: {
      ram: number,
      cpu: number,
      hdd: number,
      cg: number,
   },
}

export interface QueryParams{
   query?: string,
   tags?: any,
}

export interface ComponentInterface{
   typeObjet: string,
   nom?: string
   marque?: string,
   modele?: string,
   score: number,
   composant: string,
   prix: number,
   id: number,
   storageType?: string,
   'vitesse-transfert'?: number,
   core?: number,
   "frequence-max"?: number,
   tdp?: number,
   capacite: number,
   frequence?: string,
   quantite?: number,
}