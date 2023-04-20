import { Router } from 'express';
import { CidadesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá dev');
});

router.post(
  '/cidades',

  CidadesController.createValidation,
  CidadesController.create
);

export { router };
