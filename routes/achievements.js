const router = require('express').Router();
const userModel = require('../models/user.model');
const achievementModel = require('../models/achievement.model'); 

/**
 * @swagger
 * path:
 *   /achievements/:
 *     get:
 *       summary: Get all achievement data
 *       tags: [Achievements]
 *       produces:
 *         - application/json
 *       responses:
 *         "200":
 *           description: A list of all achievements
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   achievements:
 *                     type: array
 *                     items:
 *                       $ref: "#/components/schemas/Achievement"
 *         "400":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 *     post:
 *       summary: Add an achievement document
 *       tags: [Achievements]
 *       requestBody:
 *         description: Name, icon URL, and description for a new achievement.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   required: true
 *                 iconUrl:
 *                   type: string
 *                   required: true
 *                 description:
 *                   type: string
 *                   required: true
 *       produces:
 *         - application/json
 *       responses:
 *         "201":
 *           description: The created achievement document.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Achievement"
 *         "400":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 *         "500":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 */

router.route('/')
.get((req, res) => {
  achievementModel.find({})
    .lean()
    .then((achievements) => res.status(200).json({achievements: achievements}))
    .catch((err) => res.status(400).json(err));
})
.post((req, res) => {
  try {
    const newAchievement = new achievementModel({
      id: req.body.id,
      name: req.body.name,
      iconUrl: req.body.iconUrl,
      description: req.body.description
    });

    newAchievement.save()
      .then((achievement) => res.status(200).json(achievement))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

/**
* @swagger
* path:
*   /achievements/{achievementId}:
*     delete:
*       summary: Delete an achievement document
*       tags: [Achievements]
*       produces:
*         - application/json
*       responses:
*         "200":
*           description: The document was deleted. 
*           content:
*             application/json:
*               schema:
*                 type: string
*         "400":
*           description: Error message
*           content:
*             application/json:
*               schema:
*                 type: string
*     get:
*       summary: Get an achievement document
*       tags: [Achievements]
*       produces:
*         - application/json
*       responses:
*         "200":
*           description: The requested achievement document.
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Achievement"
*         "400":
*           description: Error message
*           content:
*             application/json:
*               schema: 
*                 type: string       
*     patch:
*       summary: Modify an achievement document
*       tags: [Achievements]
*       requestBody:
*         description: Name, icon URL, and description for a new achievement.
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 name:
*                   type: string
*                 iconUrl:
*                   type: string
*                 description:
*                   type: string
*       produces:
*         - application/json
*       responses:
*         "200":
*           description: The created achievement document.
*           content:
*             application/json:
*               schema:
*                 $ref: "#/components/schemas/Achievement"
*         "400":
*           description: Error message
*           content:
*             application/json:
*               schema: 
*                 type: string
*/

router.route('/:achievementId')
.delete((req, res) => {
  achievementModel.findOneAndDelete({ _id: req.params.achievementId })
    .then(() => res.status(200).json(`Achievement with _id ${req.params.achievementId} successfully deleted.`))
    .catch((err) => res.send(400).json(err));
})
.get((req, res) => {
  achievementModel.findById({ _id: req.params.achievementId })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
})
.patch((req, res) => {
  if (!req.body) res.status(400).json('No request body found.');
  achievementModel.findOneAndUpdate({ _id: req.params.achievementId }, req.body, { new: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});

// Kan sikkert fjernes.
router.route('user/:userId').get((req, res) => {
  userModel.findById(req.params.userId)
    .lean()
    .then((user => {
      achievementModel.find({})
        .lean()
        .where('id')
        .in(user.achievementIds)
        .then((achievements) => res.status(200).json(achievements))
        .catch((err) => res.status(400).json(err));
    }))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;