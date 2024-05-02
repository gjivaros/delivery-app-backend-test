/**
 * @swagger
 * /delivery:
 *   get:
 *     summary: Récupérer toutes les livraisons
 *     tags: [Delivery]
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Créer une nouvelle livraison
 *     tags: [Delivery]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               package_id:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *     responses:
 *       200:
 *         description: Succès
 * /delivery/{id}:
 *   put:
 *     summary: Mettre à jour une livraison
 *     tags: [Delivery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès
 *   delete:
 *     summary: Supprimer une livraison
 *     tags: [Delivery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *   get:
 *     summary: Récupérer une livraison par ID
 *     tags: [Delivery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 * /package:
 *   get:
 *     summary: Récupérer tous les colis
 *     tags: [Package]
 *     responses:
 *       200:
 *         description: Succès
 *   post:
 *     summary: Créer un nouveau colis
 *     tags: [Package]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               weight:
 *                 type: number
 *               width:
 *                 type: number
 *               height:
 *                 type: number
 *               depth:
 *                 type: number
 *               from_name:
 *                 type: string
 *               from_address:
 *                 type: string
 *               to_name:
 *                 type: string
 *               to_address:
 *                 type: string
 *               from_location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *               to_location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *     responses:
 *       200:
 *         description: Succès
 * /package/{id}:
 *   get:
 *     summary: Récupérer un colis par ID
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 *   put:
 *     summary: Mettre à jour un colis
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               weight:
 *                 type: number
 *               width:
 *                 type: number
 *               height:
 *                 type: number
 *               depth:
 *                 type: number
 *               from_name:
 *                 type: string
 *               from_address:
 *                 type: string
 *               to_name:
 *                 type: string
 *               to_address:
 *                 type: string
 *               from_location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *               to_location:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *     responses:
 *       200:
 *         description: Succès
 *   delete:
 *     summary: Supprimer un colis
 *     tags: [Package]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Succès
 */
