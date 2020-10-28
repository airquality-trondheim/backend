import { User } from '../models/user.model';
import { Achievement } from '../models/achievement.model';
import { Request, Response, Router } from 'express';

export const PopulateRouter: Router = Router();

PopulateRouter.route('/users').get(async (req: Request, res: Response) => {
  User.insertMany([
    { username: 'Anders',   points: 1, homeArea: "Hallset" },
    { username: 'Bjarne',   points: 2, homeArea: "Hallset" },
    { username: 'Charles',  points: 3, homeArea: "Hallset" },
    { username: 'Dolf',     points: 4, homeArea: "Hallset" },
    { username: 'Eline',    points: 5, homeArea: "Hallset" },
    { username: 'Fjodor',   points: 5, homeArea: "Hallset" },
    { username: 'Gine',     points: 6, homeArea: "Sverresborg" },
    { username: 'Hanne',    points: 7, homeArea: "Sverresborg" },
    { username: 'Ine',      points: 8, homeArea: "Sverresborg" },
    { username: 'Jonas',    points: 9, homeArea: "Jonsvatnet" },
    { username: 'Karl',     points: 9, homeArea: "Jonsvatnet" },
    { username: 'Lone',     points: 10, homeArea: "Jonsvatnet" }
  ])
    .then(() => res.status(200).json('User Collection Populated'))
    .catch((err) => res.status(400).json(err));
});

PopulateRouter.route('/achievements').get(async (req: Request, res: Response) => {
  Achievement.insertMany([
    { name: 'Jomfruturen',        category: "Annet",        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør din første tur.',                             value: "Bronse", },
    { name: 'Hele uken lang',     category: "Utholdenhet",  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur hver dag i én uke.',                   value: "Sølv", },
    { name: 'Tre om dagen',       category: "Intensitet",   iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør tre turer på én dag.',                        value: "Sølv", },
    { name: 'En helgrønn tur',    category: "Variant",      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur fullstendig i grønn sone.',            value: "Bronse", },           
    { name: 'Vaskeekte turgåer',  category: "Utholdenhet",  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur hver dag i tretti dager.',             value: "Gull", }, 
    { name: 'Rundt ekvator',      category: "Distanse",     iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør turer tilsvarende avstanden rundt ekvator.',  value: "Platinum", },
    { name: 'Pol til pol',        category: "Distanse",     iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør turer tilsvarende avstanden mellom polene.',  value: "Gull", }
  ])
    .then(() => res.status(200).json('Achievement Collection Populated'))
    .catch((err) => res.status(400).json(err));
});

PopulateRouter.route('/clear-all').get(async (req: Request, res: Response) => {
  try {
    await User.collection.drop();
    await Achievement.collection.drop();
    res.status(200).json('User documents and achievement documents successfully dropped.');
  } catch (err) {
    res.status(500).json('Deletion attempt unsuccessful. An internal server error has occured.');
  }
});