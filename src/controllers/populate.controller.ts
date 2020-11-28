import { User } from '../models/user.model';
import { Achievement } from '../models/achievement.model';
import { Request, Response, Router } from 'express';

export const PopulateRouter: Router = Router();

PopulateRouter.route('/users').get(async (req: Request, res: Response) => {
  User.insertMany([
    { username: 'Anders',   points: 1, homeArea: "Hallset", awsId: "1" },
    { username: 'Bjarne',   points: 2, homeArea: "Hallset", awsId: "2" },
    { username: 'Charles',  points: 3, homeArea: "Hallset", awsId: "3" },
    { username: 'Dolf',     points: 4, homeArea: "Hallset", awsId: "4" },
    { username: 'Eline',    points: 5, homeArea: "Hallset", awsId: "5" },
    { username: 'Fjodor',   points: 5, homeArea: "Hallset", awsId: "6" },
    { username: 'Gine',     points: 6, homeArea: "Sverresborg", awsId: "7" },
    { username: 'Hanne',    points: 7, homeArea: "Sverresborg", awsId: "8" },
    { username: 'Ine',      points: 8, homeArea: "Sverresborg", awsId: "9" },
    { username: 'Jonas',    points: 9, homeArea: "Jonsvatnet", awsId: "10" },
    { username: 'Karl',     points: 9, homeArea: "Jonsvatnet", awsId: "11" },
    { username: 'Lone',     points: 10, homeArea: "Jonsvatnet", awsId: "12" }
  ])
    .then(() => res.status(200).json('User Collection Populated'))
    .catch((err) => res.status(400).json(err));
});

PopulateRouter.route('/achievements').get(async (req: Request, res: Response) => {
  Achievement.insertMany([
    { name: 'Hele uken lang',     category: "Utholdenhet",  iconUrl: 'default', description: 'Fullfør en tur hver dag i én uke.',                   value: "Sølv", pointValue: 100, qty: 0},
    { name: 'Vaskeekte turgåer',  category: "Utholdenhet",  iconUrl: 'default', description: 'Fullfør turer hver dag i tretti dager.',              value: "Gull", pointValue: 200, qty: 0 },
    { name: 'En hel dag',         category: "Utholdenhet",  iconUrl: 'default', description: 'Fullfør turer tilsvarende tjuefire timer i tid.',     value: "Gull", pointValue: 200, qty: 0 }, 
    { name: 'Tre om dagen',       category: "Intensitet",   iconUrl: 'default', description: 'Fullfør tre turer på én dag.',                        value: "Sølv", pointValue: 100, qty: 0 },
    { name: 'Hurtigper',          category: "Intensitet",   iconUrl: 'default', description: 'Fullfør tre turer med en gjennomsnittshastighet over 10 kilometer per time.', value: "Gull", pointValue: 200, qty: 0 },
    { name: 'Timesvis',           category: "Intensitet",   iconUrl: 'default', description: 'Fullfør turer tilsvarende tre timer på én dag.',      value: "Gull", pointValue: 200, qty: 0 },
    { name: 'Jomfrutur',          category: 'Variant',      iconUrl: 'default', description: 'Fullfør din første tur.',                             value: 'Bronse', pointValue: 50, qty: 0},
    { name: 'En helgrønn tur',    category: "Variant",      iconUrl: 'default', description: 'Fullfør en tur fullstendig i grønn sone.',            value: "Bronse", pointValue: 50, qty: 0 },
    { name: 'Grønnillion',        category: "Variant",      iconUrl: 'default', description: 'Tjen ett tusen grønne poeng på én tur.',              value: "Sølv", pointValue: 100, qty: 0 },
    { name: 'Rundt ekvator',      category: "Distanse",     iconUrl: 'default', description: 'Fullfør turer tilsvarende avstanden rundt ekvator (40 075 km).',  value: "Platinum", pointValue: 500, qty: 0 },
    { name: 'Pol til pol',        category: "Distanse",     iconUrl: 'default', description: 'Fullfør turer tilsvarende avstanden mellom polene (20 021 km).',  value: "Gull", pointValue: 200, qty: 0 },
    { name: 'Lindesnes-Nordkapp', category: "Distanse",     iconUrl: 'default', description: 'Fullfør turer tilsvarende avstanden mellom Lindesnes og Nordkapp (1 676 km).',  value: "Gull", pointValue: 200, qty: 0 },
    { name: 'Kjapp tur',          category: "Distanse",     iconUrl: 'default', description: 'Fullfør en tur på én kilometer.',                     value: "Bronse", pointValue: 50, qty: 0 },
    { name: 'Spasertur',          category: "Distanse",     iconUrl: 'default', description: 'Fullfør en tur på fem kilometer',                     value: "Sølv", pointValue: 100, qty: 0 },
    { name: 'Real tur',           category: "Distanse",     iconUrl: 'default', description: 'Fullfør en tur på ti kilometer.',                     value: "Gull", pointValue: 200, qty: 0 },
    { name: 'Høvding',            category: "Poeng",        iconUrl: 'default', description: 'Tjen ett tusen poeng.',                               value: "Bronse", pointValue: 50, qty: 0 },
    { name: 'Kongen på haugen',   category: "Poeng",        iconUrl: 'default', description: 'Oppnå førsteplass på topplisten.',                    value: "Platinum", pointValue: 500, qty: 0 },
    { name: 'Lokal mester',       category: "Poeng",        iconUrl: 'default', description: 'Oppnå førsteplass på topplisten i ditt nabolag.',     value: "Gull", pointValue: 200, qty: 0 },
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

PopulateRouter.route('/clear-achievements').get(async (req: Request, res: Response) => {
  try {
    await Achievement.collection.drop();
    return res.status(200).json('User documents and achievement documents successfully dropped.');
  } catch (err) {
    return res.status(500).json('Deletion attempt unsuccessful. An internal server error has occured.');
  }
});