import express from "express";
import aircraftController from "../../controllers/aircraft.controller";

const router = express.Router();

/**
 * @swagger
 * /api/aircraft/new-aircraft:
 *   post:
 *     summary: Create a new aircraft
 *     description: Adds a new aircraft to the database
 *     tags:
 *       - Aircraft
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   aircraft_code:
 *                     type: string
 *                     example: "A320"
 *                   model:
 *                     type: object
 *                     properties:
 *                       ru:
 *                         type: string
 *                         example: "Аэробус A320"
 *                       en:
 *                         type: string
 *                         example: "Airbus A320"
 *                   range:
 *                     type: number
 *                     example: 6100
 *                   manufacturer:
 *                     type: string
 *                     example: "Airbus"
 *     responses:
 *       201:
 *         description: Aircraft created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aircraft created successfully"
 *       400:
 *         description: Bad request
 */
router.post("/new-aircraft", aircraftController.createAircraft);

/**
 * @swagger
 * /api/aircraft/all-aircrafts:
 *   get:
 *     summary: Get all aircrafts
 *     description: Fetches all aircrafts from the database with optional pagination, search, and filtering.
 *     tags:
 *       - Aircraft
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items to return (default is 10).
 *         required: false
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number (default is 1).
 *         required: false
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A search query to filter aircraft by model name.
 *         required: false
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: "A JSON string for filtering aircrafts by specific fields. Example: `{ \"manufacturer\": \"Boeing\" }`"
 *         required: false
 *     responses:
 *       200:
 *         description: A list of aircrafts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       aircraft_code:
 *                         type: string
 *                         example: "A320"
 *                       model:
 *                         type: object
 *                         properties:
 *                           ru:
 *                             type: string
 *                             example: "Аэробус A320"
 *                           en:
 *                             type: string
 *                             example: "Airbus A320"
 *                       range:
 *                         type: integer
 *                         example: 6100
 *                       manufacturer:
 *                         type: string
 *                         example: "Airbus"
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 */
router.get("/all-aircrafts", aircraftController.selectAllAircrafts);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   get:
 *     summary: Get an aircraft by ID
 *     description: Retrieve details of a specific aircraft by its ID.
 *     tags:
 *       - Aircraft
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the aircraft
 *     responses:
 *       200:
 *         description: Successfully retrieved the aircraft details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 manufacturer:
 *                   type: string
 *                   example: "Boeing"
 *                 model:
 *                   type: string
 *                   example: "737"
 *                 originated_country:
 *                   type: string
 *                   example: "USA"
 *       400:
 *         description: Invalid ID supplied
 *       404:
 *         description: Aircraft not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", aircraftController.selectAircraftById);

/**
 * @swagger
 * /api/aircraft:
 *   patch:
 *     summary: Update an aircraft
 *     description: Update an existing aircraft's model and range using its aircraft code.
 *     tags:
 *       - Aircraft
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aircraft_code
 *             properties:
 *               aircraft_code:
 *                 type: string
 *                 example: "SU-35"
 *                 description: The unique code of the aircraft.
 *               model:
 *                 type: object
 *                 properties:
 *                   ru:
 *                     type: string
 *                     example: "Сухой"
 *                   en:
 *                     type: string
 *                     example: "Sukhoi"
 *                 description: The model name in different languages.
 *               range:
 *                 type: number
 *                 example: 3500
 *                 description: The aircraft's flight range in kilometers.
 *     responses:
 *       200:
 *         description: Aircraft successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aircraft updated successfully"
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Aircraft not found
 *       500:
 *         description: Internal server error
 */

router.patch("/", aircraftController.updateAircraft);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   delete:
 *     summary: Delete an aircraft
 *     description: Delete an aircraft by its unique ID.
 *     tags:
 *       - Aircraft
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the aircraft
 *     responses:
 *       200:
 *         description: Aircraft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aircraft deleted successfully"
 *       404:
 *         description: Aircraft not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", aircraftController.deleteAircraft);

export default router;